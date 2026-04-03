import { useState, useMemo, useRef } from "react";
import {
  Newspaper, Search, TrendingUp, TrendingDown, Clock,
  ExternalLink, Minus, X, ChevronDown, BarChart2, BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import newsData from "../data/news.json";

// ── Types ─────────────────────────────────────────────────────────────────────

type Sentiment = { label: string; score: number };

type Article = {
  title:      string;
  summary:    string;
  link?:      string;
  source?:    string;
  timestamp?: string;
  sentiment?: Sentiment;
  topics?:    string[];
  fullText?:  string;
};

type RawArticle = {
  headline:      string;
  synopsis:      string;
  link?:         string;
  source?:       string;
  published_at?: string;
  sentiment?:    Sentiment;
  topics?:       string[];
  category?:     string;
  full_text?:    string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const SENTIMENT_STYLES: Record<string, { pill: string; dot: string }> = {
  positive: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800",
    dot:  "bg-emerald-400",
  },
  negative: {
    pill: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800",
    dot:  "bg-red-400",
  },
  neutral: {
    pill: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    dot:  "bg-zinc-400",
  },
};

// Color tags per source — keys match source_name in scraper
const SOURCE_COLORS: Record<string, string> = {
  "MoneyControl":       "bg-blue-50   text-blue-700   dark:bg-blue-950   dark:text-blue-400",
  "Economic Times":     "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  "Business Standard":  "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  "LiveMint":           "bg-teal-50   text-teal-700   dark:bg-teal-950   dark:text-teal-400",
};

function sourceColor(name?: string) {
  return (name && SOURCE_COLORS[name])
    ? SOURCE_COLORS[name]
    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalise(raw: any[]): Article[] {
  if (!Array.isArray(raw)) return [];

  return raw.map((item) => ({
    // ✅ FIXED mapping (old + new both supported)
    title:     item.headline || item.title || "No title",
    summary:   item.synopsis || item.description || "",
    link:      item.link,
    source:    item.source,
    timestamp: item.published_at,
    sentiment: item.sentiment,
    fullText:  item.full_text || item.content,
    topics:    item.topics ?? (item.category ? [item.category] : []),
  }));
}

function relativeTime(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m <  1)  return "just now";
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── SimpleSelect ──────────────────────────────────────────────────────────────

function SimpleSelect({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
      >
        <span className="truncate">{current?.label ?? placeholder ?? "Select"}</span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                  o.value === value
                    ? "font-semibold text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Sentiment chip ────────────────────────────────────────────────────────────

function SentimentChip({ sentiment }: { sentiment?: Sentiment }) {
  const label = (sentiment?.label ?? "neutral").toLowerCase();
  const style = SENTIMENT_STYLES[label] ?? SENTIMENT_STYLES.neutral;
  const pct   = Math.round((sentiment?.score ?? 0) * 100);
  const Icon  = label === "positive" ? TrendingUp
              : label === "negative" ? TrendingDown
              : Minus;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.pill}`}>
      <Icon className="h-3 w-3" />
      <span className="capitalize">{label}</span>
      {pct > 0 && <span className="opacity-50">{pct}%</span>}
    </span>
  );
}

// ── Article card ──────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const label = (article.sentiment?.label ?? "neutral").toLowerCase();

  const leftBorder =
    label === "positive" ? "border-l-emerald-400"
  : label === "negative" ? "border-l-red-400"
  : "border-l-zinc-200 dark:border-l-zinc-700";

  const displayText =
  expanded && article.fullText
    ? article.fullText
    : article.summary || "No description available";
  const canExpand = !!(article.fullText || (article.summary?.length ?? 0) > 160);

  return (
    <article
      className={`rounded-2xl border border-zinc-100 dark:border-zinc-800 border-l-4 ${leftBorder}
        bg-white dark:bg-zinc-900 p-5 shadow-sm transition-shadow hover:shadow-md`}
    >
      {/* Source + time row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${sourceColor(article.source)}`}>
            {article.source ?? "News"}
          </span>
          {(article.topics ?? []).slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-500 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
        {article.timestamp && (
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <Clock className="h-3 w-3" />
            {relativeTime(article.timestamp)}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold leading-snug text-zinc-900 dark:text-white">
        {article.title}
      </h3>

      {/* Body */}
      <p className={`mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
        {displayText}
      </p>
      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-1 flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <BookOpen className="h-3 w-3" />
          {expanded ? "Collapse" : "Read more"}
        </button>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-50 dark:border-zinc-800 pt-3">
        <SentimentChip sentiment={article.sentiment} />
        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Full article <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}

// ── Sentiment bar ─────────────────────────────────────────────────────────────

function SentimentBar({ positive, neutral, negative }: { positive: number; neutral: number; negative: number }) {
  return (
    <div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="bg-emerald-400 transition-all" style={{ width: `${positive}%` }} />
        <div className="bg-zinc-300 dark:bg-zinc-600 transition-all" style={{ width: `${neutral}%` }} />
        <div className="bg-red-400 transition-all" style={{ width: `${negative}%` }} />
      </div>
      <div className="mt-3 space-y-2.5">
        {[
          { label: "Positive", pct: positive, dot: "bg-emerald-400", text: "text-emerald-600 dark:text-emerald-400" },
          { label: "Neutral",  pct: neutral,  dot: "bg-zinc-400",    text: "text-zinc-500" },
          { label: "Negative", pct: negative, dot: "bg-red-400",     text: "text-red-500"  },
        ].map(({ label, pct, dot, text }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
            </div>
            <span className={`text-xs font-semibold ${text}`}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function News() {
  const allArticles = useMemo<Article[]>(
    () => normalise(((newsData as any).articles ?? []) as RawArticle[]),
    []
  );

  const [searchTerm,        setSearchTerm]        = useState("");
  const [selectedSource,    setSelectedSource]    = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedTopic,     setSelectedTopic]     = useState("all");
  const [sortBy,            setSortBy]            = useState<"newest" | "oldest" | "positive" | "negative">("newest");
  const [visibleCount,      setVisibleCount]      = useState(PAGE_SIZE);

  // ── Derive filter options from actual data ─────────────────────────────────

  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    allArticles.forEach((a) => { if (a.source) set.add(a.source); });
    return [
      { value: "all", label: "All Sources" },
      ...Array.from(set).sort().map((s) => ({ value: s, label: s })),
    ];
  }, [allArticles]);

  const topicOptions = useMemo(() => {
    const set = new Set<string>();
    allArticles.forEach((a) => (a.topics ?? []).forEach((t) => set.add(t)));
    return [
      { value: "all", label: "All Topics" },
      ...Array.from(set).sort().map((t) => ({ value: t, label: t })),
    ];
  }, [allArticles]);

  const sentimentOptions = [
    { value: "all",      label: "All Sentiment" },
    { value: "positive", label: "↑ Positive"    },
    { value: "neutral",  label: "― Neutral"     },
    { value: "negative", label: "↓ Negative"    },
  ];

  const sortOptions = [
    { value: "newest",   label: "Newest first"  },
    { value: "oldest",   label: "Oldest first"  },
    { value: "positive", label: "Most positive" },
    { value: "negative", label: "Most negative" },
  ];

  // ── Filters + sort ─────────────────────────────────────────────────────────

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    let list = allArticles.filter((a) => {
      if (q && !a.title.toLowerCase().includes(q) && !a.summary.toLowerCase().includes(q))
        return false;
      if (selectedSource    !== "all" && a.source !== selectedSource)
        return false;
      if (selectedTopic     !== "all" && !(a.topics ?? []).includes(selectedTopic))
        return false;
      if (selectedSentiment !== "all" &&
          (a.sentiment?.label ?? "neutral").toLowerCase() !== selectedSentiment)
        return false;
      return true;
    });

    if (sortBy === "newest") {
      list = [...list].sort((a, b) => (b.timestamp ?? "").localeCompare(a.timestamp ?? ""));
    } else if (sortBy === "oldest") {
      list = [...list].sort((a, b) => (a.timestamp ?? "").localeCompare(b.timestamp ?? ""));
    } else if (sortBy === "positive") {
      list = [...list].sort((a, b) => {
        const sa = a.sentiment?.label === "positive" ? (a.sentiment.score ?? 0) : -1;
        const sb = b.sentiment?.label === "positive" ? (b.sentiment.score ?? 0) : -1;
        return sb - sa;
      });
    } else if (sortBy === "negative") {
      list = [...list].sort((a, b) => {
        const sa = a.sentiment?.label === "negative" ? (a.sentiment.score ?? 0) : -1;
        const sb = b.sentiment?.label === "negative" ? (b.sentiment.score ?? 0) : -1;
        return sb - sa;
      });
    }

    return list;
  }, [allArticles, searchTerm, selectedSource, selectedTopic, selectedSentiment, sortBy]);

  const hasFilters =
    searchTerm !== "" ||
    selectedSource !== "all" ||
    selectedTopic  !== "all" ||
    selectedSentiment !== "all";

  function clearFilters() {
    setSearchTerm("");
    setSelectedSource("all");
    setSelectedTopic("all");
    setSelectedSentiment("all");
    setVisibleCount(PAGE_SIZE);
  }

  // ── Sidebar stats ──────────────────────────────────────────────────────────

  const marketSentiment = useMemo(() => {
    if (!allArticles.length) return { positive: 0, neutral: 0, negative: 0 };
    let pos = 0, neg = 0, neu = 0;
    allArticles.forEach((a) => {
      const l = (a.sentiment?.label ?? "neutral").toLowerCase();
      if (l === "positive") pos++;
      else if (l === "negative") neg++;
      else neu++;
    });
    const t = allArticles.length;
    return {
      positive: Math.round((pos / t) * 100),
      neutral:  Math.round((neu / t) * 100),
      negative: Math.round((neg / t) * 100),
    };
  }, [allArticles]);

  const topSources = useMemo(() => {
    const map = new Map<string, number>();
    allArticles.forEach((a) => {
      if (a.source) map.set(a.source, (map.get(a.source) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [allArticles]);

  const topTopics = useMemo(() => {
    const map = new Map<string, number>();
    allArticles.forEach((a) =>
      (a.topics ?? []).forEach((t) => map.set(t, (map.get(t) ?? 0) + 1))
    );
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [allArticles]);

  const sentimentCounts = useMemo(() => {
    const c: Record<string, number> = { positive: 0, neutral: 0, negative: 0 };
    allArticles.forEach((a) => {
      const l = (a.sentiment?.label ?? "neutral").toLowerCase();
      c[l] = (c[l] ?? 0) + 1;
    });
    return c;
  }, [allArticles]);

  const scraped_at = (newsData as any).scraped_at as string | undefined;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Header ── */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Financial News</h1>
                <p className="text-xs text-zinc-400">
                  {allArticles.length} articles · {topSources.length} source{topSources.length !== 1 ? "s" : ""}
                  {scraped_at && ` · updated ${relativeTime(scraped_at)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Refreshed on each scrape run
            </div>
          </div>

          {/* Filter bar */}
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <Input
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Search headlines or summaries…"
                className="pl-9 h-9 text-sm"
              />
            </div>
            <SimpleSelect value={selectedSource}    onChange={(v) => { setSelectedSource(v);    setVisibleCount(PAGE_SIZE); }} options={sourceOptions}    placeholder="All Sources"   />
            <SimpleSelect value={selectedTopic}     onChange={(v) => { setSelectedTopic(v);     setVisibleCount(PAGE_SIZE); }} options={topicOptions}     placeholder="All Topics"    />
            <SimpleSelect value={selectedSentiment} onChange={(v) => { setSelectedSentiment(v); setVisibleCount(PAGE_SIZE); }} options={sentimentOptions} placeholder="All Sentiment" />
            <SimpleSelect value={sortBy}            onChange={(v) => { setSortBy(v as any);     setVisibleCount(PAGE_SIZE); }} options={sortOptions}      placeholder="Sort by"       />
          </div>

          {/* Active pills */}
          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400">Filters:</span>
              {[
                searchTerm !== ""          && `"${searchTerm}"`,
                selectedSource    !== "all" && selectedSource,
                selectedTopic     !== "all" && selectedTopic,
                selectedSentiment !== "all" && selectedSentiment,
              ].filter(Boolean).map((lbl) => (
                <span key={lbl as string} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {lbl}
                </span>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400 hover:text-red-500 hover:border-red-300 transition-colors"
              >
                <X className="h-3 w-3" /> Clear
              </button>
              <span className="ml-auto text-xs text-zinc-400">
                {filteredArticles.length} result{filteredArticles.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* ── Body grid ── */}
        <div className="grid gap-5 lg:grid-cols-4">

          {/* Feed */}
          <div className="lg:col-span-3 space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-16 text-center">
                <Newspaper className="h-10 w-10 text-zinc-200 dark:text-zinc-700" />
                <p className="mt-3 text-sm text-zinc-400">No articles match your filters.</p>
                <button type="button" onClick={clearFilters} className="mt-3 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {filteredArticles.slice(0, visibleCount).map((article, idx) => (
                  <ArticleCard key={`${article.link ?? ""}${idx}`} article={article} />
                ))}
                {visibleCount < filteredArticles.length ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Load more · {filteredArticles.length - visibleCount} remaining
                  </button>
                ) : (
                  <p className="py-4 text-center text-xs text-zinc-300 dark:text-zinc-700">
                    All {filteredArticles.length} articles shown
                  </p>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* Sentiment overview */}
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Market Sentiment</h3>
              <p className="mb-4 text-xs text-zinc-400">Based on {allArticles.length} articles</p>
              <SentimentBar {...marketSentiment} />
            </div>

            {/* Sources */}
            {topSources.length > 0 && (
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                <h3 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Sources</h3>
                <div className="space-y-1.5">
                  {topSources.map(([source, count]) => (
                    <button
                      key={source}
                      type="button"
                      onClick={() => { setSelectedSource((p) => p === source ? "all" : source); setVisibleCount(PAGE_SIZE); }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedSource === source
                          ? "bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-3.5 w-3.5 shrink-0 text-zinc-300 dark:text-zinc-600" />
                        <span className="truncate">{source}</span>
                      </div>
                      <span className="ml-2 shrink-0 text-xs text-zinc-400">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Topics */}
            {topTopics.length > 0 && (
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                <h3 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topTopics.map(([topic, count]) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => { setSelectedTopic((p) => p === topic ? "all" : topic); setVisibleCount(PAGE_SIZE); }}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        selectedTopic === topic
                          ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      {topic}
                      <span className="ml-1 opacity-40">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sentiment quick-filter */}
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Sentiment Filter</h3>
              <div className="space-y-1.5">
                {([
                  { value: "all",      label: "All Articles", textCls: "text-zinc-600 dark:text-zinc-400" },
                  { value: "positive", label: "Positive",     textCls: "text-emerald-600 dark:text-emerald-400" },
                  { value: "neutral",  label: "Neutral",      textCls: "text-zinc-500" },
                  { value: "negative", label: "Negative",     textCls: "text-red-500" },
                ] as const).map(({ value, label, textCls }) => {
                  const count = value === "all" ? allArticles.length : (sentimentCounts[value] ?? 0);
                  const dot   = SENTIMENT_STYLES[value]?.dot ?? "bg-zinc-400";
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { setSelectedSentiment(value); setVisibleCount(PAGE_SIZE); }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedSentiment === value
                          ? "bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {value !== "all" && <div className={`h-2 w-2 rounded-full ${dot}`} />}
                        <span className={selectedSentiment === value ? "" : textCls}>{label}</span>
                      </div>
                      <span className="text-xs text-zinc-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}