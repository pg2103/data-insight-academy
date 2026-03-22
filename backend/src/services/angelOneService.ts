import os from 'os';
import crypto from 'crypto';

import { getUniverse } from '../config/stockUniverse';

// ---------------------------------------------------------------------------
// TOTP generator using Node built-in crypto
// ---------------------------------------------------------------------------
function generateTOTP(secret: string): string {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const secretUpper = secret.toUpperCase().replace(/=+$/, '');
  let bits = '';

  for (const char of secretUpper) {
    const val = base32Chars.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }

  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }

  const counter = Math.floor(Date.now() / 1000 / 30);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hmac = crypto.createHmac('sha1', Buffer.from(bytes));
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0x0f;
  const code =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  return String(code % 1_000_000).padStart(6, '0');
}

// ---------------------------------------------------------------------------
// Rate limiter — enforces minimum gap between requests
// ---------------------------------------------------------------------------
let lastRequestAt = 0;
const MIN_REQUEST_GAP_MS = 1100; // 1.1s between requests — safe for free tier

async function rateLimit() {
  const now = Date.now();
  const wait = MIN_REQUEST_GAP_MS - (now - lastRequestAt);
  if (wait > 0) {
    await new Promise((res) => setTimeout(res, wait));
  }
  lastRequestAt = Date.now();
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// ---------------------------------------------------------------------------

const ROOT_URL = 'https://apiconnect.angelone.in';

const ROUTES = {
  login: '/rest/auth/angelbroking/user/v1/loginByPassword',
  profile: '/rest/secure/angelbroking/user/v1/getProfile',
  searchScrip: '/rest/secure/angelbroking/order/v1/searchScrip',
  marketQuote: '/rest/secure/angelbroking/market/v1/quote',
  candle: '/rest/secure/angelbroking/historical/v1/getCandleData',
};
const API_KEY = process.env.ANGEL_ONE_API_KEY || 'OQHuMyMy';
const CLIENT_CODE = process.env.ANGEL_ONE_CLIENT_CODE || 'P777951';
const PASSWORD = process.env.ANGEL_ONE_PASSWORD || '1278';
const TOTP_SECRET = process.env.ANGEL_ONE_TOTP_SECRET || 'KX7CFEMAHIRQRGA7SBAHDUCEEE';
type SessionState = {
  jwtToken: string;
  refreshToken: string;
  feedToken: string;
  expiresAt: number;
};

type TokenInfo = {
  symboltoken: string;
  tradingsymbol: string;
  exchange: string;
  name?: string;
};

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

type AngelApiResponse<T = unknown> = {
  status?: boolean | string;
  message?: string;
  data?: T;
};

type AngelLoginData = {
  jwtToken: string;
  refreshToken: string;
  feedToken: string;
};

type AngelScripRow = {
  symboltoken?: string | number;
  tradingsymbol?: string;
  exchange?: string;
  symbolname?: string;
  name?: string;
};

type AngelMarketQuoteData = {
  fetched?: Array<Record<string, unknown>>;
};

let sessionState: SessionState | null = null;

const memoryCache = new Map<string, CacheEntry<unknown>>();

function getCache<T>(key: string): T | null {
  const hit = memoryCache.get(key);
  if (!hit) return null;

  if (Date.now() > hit.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  return hit.value as T;
}

function setCache<T>(key: string, value: T, ttlMs: number) {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

function requireEnv() {
  if (!API_KEY || !CLIENT_CODE || !PASSWORD || !TOTP_SECRET) {
    throw new Error(
      'Missing one or more Angel One env vars: ANGEL_ONE_API_KEY, ANGEL_ONE_CLIENT_CODE, ANGEL_ONE_PASSWORD, ANGEL_ONE_TOTP_SECRET'
    );
  }
}

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    const addresses = nets[name] || [];
    for (const net of addresses) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return '127.0.0.1';
}

function getMacAddress() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    const addresses = nets[name] || [];
    for (const net of addresses) {
      if (net.mac && net.mac !== '00:00:00:00:00:00') return net.mac;
    }
  }
  return '00:00:00:00:00:00';
}

async function getPublicIp() {
  const cacheKey = 'meta:publicIp';
  const cached = getCache<string>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch('https://api.ipify.org');
    const ip = (await res.text()).trim();
    setCache(cacheKey, ip, 60 * 60 * 1000); // cache 1 hour
    return ip;
  } catch {
    return '127.0.0.1';
  }
}

async function buildBaseHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-PrivateKey': API_KEY,
    'X-ClientLocalIP': getLocalIp(),
    'X-ClientPublicIP': await getPublicIp(),
    'X-MACAddress': getMacAddress(),
  };
}

// ---------------------------------------------------------------------------
// Core fetch with rate limiting + exponential backoff retry on 403/429
// ---------------------------------------------------------------------------
async function angelFetch<T = unknown>(
  method: 'GET' | 'POST',
  path: string,
  body?: Record<string, unknown>,
  jwtToken?: string,
  extraQuery?: Record<string, string>,
  retries = 3
): Promise<AngelApiResponse<T>> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    await rateLimit();

    const headers: Record<string, string> = await buildBaseHeaders();
    if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;

    const url = new URL(`${ROOT_URL}${path}`);
    if (extraQuery) {
      Object.entries(extraQuery).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();

    // Rate limited — back off and retry
    if (response.status === 403 || response.status === 429) {
      const backoff = attempt * 2000; // 2s, 4s, 6s
      console.warn(
        `[AngelOne] Rate limited (${response.status}), attempt ${attempt}/${retries}, waiting ${backoff}ms...`
      );
      await sleep(backoff);
      continue;
    }

    let data: AngelApiResponse<T>;
    try {
      data = (text ? JSON.parse(text) : {}) as AngelApiResponse<T>;
    } catch {
      throw new Error(
        `Angel One returned non-JSON (status ${response.status}):\n${text}`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Angel One request failed with status ${response.status}`
      );
    }

    return data;
  }

  throw new Error(
    `Angel One request to ${path} failed after ${retries} retries due to rate limiting. ` +
    `Consider reducing the number of symbols or increasing cache TTL.`
  );
}

async function angelPost<T = unknown>(
  path: string,
  body: Record<string, unknown>,
  jwtToken?: string
): Promise<AngelApiResponse<T>> {
  return angelFetch<T>('POST', path, body, jwtToken);
}

async function angelGet<T = unknown>(
  path: string,
  jwtToken: string,
  extraQuery?: Record<string, string>
): Promise<AngelApiResponse<T>> {
  return angelFetch<T>('GET', path, undefined, jwtToken, extraQuery);
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
async function login() {
  requireEnv();
  const totpCode = generateTOTP(TOTP_SECRET);

  const data = await angelPost<AngelLoginData>(ROUTES.login, {
    clientcode: CLIENT_CODE,
    password: PASSWORD,
    totp: totpCode,
  });

  if (!data?.data?.jwtToken) {
    throw new Error(data?.message || 'Angel One login failed');
  }

  sessionState = {
    jwtToken: data.data.jwtToken,
    refreshToken: data.data.refreshToken,
    feedToken: data.data.feedToken,
    expiresAt: Date.now() + 10 * 60 * 60 * 1000,
  };

  return sessionState;
}

async function ensureSession() {
  if (sessionState && Date.now() < sessionState.expiresAt) {
    return sessionState;
  }
  return login();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function chunkArray<T>(items: T[], size: number) {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

function normalizeSymbol(symbol: string) {
  return symbol.replace(/\.NS$/i, '').replace(/-EQ$/i, '').trim().toUpperCase();
}

// ---------------------------------------------------------------------------
// Symbol resolution — sequential with caching to avoid rate limits
// ---------------------------------------------------------------------------
async function searchSymbolToken(symbol: string): Promise<TokenInfo | null> {
  const normalized = normalizeSymbol(symbol);
  const cacheKey = `symbol:${normalized}`;
  const cached = getCache<TokenInfo>(cacheKey);
  if (cached) return cached;

  const session = await ensureSession();

  const result = await angelPost<AngelScripRow[]>(
    ROUTES.searchScrip,
    { exchange: 'NSE', searchscrip: normalized },
    session.jwtToken
  );

  const rows = Array.isArray(result?.data) ? result.data : [];

  const exact =
    rows.find((row) => normalizeSymbol(row.tradingsymbol || '') === normalized) ||
    rows.find((row) =>
      String(row.tradingsymbol || '').toUpperCase().includes(`${normalized}-EQ`)
    ) ||
    rows[0];

  if (!exact) return null;

  const tokenInfo: TokenInfo = {
    symboltoken: String(exact.symboltoken),
    tradingsymbol: String(exact.tradingsymbol),
    exchange: String(exact.exchange || 'NSE'),
    name: exact.symbolname || exact.name || exact.tradingsymbol,
  };

  // Cache symbol tokens for 24h — they never change
  setCache(cacheKey, tokenInfo, 24 * 60 * 60 * 1000);
  return tokenInfo;
}

// Resolves symbols SEQUENTIALLY (not parallel) to respect rate limits
async function resolveUniverse(group: string): Promise<TokenInfo[]> {
  const symbols = getUniverse(group);
  const results: TokenInfo[] = [];

  for (const symbol of symbols) {
    const token = await searchSymbolToken(symbol);
    if (token) results.push(token);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Market quotes — batch up to 50 tokens per request instead of 1 at a time
// ---------------------------------------------------------------------------
async function fetchQuotes(tokens: TokenInfo[]) {
  if (!tokens.length) return [];

  const session = await ensureSession();

  // Angel One accepts up to 50 tokens per marketQuote call
  // Batching dramatically reduces number of API calls
  const BATCH_SIZE = 50;
  const chunks = chunkArray(tokens, BATCH_SIZE);
  const rows: Array<Record<string, unknown>> = [];

  for (const chunk of chunks) {
    const exchangeTokens: Record<string, string[]> = {};

    for (const item of chunk) {
      if (!exchangeTokens[item.exchange]) {
        exchangeTokens[item.exchange] = [];
      }
      exchangeTokens[item.exchange].push(item.symboltoken);
    }

    const result = await angelPost<AngelMarketQuoteData>(
      ROUTES.marketQuote,
      { mode: 'FULL', exchangeTokens },
      session.jwtToken
    );

    const fetched = Array.isArray(result?.data?.fetched)
      ? result.data.fetched
      : [];

    rows.push(...fetched);
  }

  return rows;
}

function mapQuoteRow(row: Record<string, unknown>) {
  const ltp = typeof row['ltp'] === 'number' ? row['ltp'] : undefined;
  const close = typeof row['close'] === 'number' ? row['close'] : undefined;

  const pct =
    typeof ltp === 'number' && typeof close === 'number' && close !== 0
      ? ((ltp - close) / close) * 100
      : undefined;

  const tradingSymbol = String(row['tradingSymbol'] ?? '');

  return {
    symbol: tradingSymbol,
    slug: tradingSymbol.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: tradingSymbol,
    shortName: tradingSymbol,
    livePrice: ltp,
    previousClose: close,
    priceChangePct: pct,
    marketCap: undefined,
    currency: 'INR',
    exchange: String(row['exchange'] ?? 'NSE'),
    sector: undefined,
    industry: undefined,
    website: undefined,
    dayHigh: typeof row['high'] === 'number' ? row['high'] : undefined,
    dayLow: typeof row['low'] === 'number' ? row['low'] : undefined,
    volume: typeof row['tradeVolume'] === 'number' ? row['tradeVolume'] : undefined,
    fiftyTwoWeekHigh:
      typeof row['fiftyTwoWeekHigh'] === 'number' ? row['fiftyTwoWeekHigh'] : undefined,
    fiftyTwoWeekLow:
      typeof row['fiftyTwoWeekLow'] === 'number' ? row['fiftyTwoWeekLow'] : undefined,
  };
}

function toDateTime(date: Date, hhmm: string) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hhmm}`;
}

function rangeToCandleParams(range: string) {
  const now = new Date();
  const from = new Date(now);

  if (range === '1d') {
    from.setDate(now.getDate() - 1);
    return { interval: 'ONE_MINUTE', fromdate: toDateTime(from, '09:15'), todate: toDateTime(now, '15:30') };
  }
  if (range === '5d') {
    from.setDate(now.getDate() - 5);
    return { interval: 'FIFTEEN_MINUTE', fromdate: toDateTime(from, '09:15'), todate: toDateTime(now, '15:30') };
  }
  if (range === '6mo') {
    from.setMonth(now.getMonth() - 6);
    return { interval: 'ONE_DAY', fromdate: toDateTime(from, '09:15'), todate: toDateTime(now, '15:30') };
  }
  if (range === '1y') {
    from.setFullYear(now.getFullYear() - 1);
    return { interval: 'ONE_DAY', fromdate: toDateTime(from, '09:15'), todate: toDateTime(now, '15:30') };
  }

  from.setMonth(now.getMonth() - 1);
  return { interval: 'ONE_DAY', fromdate: toDateTime(from, '09:15'), todate: toDateTime(now, '15:30') };
}

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------
export async function testAngelSession() {
  const session = await ensureSession();
  const profile = await angelGet(ROUTES.profile, session.jwtToken, {
    refreshToken: session.refreshToken,
  });
  return { ok: true, clientCode: CLIENT_CODE, profile: profile?.data || null };
}

export async function getMarketSnapshot(group: string) {
  const cacheKey = `market:${group}`;
  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const resolved = await resolveUniverse(group);
  const quoteRows = await fetchQuotes(resolved);
  const stocks = quoteRows.map(mapQuoteRow);

  const payload = {
    fetchedAt: new Date().toISOString(),
    group,
    total: stocks.length,
    indices: [],
    stocks,
  };

  // Cache market snapshots for 5 minutes on free tier
  setCache(cacheKey, payload, 5 * 60 * 1000);
  return payload;
}

export async function searchMarket(query: string) {
  const token = await searchSymbolToken(query);
  if (!token) {
    return { fetchedAt: new Date().toISOString(), total: 0, stocks: [] };
  }

  const rows = await fetchQuotes([token]);
  return {
    fetchedAt: new Date().toISOString(),
    total: rows.length,
    stocks: rows.map(mapQuoteRow),
  };
}

export async function getStockDetails(symbol: string, range: string) {
  const token = await searchSymbolToken(symbol);
  if (!token) {
    throw new Error(`Could not resolve symbol token for ${symbol}`);
  }

  const session = await ensureSession();
  const quoteRows = await fetchQuotes([token]);
  const quote = quoteRows[0] || {};
  const candleParams = rangeToCandleParams(range);

  const candleRes = await angelPost<unknown[][]>(
    ROUTES.candle,
    {
      exchange: token.exchange,
      symboltoken: token.symboltoken,
      interval: candleParams.interval,
      fromdate: candleParams.fromdate,
      todate: candleParams.todate,
    },
    session.jwtToken
  );

  const candles = Array.isArray(candleRes?.data) ? candleRes.data : [];

  const chart = candles.map((item: unknown[]) => ({
    time: item?.[0]
      ? new Date(item[0] as string | number).toLocaleDateString('en-IN')
      : '',
    open: typeof item?.[1] === 'number' ? item[1] : undefined,
    high: typeof item?.[2] === 'number' ? item[2] : undefined,
    low: typeof item?.[3] === 'number' ? item[3] : undefined,
    price: typeof item?.[4] === 'number' ? item[4] : undefined,
    volume: typeof item?.[5] === 'number' ? item[5] : undefined,
  }));

  const row = mapQuoteRow(quote);

  return {
    fetchedAt: new Date().toISOString(),
    stock: {
      ...row,
      symbol: token.tradingsymbol,
      name: token.name || token.tradingsymbol,
      shortName: token.tradingsymbol,
      description: token.name || token.tradingsymbol,
      headquarters: undefined,
      employees: undefined,
      peRatio: undefined,
      dividendYield: undefined,
      beta: undefined,
      avgVolume: undefined,
      chart,
    },
  };
}