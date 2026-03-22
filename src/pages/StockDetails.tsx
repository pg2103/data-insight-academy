import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchStockDetails,
  formatCompact,
  formatPercent,
  formatRupee,
  getWatchlist,
  toggleWatchlist,
  type StockDetail,
} from "@/data/stockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  BarChart2,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ── Helpers ─────────────────────────────────────────────────────────────────

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: React.ReactNode;
  highlight?: "up" | "down";
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 py-2.5 text-sm last:border-b-0">
      <div className="text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={`font-medium text-right ${
          highlight === "up"
            ? "text-emerald-600"
            : highlight === "down"
            ? "text-red-500"
            : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {value ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-zinc-400">{sub}</div>}
    </div>
  );
}

const RANGE_TABS = [
  { key: "1d",  label: "1D" },
  { key: "5d",  label: "5D" },
  { key: "1mo", label: "1M" },
  { key: "6mo", label: "6M" },
  { key: "1y",  label: "1Y" },
] as const;

type RangeKey = (typeof RANGE_TABS)[number]["key"];

function rangeToInterval(r: RangeKey): "5m" | "15m" | "1d" | "1wk" {
  if (r === "1d")  return "5m";
  if (r === "5d")  return "15m";
  if (r === "1y")  return "1wk";
  return "1d";
}

// Custom tooltip for the area chart
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 px-3 py-2 shadow-lg text-xs">
      <div className="text-zinc-400 mb-1">{label}</div>
      <div className="font-bold text-zinc-900 dark:text-white">
        {formatRupee(payload[0]?.value)}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StockDetails() {
  const { slug } = useParams<{ slug: string }>();

  const [stock, setStock]         = useState<StockDetail | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [range, setRange]         = useState<RangeKey>("1mo");
  const [fetchedAt, setFetchedAt] = useState("");
  const [watchlisted, setWatchlisted] = useState(false);

  const symbol = useMemo(() => decodeURIComponent(slug || ""), [slug]);

  const loadDetails = async (r: RangeKey = range) => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStockDetails(symbol, r, rangeToInterval(r));
      setStock(data.stock);
      setFetchedAt(data.fetchedAt);
      setWatchlisted(getWatchlist().includes(data.stock.symbol));
    } catch (e: any) {
      setError(e?.message || "Failed to load stock details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDetails(range); }, [symbol, range]);

  const toggle = () => {
    if (!stock) return;
    const next = toggleWatchlist(stock.symbol);
    setWatchlisted(next.includes(stock.symbol));
  };

  const chartData   = stock?.chart ?? [];
  const up          = (stock?.priceChangePct ?? 0) >= 0;
  const accentColor = up ? "#10b981" : "#ef4444";

  // Compute chart Y-domain with a little padding
  const prices = chartData.map((d) => d.price).filter((p): p is number => p != null);
  const yMin = prices.length ? Math.min(...prices) * 0.998 : "auto";
  const yMax = prices.length ? Math.max(...prices) * 1.002 : "auto";

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="h-28 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div className="h-96 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
              <div className="h-28 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
            </div>
            <div className="space-y-5">
              <div className="h-64 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
              <div className="h-40 rounded-2xl border bg-white dark:bg-zinc-900 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !stock) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
        <Card className="rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-red-400" />
          <p className="mt-3 text-sm text-red-600 font-medium">{error || "Stock not found"}</p>
          <Link to="/stocks" className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900">
            <ArrowLeft className="h-4 w-4" /> Back to stocks
          </Link>
        </Card>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── Header card ── */}
        <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

            {/* Left: identity + price */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-white">{stock.name}</h1>
                  <Badge variant="outline" className="text-xs">{stock.symbol}</Badge>
                  <Badge variant="secondary" className="text-xs">{stock.exchange || "NSE"}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {formatRupee(stock.livePrice)}
                  </span>
                  <span className={`flex items-center gap-1 text-base font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
                    {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatPercent(stock.priceChangePct)}
                  </span>
                  {stock.previousClose != null && (
                    <span className="text-sm text-zinc-400">
                      prev close {formatRupee(stock.previousClose)}
                    </span>
                  )}
                </div>

                {fetchedAt && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" />
                    {new Date(fetchedAt).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={toggle}
                className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  watchlisted
                    ? "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-400"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                <Star className={`h-4 w-4 ${watchlisted ? "fill-amber-400 text-amber-400" : ""}`} />
                {watchlisted ? "Watchlisted" : "Watchlist"}
              </button>

              <button
                onClick={() => loadDetails(range)}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>

              <Link
                to="/stocks"
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* ── Range selector ── */}
        <div className="flex gap-2">
          {RANGE_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                range === key
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Main content grid ── */}
        <div className="grid gap-5 lg:grid-cols-3">

          {/* Left: chart + summary ── */}
          <div className="space-y-5 lg:col-span-2">

            {/* Price chart */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4 text-zinc-400" />
                  Price chart
                  <span className="ml-auto text-xs font-normal text-zinc-400">
                    {chartData.length} data points
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {chartData.length === 0 ? (
                  <div className="flex h-64 items-center justify-center text-sm text-zinc-400">
                    No chart data available for this range.
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 340 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor={accentColor} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={accentColor} stopOpacity={0.01} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="time"
                          tick={{ fontSize: 11, fill: "#a1a1aa" }}
                          minTickGap={30}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          domain={[yMin, yMax]}
                          tick={{ fontSize: 11, fill: "#a1a1aa" }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `₹${Number(v).toFixed(0)}`}
                          width={60}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={accentColor}
                          fill="url(#stockFill)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart summary stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatBox
                label="Day High"
                value={formatRupee(stock.dayHigh)}
              />
              <StatBox
                label="Day Low"
                value={formatRupee(stock.dayLow)}
              />
              <StatBox
                label="52W High"
                value={
                  stock.fiftyTwoWeekHigh != null
                    ? formatRupee(stock.fiftyTwoWeekHigh)
                    : <span className="text-zinc-300 dark:text-zinc-600 text-base">—</span>
                }
              />
              <StatBox
                label="52W Low"
                value={
                  stock.fiftyTwoWeekLow != null
                    ? formatRupee(stock.fiftyTwoWeekLow)
                    : <span className="text-zinc-300 dark:text-zinc-600 text-base">—</span>
                }
              />
            </div>

            {/* Volume + trade info */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatBox
                label="Volume"
                value={formatCompact(stock.volume)}
                sub="Today"
              />
              <StatBox
                label="Avg Volume"
                value={
                  stock.avgVolume != null
                    ? formatCompact(stock.avgVolume)
                    : <span className="text-zinc-300 dark:text-zinc-600 text-base">—</span>
                }
                sub="Not available"
              />
              <StatBox
                label="Market Cap"
                value={
                  stock.marketCap != null
                    ? formatCompact(stock.marketCap)
                    : <span className="text-zinc-300 dark:text-zinc-600 text-base">—</span>
                }
                sub="Not available"
              />
            </div>
          </div>

          {/* Right: snapshot + profile ── */}
          <aside className="space-y-5">

            {/* Price snapshot */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <Row label="Live Price"      value={formatRupee(stock.livePrice)} highlight={up ? "up" : "down"} />
                <Row label="Previous Close"  value={formatRupee(stock.previousClose)} />
                <Row label="Change"          value={formatPercent(stock.priceChangePct)} highlight={up ? "up" : "down"} />
                <Row label="Day High"        value={formatRupee(stock.dayHigh)} />
                <Row label="Day Low"         value={formatRupee(stock.dayLow)} />
                <Row label="Volume"          value={formatCompact(stock.volume)} />
                <Row label="Exchange"        value={stock.exchange || "NSE"} />
                <Row label="Currency"        value={stock.currency || "INR"} />
              </CardContent>
            </Card>

            {/* Fundamental data — clearly marked as unavailable on free tier */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  P/E, Market Cap, Beta and Dividend Yield are not provided by the Angel One free-tier API.
                </div>
                <Row label="P/E Ratio"       value={stock.peRatio?.toFixed(2)} />
                <Row label="Dividend Yield"  value={stock.dividendYield != null ? `${(stock.dividendYield * 100).toFixed(2)}%` : undefined} />
                <Row label="Beta"            value={stock.beta?.toFixed(2)} />
                <Row label="Market Cap"      value={formatCompact(stock.marketCap)} />
              </CardContent>
            </Card>

            {/* Company profile */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Company</CardTitle>
              </CardHeader>
              <CardContent>
                <Row label="Sector"       value={stock.sector} />
                <Row label="Industry"     value={stock.industry} />
                <Row label="HQ"           value={stock.headquarters} />
                <Row label="Employees"    value={stock.employees?.toLocaleString("en-IN")} />
                <Row
                  label="Website"
                  value={
                    stock.website ? (
                      <a
                        href={stock.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Visit ↗
                      </a>
                    ) : undefined
                  }
                />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}