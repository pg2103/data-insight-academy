// src/data/stockData.ts

export type ShareholdingPattern = {
  promoters?: number; // percentage
  fii?: number; // Foreign Institutional Investors
  dii?: number; // Domestic Institutional Investors / MFs
  public?: number; // Retail + Others
  govt?: number; // for PSU/LIC if relevant
  asOf?: string; // e.g., "June 2025"
};

export type FinancialSnapshot = {
  lastFY?: string; // e.g., "FY2025"
  revenueCr?: number;
  netProfitCr?: number;
  eps?: number;
  roePct?: number;
  patMarginPct?: number;
};

export type Stock = {
  slug: string;
  symbol: string;
  bseCode?: string;
  isin?: string;
  name: string;
  sector: string;
  description?: string;
  headquarters?: string;
  foundedYear?: number;
  website?: string;
  keyExecutives?: {
    ceo?: string;
    chairperson?: string;
    md?: string;
  };
  shareholdingPattern?: ShareholdingPattern;
  financials?: FinancialSnapshot;
  lastUpdated?: string;
  news?: Array<{
    title: string;
    url?: string;
    publishedAt?: string;
    source?: string;
  }>;
};

// Filled with key details, finance snapshot, codes, execs, and news as examples

export const TOP_STOCKS: Stock[] = [
  {
    slug: "reliance",
    symbol: "RELIANCE",
    bseCode: "500325",
    isin: "INE002A01018",
    name: "Reliance Industries Ltd",
    sector: "Conglomerate",
    description: "India's largest private-sector conglomerate with businesses in energy, petrochemicals, retail, telecom (Jio), and new energy.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1973,
    website: "https://www.ril.com",
    keyExecutives: {
      chairperson: "Mukesh D. Ambani",
    },
    shareholdingPattern: {
      promoters: 50.07,
      fii: 19.21,
      dii: 19.80,
      public: 10.92,
      govt: 0,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 985000,
      netProfitCr: 76920,
      eps: 115,
      roePct: 8.8,
      patMarginPct: 7.8,
    },
    lastUpdated: "2025-08-24",
    news: [
      {
        title: "Reliance quarterly profit beats analyst estimates",
        source: "Mint",
        publishedAt: "July 20, 2025",
      }
    ],
  },
  {
    slug: "hdfc-bank",
    symbol: "HDFCBANK",
    bseCode: "500180",
    isin: "INE040A01034",
    name: "HDFC Bank Ltd",
    sector: "Banking (Private)",
    description: "Leading private-sector bank; merged with HDFC Ltd in 2023.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1994,
    website: "https://www.hdfcbank.com",
    keyExecutives: {
      ceo: "Sashidhar Jagdishan",
      md: "Sashidhar Jagdishan",
      chairperson: "Atanu Chakraborty",
    },
    shareholdingPattern: {
      promoters: 0,
      fii: 48.84,
      dii: 35.76,
      public: 15.20,
      govt: 0,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 192000,
      netProfitCr: 47000,
      eps: 85.3,
      roePct: 16.5,
      patMarginPct: 24.5,
    },
    lastUpdated: "2025-08-24",
    news: [
      {
        title: "HDFC Bank posts 18% growth in net profit FY2025",
        source: "Business Standard",
        publishedAt: "July 17, 2025"
      }
    ],
  },
  {
    slug: "tcs",
    symbol: "TCS",
    bseCode: "532540",
    isin: "INE467B01029",
    name: "Tata Consultancy Services Ltd",
    sector: "IT Services",
    description: "Global IT services and consulting company.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1968,
    website: "https://www.tcs.com",
    keyExecutives: {
      ceo: "K. Krithivasan",
      chairperson: "N. Chandrasekaran",
    },
    shareholdingPattern: {
      promoters: 71.74,
      asOf: "March 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 242805,
      netProfitCr: 46095,
      eps: 125.4,
      roePct: 38.2,
      patMarginPct: 19,
    },
    news: [
      {
        title: "TCS CEO K. Krithivasan earned ₹26.5 cr in FY2025",
        source: "Economic Times",
        publishedAt: "May 28, 2025",
      },
      {
        title: "TCS to cut ~12,000 jobs in FY2026",
        source: "Reuters",
        publishedAt: "July 29, 2025",
      },
    ],
    lastUpdated: "2025-08-24",
  },
  {
    slug: "bharti-airtel",
    symbol: "BHARTIARTL",
    bseCode: "532454",
    isin: "INE397D01024",
    name: "Bharti Airtel Ltd",
    sector: "Telecom",
    description: "Leading telecom operator providing mobile, broadband, enterprise services in India and several countries.",
    headquarters: "New Delhi",
    foundedYear: 1995,
    website: "https://airtel.com",
    keyExecutives: {
      ceo: "Gopal Vittal",
      chairperson: "Sunil Bharti Mittal",
    },
    shareholdingPattern: {
      promoters: 51.25,
      fii: 26.72,
      dii: 19.08,
      public: 2.81,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 136200,
      netProfitCr: 9250,
      eps: 16.8,
      roePct: 10.2,
      patMarginPct: 6.8,
    },
    news: [
      {
        title: "Singtel sells 1.2% stake in Airtel for S$2B",
        source: "Reuters",
        publishedAt: "May 16, 2025",
      },
    ],
    lastUpdated: "2025-08-24",
  },
  {
    slug: "icici-bank",
    symbol: "ICICIBANK",
    bseCode: "532174",
    isin: "INE090A01021",
    name: "ICICI Bank Ltd",
    sector: "Banking (Private)",
    description: "Major private-sector bank in India across retail, corporate, securities, insurance, and asset management.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1994,
    website: "https://www.icicibank.com",
    keyExecutives: {
      ceo: "Sandeep Bakhshi",
    },
    shareholdingPattern: {
      promoters: 0,
      fii: 46.76,
      dii: 43.82,
      public: 9.42,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 135260,
      netProfitCr: 34870,
      eps: 50.5,
      roePct: 17.1,
      patMarginPct: 20,
    },
    lastUpdated: "2025-08-24",
  },
  {
    slug: "sbi",
    symbol: "SBIN",
    bseCode: "500112",
    isin: "INE062A01020",
    name: "State Bank of India",
    sector: "Banking (PSU)",
    description: "India's largest public sector bank with broad domestic and global reach.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1955,
    website: "https://sbi.co.in",
    keyExecutives: {},
    shareholdingPattern: {
      promoters: 57.49,
      fii: 11.92,
      dii: 24.43,
      public: 6.16,
      asOf: "June 2025",
      govt: 57.49,
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 439083,
      netProfitCr: 60729,
      eps: 68.9,
      roePct: 15.1,
      patMarginPct: 13.8,
    },
    lastUpdated: "2025-08-24",
  },
  {
    slug: "infosys",
    symbol: "INFY",
    bseCode: "500209",
    isin: "INE009A01021",
    name: "Infosys Ltd",
    sector: "IT Services",
    description: "Global IT services, consulting, and outsourcing company.",
    headquarters: "Bengaluru, Karnataka",
    foundedYear: 1981,
    website: "https://www.infosys.com",
    keyExecutives: {
      ceo: "Salil Parekh",
      chairperson: "Nandan Nilekani",
    },
    shareholdingPattern: {
      promoters: 14.61,
      fii: 31.92,
      dii: 39.33,
      public: 14.14,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 162109,
      netProfitCr: 26155,
      eps: 62.1,
      roePct: 31.2,
      patMarginPct: 16.1,
    },
    lastUpdated: "2025-08-24",
  },
  {
    slug: "lic",
    symbol: "LICI",
    bseCode: "543526",
    isin: "INE0J1Y01017",
    name: "Life Insurance Corporation of India",
    sector: "Insurance (Life)",
    description: "India’s largest life insurance provider with massive agency presence and investment base.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1956,
    website: "https://licindia.in",
    keyExecutives: {},
    shareholdingPattern: {
      promoters: 96.5,
      fii: 0.8,
      dii: 0.2,
      public: 2.5,
      govt: 96.5,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 771800,
      netProfitCr: 38920,
      eps: 61.4,
      roePct: 10.2,
      patMarginPct: 5.1,
    },
    lastUpdated: "2025-08-24",
  },
  {
    slug: "itc",
    symbol: "ITC",
    bseCode: "500875",
    isin: "INE154A01025",
    name: "ITC Ltd",
    sector: "FMCG (Diversified)",
    description: "Diversified group with FMCG, hotels, paperboards, agriculture, and IT businesses.",
    headquarters: "Kolkata, West Bengal",
    foundedYear: 1910,
    website: "https://www.itcportal.com",
    keyExecutives: {
      chairperson: "Sanjiv Puri",
    },
    shareholdingPattern: {
      promoters: 0,
      fii: 40.2,
      dii: 42.0,
      public: 17.8,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 75337,
      netProfitCr: 19689,
      eps: 15.7,
      roePct: 29.8,
      patMarginPct: 26.1,
    },
    lastUpdated: "2025-08-24",
  },
  {
    slug: "hul",
    symbol: "HINDUNILVR",
    bseCode: "500696",
    isin: "INE030A01027",
    name: "Hindustan Unilever Ltd",
    sector: "FMCG",
    description: "India's top FMCG firm in categories like home care, personal care, food and refreshments.",
    headquarters: "Mumbai, Maharashtra",
    foundedYear: 1933,
    website: "https://www.hul.co.in",
    keyExecutives: {
      ceo: "Rohit Jawa",
    },
    shareholdingPattern: {
      promoters: 61.9,
      fii: 14.8,
      dii: 8.2,
      public: 15.1,
      asOf: "June 2025",
    },
    financials: {
      lastFY: "FY2025",
      revenueCr: 66257,
      netProfitCr: 9235,
      eps: 39.5,
      roePct: 33.5,
      patMarginPct: 14,
    },
    lastUpdated: "2025-08-24",
  },
];

export const getStockBySlug = (slug: string) =>
  TOP_STOCKS.find((s) => s.slug === slug);
