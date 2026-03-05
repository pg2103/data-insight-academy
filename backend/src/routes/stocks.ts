import { Router, Request, Response } from 'express';
import { validateStockData, validateSymbol } from '../middleware/validation';
import { dataFetchLimiter } from '../middleware/rateLimiting';
import { stockService } from '../services/stockService';

const router = Router();

/**
 * Get real-time stock quote
 */
router.get(
  '/quote/:symbol',
  dataFetchLimiter,
  validateSymbol,
  async (req: Request, res: Response) => {
    try {
      const { symbol } = req.params;

      const quote = await stockService.getStockQuote(symbol.toUpperCase());

      res.json({
        success: true,
        data: quote,
      });
    } catch (error) {
      console.error(`Quote fetch error for ${req.params.symbol}:`, error);
      res.status(500).json({
        error: 'Failed to fetch stock quote',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Get multiple stock quotes
 */
router.post(
  '/quotes',
  dataFetchLimiter,
  async (req: Request, res: Response) => {
    try {
      const { symbols } = req.body as { symbols: string[] };

      if (!Array.isArray(symbols) || symbols.length === 0) {
        return res.status(400).json({
          error: 'Symbols array is required',
        });
      }

      if (symbols.length > 20) {
        return res.status(400).json({
          error: 'Maximum 20 symbols allowed per request',
        });
      }

      const quotes = await stockService.getMultipleQuotes(symbols);

      res.json({
        success: true,
        data: {
          quotes,
          count: quotes.length,
          requested: symbols.length,
          lastUpdated: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Multiple quotes fetch error:', error);
      res.status(500).json({
        error: 'Failed to fetch stock quotes',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Get historical stock data
 */
router.get(
  '/history/:symbol',
  dataFetchLimiter,
  validateStockData,
  async (req: Request, res: Response) => {
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
          lastUpdated: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(`Historical data fetch error for ${req.params.symbol}:`, error);
      res.status(500).json({
        error: 'Failed to fetch historical data',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Get company profile
 */
router.get(
  '/profile/:symbol',
  dataFetchLimiter,
  validateSymbol,
  async (req: Request, res: Response) => {
    try {
      const { symbol } = req.params;

      const profile = await stockService.getCompanyProfile(symbol.toUpperCase());

      if (!profile) {
        return res.status(404).json({
          error: 'Company profile not found',
          message: `No profile data available for ${symbol.toUpperCase()}`,
        });
      }

      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      console.error(`Profile fetch error for ${req.params.symbol}:`, error);
      res.status(500).json({
        error: 'Failed to fetch company profile',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Search stocks
 */
router.get(
  '/search',
  dataFetchLimiter,
  async (req: Request, res: Response) => {
    try {
      const { q: query } = req.query;

      if (!query || typeof query !== 'string') {
        return res.status(400).json({
          error: 'Search query is required',
        });
      }

      const results = await stockService.searchStocks(query);

      res.json({
        success: true,
        data: {
          results,
          count: results.length,
          query,
          lastUpdated: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(`Stock search error for query "${req.query.q}":`, error);
      res.status(500).json({
        error: 'Failed to search stocks',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Get market summary
 */
router.get(
  '/market-summary',
  dataFetchLimiter,
  async (_req: Request, res: Response) => {
    try {
      const summary = await stockService.getMarketSummary();

      res.json({
        success: true,
        data: {
          ...summary,
          lastUpdated: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Market summary fetch error:', error);
      res.status(500).json({
        error: 'Failed to fetch market summary',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Clear stock cache
 */
router.post(
  '/clear-cache',
  async (_req: Request, res: Response) => {
    try {
      stockService.clearCache();

      res.json({
        success: true,
        message: 'Stock cache cleared successfully',
      });
    } catch (error) {
      console.error('Cache clear error:', error);
      res.status(500).json({
        error: 'Failed to clear cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export default router;