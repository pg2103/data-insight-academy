import Sentiment from 'sentiment';
import * as natural from 'natural';

export interface SentimentResult {
  score: number;
  comparative: number;
  calculation: Array<{ [key: string]: number }>;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  financialIndicators?: {
    bullishWords: string[];
    bearishWords: string[];
    financialScore: number;
  };
}

export interface BatchSentimentResult {
  results: SentimentResult[];
  averageScore: number;
  overallSentiment: 'positive' | 'negative' | 'neutral';
  distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

class SentimentAnalysisService {
  private sentiment: Sentiment;
  private tokenizer: any;
  
  // Financial-specific word lists
  private bullishWords = [
    'growth', 'profit', 'revenue', 'earnings', 'beat', 'outperform', 'strong',
    'bullish', 'buy', 'upgrade', 'gain', 'rise', 'surge', 'rally', 'boom',
    'expansion', 'success', 'positive', 'optimistic', 'favorable', 'robust',
    'solid', 'healthy', 'momentum', 'breakthrough', 'milestone', 'record',
    'exceed', 'stellar', 'impressive', 'outstanding'
  ];

  private bearishWords = [
    'loss', 'decline', 'fall', 'drop', 'bearish', 'sell', 'downgrade',
    'negative', 'weak', 'poor', 'disappointing', 'miss', 'underperform',
    'crash', 'plunge', 'slump', 'recession', 'crisis', 'risk', 'concern',
    'worry', 'uncertainty', 'volatile', 'unstable', 'debt', 'bankruptcy',
    'layoffs', 'cuts', 'struggle', 'challenge', 'threat', 'warning'
  ];

  constructor() {
    this.sentiment = new Sentiment();
    this.tokenizer = new natural.WordTokenizer();
    
    // Add financial terms to sentiment dictionary
    this.addFinancialTerms();
  }

  private addFinancialTerms(): void {
    const financialTerms: { [key: string]: number } = {};
    
    // Add bullish terms with positive scores
    this.bullishWords.forEach(word => {
      financialTerms[word] = 3;
    });
    
    // Add bearish terms with negative scores
    this.bearishWords.forEach(word => {
      financialTerms[word] = -3;
    });
    
    // Register financial terms
    this.sentiment.registerLanguage('en', financialTerms);
  }

  analyzeSentiment(text: string): SentimentResult {
    // Clean and tokenize text
    const cleanText = this.cleanText(text);
    const tokens = this.tokenizer.tokenize(cleanText.toLowerCase());
    
    // Perform sentiment analysis
    const result = this.sentiment.analyze(cleanText);
    
    // Calculate financial indicators
    const financialIndicators = this.analyzeFinancialSentiment(tokens);
    
    // Determine overall sentiment
    const sentiment = this.categorizeSentiment(result.score, result.comparative);
    
    // Calculate confidence score
    const confidence = this.calculateConfidence(result, tokens.length);
    
    return {
      score: result.score,
      comparative: result.comparative,
      calculation: result.calculation,
      tokens: result.tokens,
      words: result.words,
      positive: result.positive,
      negative: result.negative,
      sentiment,
      confidence,
      financialIndicators
    };
  }

  analyzeBatchSentiment(texts: string[]): BatchSentimentResult {
    const results = texts.map(text => this.analyzeSentiment(text));
    
    // Calculate averages and distribution
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const averageScore = totalScore / results.length;
    
    const distribution = results.reduce(
      (dist, result) => {
        dist[result.sentiment]++;
        return dist;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );
    
    const overallSentiment = this.categorizeSentiment(averageScore, averageScore / results.length);
    
    return {
      results,
      averageScore,
      overallSentiment,
      distribution
    };
  }

  private cleanText(text: string): string {
    return text
      .replace(/[^\w\s]/gi, ' ') // Remove special characters
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }

  private analyzeFinancialSentiment(tokens: string[]): {
    bullishWords: string[];
    bearishWords: string[];
    financialScore: number;
  } {
    const bullishFound = tokens.filter(token => 
      this.bullishWords.includes(token.toLowerCase())
    );
    
    const bearishFound = tokens.filter(token => 
      this.bearishWords.includes(token.toLowerCase())
    );
    
    const financialScore = (bullishFound.length * 2) - (bearishFound.length * 2);
    
    return {
      bullishWords: bullishFound,
      bearishWords: bearishFound,
      financialScore
    };
  }

  private categorizeSentiment(score: number, comparative: number): 'positive' | 'negative' | 'neutral' {
    // Use both absolute score and comparative score for better accuracy
    if (score > 0 && comparative > 0.1) {
      return 'positive';
    } else if (score < 0 && comparative < -0.1) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }

  private calculateConfidence(result: any, tokenCount: number): number {
    // Base confidence on the number of sentiment words found and text length
    const sentimentWordCount = result.positive.length + result.negative.length;
    const wordRatio = sentimentWordCount / tokenCount;
    const scoreStrength = Math.abs(result.comparative);
    
    // Combine factors for confidence score (0-1)
    let confidence = (wordRatio * 0.6) + (scoreStrength * 0.4);
    confidence = Math.min(confidence, 1); // Cap at 1
    confidence = Math.max(confidence, 0.1); // Minimum confidence
    
    return Math.round(confidence * 100) / 100;
  }

  // Analyze sentiment trends over time
  analyzeTrends(sentimentData: Array<{ timestamp: string; sentiment: SentimentResult }>): {
    trend: 'improving' | 'declining' | 'stable';
    momentum: number;
    volatility: number;
  } {
    if (sentimentData.length < 2) {
      return { trend: 'stable', momentum: 0, volatility: 0 };
    }

    const scores = sentimentData.map(d => d.sentiment.score);
    const recentScores = scores.slice(-5); // Last 5 data points
    const earlierScores = scores.slice(0, Math.min(5, scores.length - 5));

    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const earlierAvg = earlierScores.length > 0 
      ? earlierScores.reduce((a, b) => a + b, 0) / earlierScores.length 
      : recentAvg;

    const momentum = recentAvg - earlierAvg;
    
    // Calculate volatility (standard deviation)
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
    const volatility = Math.sqrt(variance);

    let trend: 'improving' | 'declining' | 'stable';
    if (momentum > 0.5) {
      trend = 'improving';
    } else if (momentum < -0.5) {
      trend = 'declining';
    } else {
      trend = 'stable';
    }

    return {
      trend,
      momentum: Math.round(momentum * 100) / 100,
      volatility: Math.round(volatility * 100) / 100
    };
  }
}

export const sentimentService = new SentimentAnalysisService();