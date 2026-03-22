import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMarket,
  searchStocks,
  formatCompact,
  formatPercent,
  formatRupee,
  getWatchlist,
  type StockCard,
  type MarketIndexCard,
} from "@/data/stockData";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Activity,
  Star,
  BarChart2,
  Clock,
  AlertCircle,
} from "lucide-react";

type GroupKey = "all" | "nifty50" | "sensex30" | "niftynext50" | "watchlist";

const GROUP_TABS: { key: GroupKey; label: string }[] = [
  { key: "nifty50",     label: "Nifty 50"      },
  { key: "sensex30",    label: "Sensex 30"      },
  { key: "niftynext50", label: "Nifty Next 50"  },
  { key: "all",         label: "All"            },
  { key: "watchlist",   label: "★ Watchlist"    },
];

function PctBadge({ pct }: { pct?: number }) {
  const val = pct ?? 0;
  const up = val >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        up
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
      }`}
    >
      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {formatPercent(pct)}
    </span>
  );
}

function StockCardTile({
  stock,
  inWatchlist,
}: {
  stock: StockCard;
  inWatchlist: boolean;
}) {
  const up = (stock.priceChangePct ?? 0) >= 0;

  return (
    <Link to={`/stocks/${encodeURIComponent(stock.symbol)}`}>
      <div
        className={`group relative h-full rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-sm
          transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer
          ${up ? "hover:border-emerald-300" : "hover:border-red-300"}`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {stock.name || stock.symbol}
            </div>
            <div className="mt-0.5 text-xs text-zinc-400">{stock.symbol}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {inWatchlist && (
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            )}
            <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
              {stock.exchange || "NSE"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4">
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {formatRupee(stock.livePrice)}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <PctBadge pct={stock.priceChangePct} />
            {stock.previousClose != null && (
              <span className="text-xs text-zinc-400">
                Prev {formatRupee(stock.previousClose)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
          <div className="text-xs text-zinc-400">
            {stock.volume != null ? (
              <span>Vol: <span className="font-medium text-zinc-600 dark:text-zinc-300">{formatCompact(stock.volume)}</span></span>
            ) : (
              <span className="italic">Vol: —</span>
            )}
          </div>
          <div
            className={`h-2 w-2 rounded-full ${up ? "bg-emerald-400" : "bg-red-400"}`}
          />
        </div>
      </div>
    </Link>
  );
}

function IndexCard({ idx }: { idx: MarketIndexCard }) {
  const up = (idx.changePct ?? 0) >= 0;
  return (
    <Card className="rounded-2xl p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        {idx.name}
      </div>
      <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
        {idx.value?.toLocaleString("en-IN") ?? "—"}
      </div>
      <div className={`mt-1 text-sm font-semibold ${up ? "text-emerald-600" : "text-red-600"}`}>
        {formatPercent(idx.changePct)}
      </div>
    </Card>
  );
}

export default function StockList() {
  const [group, setGroup]                     = useState<GroupKey>("nifty50");
  const [loading, setLoading]                 = useState(false);
  const [stocks, setStocks]                   = useState<StockCard[]>([]);
  const [indices, setIndices]                 = useState<MarketIndexCard[]>([]);
  const [fetchedAt, setFetchedAt]             = useState<string>("");
  const [error, setError]                     = useState<string | null>(null);
  const [input, setInput]                     = useState("");
  const [searchMode, setSearchMode]           = useState(false);
  const [watchlistVersion, setWatchlistVersion] = useState(0);

  const watchlistSymbols = useMemo(() => getWatchlist(), [watchlistVersion]);

  const filteredStocks = useMemo(() => {
    if (group !== "watchlist") return stocks;
    return stocks.filter((s) => watchlistSymbols.includes(s.symbol));
  }, [stocks, group, watchlistSymbols]);

  const gainers = filteredStocks.filter((s) => (s.priceChangePct ?? 0) >= 0).length;
  const losers  = filteredStocks.length - gainers;

  async function loadMarket(target: GroupKey) {
    setLoading(true);
    setError(null);
    try {
      const apiGroup = target === "watchlist" ? "all" : target;
      const data = await fetchMarket(apiGroup);
      setStocks(Array.isArray(data.stocks) ? data.stocks : []);
      setIndices(Array.isArray(data.indices) ? data.indices : []);
      setFetchedAt(data.fetchedAt || "");
      setSearchMode(false);
    } catch (e: any) {
      setError(e?.message || "Failed to load market");
      setStocks([]);
      setIndices([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!input.trim()) {
      loadMarket(group);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchStocks(input.trim());
      setStocks(Array.isArray(data.stocks) ? data.stocks : []);
      setIndices([]);
      setFetchedAt(data.fetchedAt || "");
      setSearchMode(true);
    } catch (e: any) {
      setError(e?.message || "Search failed");
      setStocks([]);
      setIndices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMarket(group); }, [group]);

  useEffect(() => {
    const onFocus = () => setWatchlistVersion((v) => v + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Header ── */}
        <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Stock Explorer</h1>
                <p className="text-xs text-zinc-400">Live Indian market data · Angel One</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pl-9 h-9 text-sm w-full sm:w-56"
                  placeholder="Symbol or name…"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button size="sm" onClick={handleSearch} disabled={loading}>Search</Button>
              <Button size="sm" variant="outline" onClick={() => loadMarket(group)} disabled={loading}>
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* ── Group tabs ── */}
        <div className="flex flex-wrap gap-2">
          {GROUP_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setGroup(key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                group === key
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Index cards ── */}
        {!searchMode && indices.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {indices.map((idx) => <IndexCard key={idx.symbol} idx={idx} />)}
          </div>
        )}

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Activity className="h-3.5 w-3.5" /> Showing
            </div>
            <div className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">{filteredStocks.length}</div>
          </Card>
          <Card className="rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Gainers
            </div>
            <div className="mt-1 text-xl font-bold text-emerald-600">{gainers}</div>
          </Card>
          <Card className="rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <TrendingDown className="h-3.5 w-3.5 text-red-500" /> Losers
            </div>
            <div className="mt-1 text-xl font-bold text-red-500">{losers}</div>
          </Card>
          <Card className="rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Star className="h-3.5 w-3.5 text-amber-400" /> Watchlist
            </div>
            <div className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">{watchlistSymbols.length}</div>
          </Card>
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          {error ? (
            <span className="flex items-center gap-1.5 text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {error}
            </span>
          ) : <span />}
          {fetchedAt && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {new Date(fetchedAt).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Stock grid ── */}
        {!loading && filteredStocks.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStocks.map((stock) => (
              <StockCardTile
                key={stock.symbol}
                stock={stock}
                inWatchlist={watchlistSymbols.includes(stock.symbol)}
              />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && filteredStocks.length === 0 && (
          <Card className="rounded-2xl p-12 text-center">
            <BarChart2 className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-700" />
            <p className="mt-3 text-sm text-zinc-400">
              {group === "watchlist"
                ? "Your watchlist is empty. Add stocks from their detail page."
                : "No stocks found. Try refreshing."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}