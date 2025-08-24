import { Router } from 'express';
import { authenticateToken, AuthenticatedRequest, optionalAuth } from '../middleware/auth';
import { validateSentimentAnalysis } from '../middleware/validation';
import { sentimentLimiter } from '../middleware/rateLimiting';
import { sentimentService } from '../services/sentimentService';

const router = Router();

// Analyze single text sentiment
router.post('/analyze', optionalAuth, sentimentLimiter, validateSentimentAnalysis, async (req: AuthenticatedRequest, res) => {
  try {
    const { text, symbol } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Text is required for sentiment analysis'
      });
    }
    
    const result = sentimentService.analyzeSentiment(text);
    
    // Add metadata
    const response = {
      success: true,
      data: {
        ...result,
        symbol: symbol || null,
        analyzedAt: new Date().toISOString(),
        textLength: text.length,
        wordCount: text.split(/\s+/).length
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze sentiment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Analyze batch sentiment (multiple texts)
router.post('/analyze-batch', authenticateToken, sentimentLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { texts, symbol } = req.body;
    
    if (!Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({
        error: 'Texts array is required for batch sentiment analysis'
      });
    }
    
    if (texts.length > 50) {
      return res.status(400).json({
        error: 'Maximum 50 texts allowed per batch'
      });
    }
    
    // Validate each text
    for (const text of texts) {
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({
          error: 'All texts must be non-empty strings'
        });
      }
    }
    
    const result = sentimentService.analyzeBatchSentiment(texts);
    
    const response = {
      success: true,
      data: {
        ...result,
        symbol: symbol || null,
        analyzedAt: new Date().toISOString(),
        batchSize: texts.length,
        totalWordCount: texts.reduce((sum, text) => sum + text.split(/\s+/).length, 0)
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Batch sentiment analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze batch sentiment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Analyze sentiment trends
router.post('/trends', authenticateToken, sentimentLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { sentimentData } = req.body;
    
    if (!Array.isArray(sentimentData) || sentimentData.length < 2) {
      return res.status(400).json({
        error: 'At least 2 sentiment data points required for trend analysis'
      });
    }
    
    // Validate sentiment data structure
    for (const data of sentimentData) {
      if (!data.timestamp || !data.sentiment) {
        return res.status(400).json({
          error: 'Each data point must have timestamp and sentiment fields'
        });
      }
    }
    
    const trends = sentimentService.analyzeTrends(sentimentData);
    
    res.json({
      success: true,
      data: {
        trends,
        dataPoints: sentimentData.length,
        timespan: {
          start: sentimentData[0].timestamp,
          end: sentimentData[sentimentData.length - 1].timestamp
        },
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Sentiment trends analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze sentiment trends',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get sentiment statistics for a symbol
router.get('/stats/:symbol', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbol } = req.params;
    const { days = 7 } = req.query;
    
    // In a real implementation, you would fetch historical sentiment data from database
    // For now, return mock statistics
    const stats = {
      symbol: symbol.toUpperCase(),
      period: `${days} days`,
      averageSentiment: 0.15,
      sentimentDistribution: {
        positive: 45,
        neutral: 30,
        negative: 25
      },
      volatility: 0.32,
      trend: 'improving',
      lastUpdated: new Date().toISOString(),
      dataPoints: 150
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Sentiment stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch sentiment statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Compare sentiment across multiple symbols
router.post('/compare', authenticateToken, sentimentLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { symbols, texts } = req.body;
    
    if (!Array.isArray(symbols) || symbols.length < 2 || symbols.length > 10) {
      return res.status(400).json({
        error: 'Between 2 and 10 symbols required for comparison'
      });
    }
    
    if (!Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({
        error: 'Texts array is required'
      });
    }
    
    const batchResult = sentimentService.analyzeBatchSentiment(texts);
    
    // Create comparison data (in real implementation, you'd analyze symbol-specific texts)
    const comparison = symbols.map(symbol => ({
      symbol: symbol.toUpperCase(),
      sentiment: batchResult.overallSentiment,
      score: batchResult.averageScore + (Math.random() - 0.5) * 2, // Add some variation
      confidence: 0.75 + Math.random() * 0.25,
      mentions: Math.floor(Math.random() * 50) + 10
    }));
    
    res.json({
      success: true,
      data: {
        comparison,
        batchAnalysis: batchResult,
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Sentiment comparison error:', error);
    res.status(500).json({
      error: 'Failed to compare sentiment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get sentiment analysis history for user
router.get('/history', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const userId = req.user!.id;
    
    // In a real implementation, you would fetch from database
    // For now, return mock history data
    const history = Array.from({ length: Number(limit) }, (_, i) => ({
      id: `analysis_${Date.now()}_${i}`,
      text: `Sample text analysis ${i + 1}`,
      sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
      score: (Math.random() - 0.5) * 10,
      confidence: 0.5 + Math.random() * 0.5,
      analyzedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      symbol: ['AAPL', 'GOOGL', 'TSLA', null][Math.floor(Math.random() * 4)]
    }));
    
    res.json({
      success: true,
      data: {
        history,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: 100,
          totalPages: Math.ceil(100 / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Sentiment history error:', error);
    res.status(500).json({
      error: 'Failed to fetch sentiment history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;