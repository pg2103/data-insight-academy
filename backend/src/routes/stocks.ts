import { Router } from 'express';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth';
import { validateStockData, validateSymbol } from '../middleware/validation';
import { dataFetchLimiter } from '../middleware/rateLimiting';
import { stockService } from '../services/stockService';

const router = Router();

// Get real-time stock quote
router.get('/quote/:symbol', optionalAuth, dataFetchLimiter, validateSymbol, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    
    const quote = await stockService.getStockQuote(symbol.toUpperCase());
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error(`Quote fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch stock quote',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get multiple stock quotes
router.post('/quotes', optionalAuth, dataFetchLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbols } = req.body;
    
    if (!Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({
        error: 'Symbols array is required'
      });
    }
    
    if (symbols.length > 20) {
      return res.status(400).json({
        error: 'Maximum 20 symbols allowed per request'
      });
    }
    
    const quotes = await stockService.getMultipleQuotes(symbols);
    
    res.json({
      success: true,
      data: {
        quotes,
        count: quotes.length,
        requested: symbols.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Multiple quotes fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch stock quotes',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get historical stock data
router.get('/history/:symbol', optionalAuth, dataFetchLimiter, validateStockData, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y', interval = '1d' } = req.query;
    
    const historicalData = await stockService.getHistoricalData(
      symbol.toUpperCase(),
      period as any,
      interval as any
    );
    
    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        period,
        interval,
        data: historicalData,
        count: historicalData.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`Historical data fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch historical data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get company profile
router.get('/profile/:symbol', optionalAuth, dataFetchLimiter, validateSymbol, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    
    const profile = await stockService.getCompanyProfile(symbol.toUpperCase());
    
    if (!profile) {
      return res.status(404).json({
        error: 'Company profile not found',
        message: `No profile data available for ${symbol.toUpperCase()}`
      });
    }
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error(`Profile fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch company profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Search stocks
router.get('/search', optionalAuth, dataFetchLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Search query is required'
      });
    }
    
    if (query.length < 1) {
      return res.status(400).json({
        error: 'Search query must be at least 1 character long'
      });
    }
    
    const results = await stockService.searchStocks(query);
    
    res.json({
      success: true,
      data: {
        results,
        count: results.length,
        query,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`Stock search error for query "${req.query.q}":`, error);
    res.status(500).json({
      error: 'Failed to search stocks',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get market summary
router.get('/market-summary', optionalAuth, dataFetchLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const summary = await stockService.getMarketSummary();
    
    res.json({
      success: true,
      data: {
        ...summary,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Market summary fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch market summary',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get technical indicators
router.get('/indicators/:symbol', optionalAuth, dataFetchLimiter, validateSymbol, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    const { period = 20 } = req.query;
    
    const indicators = await stockService.getTechnicalIndicators(
      symbol.toUpperCase(),
      parseInt(period as string, 10)
    );
    
    if (!indicators) {
      return res.status(404).json({
        error: 'Technical indicators not available',
        message: `Insufficient data to calculate indicators for ${symbol.toUpperCase()}`
      });
    }
    
    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        indicators,
        period: parseInt(period as string, 10),
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`Technical indicators fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch technical indicators',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get stock performance comparison
router.post('/compare', optionalAuth, dataFetchLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbols, period = '1y' } = req.body;
    
    if (!Array.isArray(symbols) || symbols.length < 2) {
      return res.status(400).json({
        error: 'At least 2 symbols required for comparison'
      });
    }
    
    if (symbols.length > 10) {
      return res.status(400).json({
        error: 'Maximum 10 symbols allowed for comparison'
      });
    }
    
    // Get current quotes for all symbols
    const quotes = await stockService.getMultipleQuotes(symbols);
    
    // Get historical data for performance calculation
    const historicalPromises = symbols.map(symbol => 
      stockService.getHistoricalData(symbol, period as any, '1d')
    );
    
    const historicalResults = await Promise.allSettled(historicalPromises);
    
    const comparison = quotes.map((quote, index) => {
      const historical = historicalResults[index];
      let performance = null;
      
      if (historical.status === 'fulfilled' && historical.value.length > 0) {
        const firstPrice = historical.value[0].close;
        const lastPrice = quote.price;
        const change = lastPrice - firstPrice;
        const changePercent = (change / firstPrice) * 100;
        
        performance = {
          periodReturn: changePercent,
          periodChange: change,
          startPrice: firstPrice,
          endPrice: lastPrice,
          dataPoints: historical.value.length
        };
      }
      
      return {
        ...quote,
        performance
      };
    });
    
    res.json({
      success: true,
      data: {
        comparison,
        period,
        count: comparison.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Stock comparison error:', error);
    res.status(500).json({
      error: 'Failed to compare stocks',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get stock statistics
router.get('/stats/:symbol', optionalAuth, dataFetchLimiter, validateSymbol, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y' } = req.query;
    
    const [quote, historical, profile] = await Promise.allSettled([
      stockService.getStockQuote(symbol.toUpperCase()),
      stockService.getHistoricalData(symbol.toUpperCase(), period as any, '1d'),
      stockService.getCompanyProfile(symbol.toUpperCase())
    ]);
    
    const stats: any = {
      symbol: symbol.toUpperCase(),
      period,
      lastUpdated: new Date().toISOString()
    };
    
    if (quote.status === 'fulfilled') {
      stats.currentPrice = quote.value.price;
      stats.dayChange = quote.value.change;
      stats.dayChangePercent = quote.value.changePercent;
      stats.volume = quote.value.volume;
    }
    
    if (historical.status === 'fulfilled' && historical.value.length > 0) {
      const prices = historical.value.map(d => d.close);
      const volumes = historical.value.map(d => d.volume);
      
      stats.periodHigh = Math.max(...prices);
      stats.periodLow = Math.min(...prices);
      stats.avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
      
      // Calculate volatility (standard deviation of daily returns)
      const returns = prices.slice(1).map((price, i) => (price - prices[i]) / prices[i]);
      const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
      const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
      stats.volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized volatility
    }
    
    if (profile.status === 'fulfilled') {
      stats.marketCap = profile.value.marketCap;
      stats.sector = profile.value.sector;
      stats.industry = profile.value.industry;
    }
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error(`Stock stats fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch stock statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Clear stock cache
router.post('/clear-cache', optionalAuth, async (req: AuthenticatedRequest, res) => {
  try {
    stockService.clearCache();
    
    res.json({
      success: true,
      message: 'Stock cache cleared successfully'
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;