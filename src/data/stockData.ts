export type MarketIndexCard = {
  symbol: string;
  name: string;
  value?: number;
  changePct?: number;
};

export type StockCard = {
  symbol: string;
  slug: string;
  name: string;
  shortName?: string;
  instrumentKey?: string;
  livePrice?: number;
  previousClose?: number;
  priceChangePct?: number;
  marketCap?: number;
  currency?: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  website?: string;
  dayHigh?: number;
  dayLow?: number;
  volume?: number;
};

export type StockHistoryPoint = {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
};

export type StockDetail = StockCard & {
  description?: string;
  headquarters?: string;
  employees?: number;
  peRatio?: number;
  dividendYield?: number;
  beta?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  avgVolume?: number;
  chart?: StockHistoryPoint[];
};

export type MarketResponse = {
  fetchedAt: string;
  group: string;
  total: number;
  indices: MarketIndexCard[];
  stocks: StockCard[];
};

export type DetailResponse = {
  fetchedAt: string;
  stock: StockDetail;
};

const API_BASE =
  import.meta.env.VITE_STOCK_API_BASE || 'http://localhost:8000/api/stocks';

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const err = await res.json();
      message = err?.error || err?.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

export async function fetchMarket(
  group: 'all' | 'nifty50' | 'sensex30' | 'niftynext50' = 'all'
) {
  return safeFetch<MarketResponse>(
    `${API_BASE}/market?group=${group}`
  );
}

export async function searchStocks(query: string) {
  return safeFetch<{ fetchedAt: string; total: number; stocks: StockCard[] }>(
    `${API_BASE}/search?q=${encodeURIComponent(query)}`
  );
}

export async function fetchStockDetails(
  symbol: string,
  range: '1d' | '5d' | '1mo' | '6mo' | '1y' = '1mo'
) {
  return safeFetch<DetailResponse>(
    `${API_BASE}/${encodeURIComponent(symbol)}?range=${range}`
  );
}

export function formatRupee(n?: number) {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  return `₹${Number(n).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;
}

export function formatCompact(n?: number) {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  return Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatPercent(n?: number) {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}

export function getWatchlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem('watchlist_v2') || '[]');
  } catch {
    return [];
  }
}

export function toggleWatchlist(symbol: string) {
  const current = getWatchlist();
  const exists = current.includes(symbol);
  const next = exists
    ? current.filter((s) => s !== symbol)
    : [...current, symbol];

  localStorage.setItem('watchlist_v2', JSON.stringify(next));
  return next;
}