import yahooFinance from 'yahoo-finance2';
import axios from 'axios';
import NodeCache from 'node-cache';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  timestamp: string;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  website: string;
  employees: number;
  marketCap: number;
  logo?: string;
}

export interface TechnicalIndicators {
  sma20: number;
  sma50: number;
  sma200: number;
  rsi: number;
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
}

class StockService {
  private cache: NodeCache;
  private alphaVantageKey: string;
  private finnhubKey: string;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 60 }); // 1 minute cache for stock data
    this.alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY || '';
    this.finnhubKey = process.env.FINNHUB_API_KEY || '';
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    const cacheKey = `quote_${symbol.toUpperCase()}`;
    const cached = this.cache.get<StockQuote>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Try Yahoo Finance first (free and reliable)
      const quote = await this.getYahooQuote(symbol);
      this.cache.set(cacheKey, quote, 30); // 30 seconds cache for real-time data
      return quote;
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      
      // Fallback to Alpha Vantage or Finnhub if available
      if (this.finnhubKey) {
        try {
          const quote = await this.getFinnhubQuote(symbol);
          this.cache.set(cacheKey, quote, 30);
          return quote;
        } catch (fallbackError) {
          console.error(`Fallback error for ${symbol}:`, fallbackError);
        }
      }
      
      throw new Error(`Failed to fetch quote for ${symbol}`);
    }
  }

  private async getYahooQuote(symbol: string): Promise<StockQuote> {
    const result = await yahooFinance.quote(symbol);
    
    if (!result) {
      throw new Error(`No data found for symbol ${symbol}`);
    }

    return {
      symbol: symbol.toUpperCase(),
      price: result.regularMarketPrice || 0,
      change: result.regularMarketChange || 0,
      changePercent: result.regularMarketChangePercent || 0,
      volume: result.regularMarketVolume || 0,
      marketCap: result.marketCap,
      previousClose: result.regularMarketPreviousClose || 0,
      open: result.regularMarketOpen || 0,
      high: result.regularMarketDayHigh || 0,
      low: result.regularMarketDayLow || 0,
      timestamp: new Date().toISOString()
    };
  }

  private async getFinnhubQuote(symbol: string): Promise<StockQuote> {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol.toUpperCase(),
        token: this.finnhubKey
      }
    });

    const data = response.data;
    const change = data.c - data.pc;
    const changePercent = (change / data.pc) * 100;

    return {
      symbol: symbol.toUpperCase(),
      price: data.c,
      change,
      changePercent,
      volume: 0, // Finnhub basic doesn't include volume
      previousClose: data.pc,
      open: data.o,
      high: data.h,
      low: data.l,
      timestamp: new Date().toISOString()
    };
  }

  async getHistoricalData(
    symbol: string, 
    period: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' = '1y',
    interval: '1d' | '1wk' | '1mo' = '1d'
  ): Promise<HistoricalData[]> {
    const cacheKey = `historical_${symbol.toUpperCase()}_${period}_${interval}`;
    const cached = this.cache.get<HistoricalData[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const result = await yahooFinance.historical(symbol, {
        period1: this.getPeriodStartDate(period),
        period2: new Date(),
        interval: interval as any
      });

      const historicalData: HistoricalData[] = result.map(item => ({
        date: item.date.toISOString().split('T')[0],
        open: item.open || 0,
        high: item.high || 0,
        low: item.low || 0,
        close: item.close || 0,
        adjClose: item.adjClose || item.close || 0,
        volume: item.volume || 0
      }));

      // Cache for longer periods have longer cache time
      const cacheTime = period === '1d' ? 300 : 3600; // 5 minutes for 1d, 1 hour for longer
      this.cache.set(cacheKey, historicalData, cacheTime);
      
      return historicalData;
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      throw new Error(`Failed to fetch historical data for ${symbol}`);
    }
  }

  private getPeriodStartDate(period: string): Date {
    const now = new Date();
    const periodMap: { [key: string]: number } = {
      '1d': 1,
      '5d': 5,
      '1mo': 30,
      '3mo': 90,
      '6mo': 180,
      '1y': 365,
      '2y': 730,
      '5y': 1825
    };

    const daysBack = periodMap[period] || 365;
    return new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile | null> {
    const cacheKey = `profile_${symbol.toUpperCase()}`;
    const cached = this.cache.get<CompanyProfile>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Try Yahoo Finance first
      const result = await yahooFinance.quoteSummary(symbol, {
        modules: ['assetProfile', 'summaryDetail']
      });

      if (!result.assetProfile) {
        return null;
      }

      const profile: CompanyProfile = {
        symbol: symbol.toUpperCase(),
        name: result.assetProfile.longName || symbol.toUpperCase(),
        description: result.assetProfile.longBusinessSummary || '',
        sector: result.assetProfile.sector || '',
        industry: result.assetProfile.industry || '',
        website: result.assetProfile.website || '',
        employees: result.assetProfile.fullTimeEmployees || 0,
        marketCap: result.summaryDetail?.marketCap || 0
      };

      this.cache.set(cacheKey, profile, 3600); // 1 hour cache
      return profile;
    } catch (error) {
      console.error(`Error fetching company profile for ${symbol}:`, error);
      return null;
    }
  }

  async getMultipleQuotes(symbols: string[]): Promise<StockQuote[]> {
    const quotes = await Promise.allSettled(
      symbols.map(symbol => this.getStockQuote(symbol))
    );

    return quotes
      .filter((result): result is PromiseFulfilledResult<StockQuote> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  async searchStocks(query: string): Promise<Array<{ symbol: string; name: string; type: string }>> {
    const cacheKey = `search_${query.toLowerCase()}`;
    const cached = this.cache.get<Array<{ symbol: string; name: string; type: string }>>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const result = await yahooFinance.search(query, {
        quotesCount: 10,
        newsCount: 0
      });

      const searchResults = result.quotes.map(quote => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname || quote.symbol,
        type: quote.quoteType || 'EQUITY'
      }));

      this.cache.set(cacheKey, searchResults, 1800); // 30 minutes cache
      return searchResults;
    } catch (error) {
      console.error(`Error searching stocks for ${query}:`, error);
      return [];
    }
  }

  async getMarketSummary(): Promise<{
    indices: StockQuote[];
    movers: {
      gainers: StockQuote[];
      losers: StockQuote[];
    };
  }> {
    const cacheKey = 'market_summary';
    const cached = this.cache.get<{
      indices: StockQuote[];
      movers: { gainers: StockQuote[]; losers: StockQuote[] };
    }>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Major indices
      const indicesSymbols = ['^GSPC', '^DJI', '^IXIC', '^RUT', '^VIX'];
      const indices = await this.getMultipleQuotes(indicesSymbols);

      // Top movers (simplified - in a real implementation, you'd get this from a financial data provider)
      const popularSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];
      const quotes = await this.getMultipleQuotes(popularSymbols);
      
      // Sort by change percent
      const sortedQuotes = quotes.sort((a, b) => b.changePercent - a.changePercent);
      const gainers = sortedQuotes.slice(0, 5);
      const losers = sortedQuotes.slice(-5).reverse();

      const summary = {
        indices,
        movers: { gainers, losers }
      };

      this.cache.set(cacheKey, summary, 300); // 5 minutes cache
      return summary;
    } catch (error) {
      console.error('Error fetching market summary:', error);
      throw new Error('Failed to fetch market summary');
    }
  }

  async getTechnicalIndicators(symbol: string, period: number = 20): Promise<TechnicalIndicators | null> {
    try {
      const historicalData = await this.getHistoricalData(symbol, '6mo', '1d');
      
      if (historicalData.length < 200) {
        return null; // Need at least 200 data points for reliable indicators
      }

      const closes = historicalData.map(d => d.close);
      
      return {
        sma20: this.calculateSMA(closes, 20),
        sma50: this.calculateSMA(closes, 50),
        sma200: this.calculateSMA(closes, 200),
        rsi: this.calculateRSI(closes, 14),
        bollinger: this.calculateBollingerBands(closes, 20),
        macd: this.calculateMACD(closes)
      };
    } catch (error) {
      console.error(`Error calculating technical indicators for ${symbol}:`, error);
      return null;
    }
  }

  private calculateSMA(prices: number[], period: number): number {
    const slice = prices.slice(-period);
    return slice.reduce((sum, price) => sum + price, 0) / slice.length;
  }

  private calculateRSI(prices: number[], period: number = 14): number {
    const changes = prices.slice(1).map((price, i) => price - prices[i]);
    const gains = changes.map(change => change > 0 ? change : 0);
    const losses = changes.map(change => change < 0 ? Math.abs(change) : 0);
    
    const avgGain = this.calculateSMA(gains.slice(-period), period);
    const avgLoss = this.calculateSMA(losses.slice(-period), period);
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  private calculateBollingerBands(prices: number[], period: number = 20): {
    upper: number;
    middle: number;
    lower: number;
  } {
    const slice = prices.slice(-period);
    const sma = this.calculateSMA(slice, period);
    const squaredDiffs = slice.map(price => Math.pow(price - sma, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / period;
    const stdDev = Math.sqrt(variance);
    
    return {
      upper: sma + (2 * stdDev),
      middle: sma,
      lower: sma - (2 * stdDev)
    };
  }

  private calculateMACD(prices: number[]): {
    macd: number;
    signal: number;
    histogram: number;
  } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    
    // For simplicity, using SMA for signal line (typically EMA is used)
    const signal = this.calculateSMA([macd], 9);
    const histogram = macd - signal;
    
    return { macd, signal, histogram };
  }

  private calculateEMA(prices: number[], period: number): number {
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  }

  clearCache(): void {
    this.cache.flushAll();
  }
}

export const stockService = new StockService();