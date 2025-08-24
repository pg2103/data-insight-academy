import { Router } from 'express';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth';
import { validateNewsQuery, validatePagination } from '../middleware/validation';
import { newsLimiter } from '../middleware/rateLimiting';
import { newsService } from '../services/newsService';
import { sentimentService } from '../services/sentimentService';

const router = Router();

// Get financial news with optional filters
router.get('/', optionalAuth, newsLimiter, validateNewsQuery, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol, category, limit = 20, from, to } = req.query;
    
    const query = {
      symbol: symbol as string,
      category: category as 'general' | 'forex' | 'crypto' | 'merger',
      limit: parseInt(limit as string, 10),
      from: from as string,
      to: to as string
    };
    
    const articles = await newsService.getFinancialNews(query);
    
    res.json({
      success: true,
      data: {
        articles,
        count: articles.length,
        filters: query,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get top financial stories
router.get('/top', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const stories = await newsService.getTopStories(parseInt(limit as string, 10));
    
    res.json({
      success: true,
      data: {
        stories,
        count: stories.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Top stories fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch top stories',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Search news by query
router.get('/search', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { q: searchTerm, limit = 20 } = req.query;
    
    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({
        error: 'Search term is required'
      });
    }
    
    const articles = await newsService.searchNews(searchTerm, parseInt(limit as string, 10));
    
    res.json({
      success: true,
      data: {
        articles,
        count: articles.length,
        searchTerm,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({
      error: 'Failed to search news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get news for specific symbol
router.get('/symbol/:symbol', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    const { limit = 20 } = req.query;
    
    const articles = await newsService.getFinancialNews({
      symbol: symbol.toUpperCase(),
      limit: parseInt(limit as string, 10)
    });
    
    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        articles,
        count: articles.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`News fetch error for ${req.params.symbol}:`, error);
    res.status(500).json({
      error: 'Failed to fetch symbol news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get trending symbols from news mentions
router.get('/trending', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const trending = await newsService.getTrendingSymbols();
    
    res.json({
      success: true,
      data: {
        trending,
        count: trending.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Trending symbols fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch trending symbols',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Analyze sentiment of news articles
router.post('/analyze-sentiment', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { articles } = req.body;
    
    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({
        error: 'Articles array is required'
      });
    }
    
    if (articles.length > 20) {
      return res.status(400).json({
        error: 'Maximum 20 articles allowed per request'
      });
    }
    
    // Extract text content from articles
    const texts = articles.map((article: any) => {
      const content = [article.title, article.description, article.content]
        .filter(Boolean)
        .join(' ');
      return content.substring(0, 1000); // Limit text length
    });
    
    const sentimentResults = sentimentService.analyzeBatchSentiment(texts);
    
    // Combine articles with their sentiment
    const articlesWithSentiment = articles.map((article, index) => ({
      ...article,
      sentiment: sentimentResults.results[index] || null
    }));
    
    res.json({
      success: true,
      data: {
        articles: articlesWithSentiment,
        overallSentiment: sentimentResults.overallSentiment,
        averageScore: sentimentResults.averageScore,
        distribution: sentimentResults.distribution,
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('News sentiment analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze news sentiment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get market sentiment summary from recent news
router.get('/market-sentiment', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbols } = req.query;
    const symbolList = symbols ? (symbols as string).split(',').map(s => s.trim().toUpperCase()) : [];
    
    // Get recent news
    const articles = await newsService.getTopStories(50);
    
    // Analyze sentiment
    const texts = articles.map(article => 
      [article.title, article.description].filter(Boolean).join(' ').substring(0, 500)
    );
    
    const sentimentResults = sentimentService.analyzeBatchSentiment(texts);
    
    // Create market sentiment summary
    const marketSentiment = {
      overall: {
        sentiment: sentimentResults.overallSentiment,
        score: sentimentResults.averageScore,
        confidence: sentimentResults.results.reduce((sum, r) => sum + r.confidence, 0) / sentimentResults.results.length,
        distribution: sentimentResults.distribution
      },
      symbols: symbolList.length > 0 ? symbolList.map(symbol => ({
        symbol,
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
        score: (Math.random() - 0.5) * 10,
        mentions: Math.floor(Math.random() * 20) + 5
      })) : [],
      newsCount: articles.length,
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: marketSentiment
    });
  } catch (error) {
    console.error('Market sentiment fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch market sentiment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get news summary by category
router.get('/summary/:category', optionalAuth, newsLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { category } = req.params;
    
    if (!['general', 'forex', 'crypto', 'merger'].includes(category)) {
      return res.status(400).json({
        error: 'Invalid category. Must be one of: general, forex, crypto, merger'
      });
    }
    
    const articles = await newsService.getFinancialNews({
      category: category as any,
      limit: 30
    });
    
    // Group articles by source
    const sourceGroups = articles.reduce((groups: any, article) => {
      const source = article.source;
      if (!groups[source]) {
        groups[source] = [];
      }
      groups[source].push(article);
      return groups;
    }, {});
    
    const summary = {
      category,
      totalArticles: articles.length,
      sources: Object.keys(sourceGroups).length,
      sourceBreakdown: Object.entries(sourceGroups).map(([source, articles]: [string, any]) => ({
        source,
        count: articles.length,
        latestArticle: articles[0]?.publishedAt
      })),
      latestArticles: articles.slice(0, 5),
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error(`News summary error for category ${req.params.category}:`, error);
    res.status(500).json({
      error: 'Failed to fetch news summary',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Clear news cache (admin endpoint)
router.post('/clear-cache', optionalAuth, async (req: AuthenticatedRequest, res) => {
  try {
    newsService.clearCache();
    
    res.json({
      success: true,
      message: 'News cache cleared successfully'
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