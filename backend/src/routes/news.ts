import { Router, Request, Response } from 'express';
import { validateNewsQuery } from '../middleware/validation';
import { newsLimiter } from '../middleware/rateLimiting';
import { newsService } from '../services/newsService';
import { sentimentService } from '../services/sentimentService';

const router = Router();

// Get financial news with optional filters
router.get('/', newsLimiter, validateNewsQuery, async (req: Request, res: Response) => {
  try {
    const { symbol, category, limit = 20, from, to } = req.query;

    const query = {
      symbol: symbol as string,
      category: category as 'general' | 'forex' | 'crypto' | 'merger',
      limit: parseInt(limit as string, 10),
      from: from as string,
      to: to as string,
    };

    const articles = await newsService.getFinancialNews(query);

    res.json({
      success: true,
      data: {
        articles,
        count: articles.length,
        filters: query,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch news',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get top financial stories
router.get('/top', newsLimiter, async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;

    const stories = await newsService.getTopStories(parseInt(limit as string, 10));

    res.json({
      success: true,
      data: {
        stories,
        count: stories.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Top stories fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch top stories',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Search news by query
router.get('/search', newsLimiter, async (req: Request, res: Response) => {
  try {
    const { q: searchTerm, limit = 20 } = req.query;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const articles = await newsService.searchNews(
      searchTerm,
      parseInt(limit as string, 10)
    );

    res.json({
      success: true,
      data: {
        articles,
        count: articles.length,
        searchTerm,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({
      error: 'Failed to search news',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get news for specific symbol
router.get('/symbol/:symbol', newsLimiter, async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const { limit = 20 } = req.query;

    const articles = await newsService.getFinancialNews({
      symbol: symbol.toUpperCase(),
      limit: parseInt(limit as string, 10),
    });

    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        articles,
        count: articles.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(`News fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch symbol news',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get trending symbols from news mentions
router.get('/trending', newsLimiter, async (req: Request, res: Response) => {
  try {
    const trending = await newsService.getTrendingSymbols();

    res.json({
      success: true,
      data: {
        trending,
        count: trending.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Trending symbols fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch trending symbols',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Analyze sentiment of news articles
router.post('/analyze-sentiment', newsLimiter, async (req: Request, res: Response) => {
  try {
    const { articles } = req.body;

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ error: 'Articles array is required' });
    }

    if (articles.length > 20) {
      return res.status(400).json({
        error: 'Maximum 20 articles allowed per request',
      });
    }

    const texts = articles.map((article: any) =>
      [article.title, article.description, article.content]
        .filter(Boolean)
        .join(' ')
        .substring(0, 1000)
    );

    const sentimentResults = sentimentService.analyzeBatchSentiment(texts);

    const articlesWithSentiment = articles.map((article, index) => ({
      ...article,
      sentiment: sentimentResults.results[index] || null,
    }));

    res.json({
      success: true,
      data: {
        articles: articlesWithSentiment,
        overallSentiment: sentimentResults.overallSentiment,
        averageScore: sentimentResults.averageScore,
        distribution: sentimentResults.distribution,
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('News sentiment analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze news sentiment',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;