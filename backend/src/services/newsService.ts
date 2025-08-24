import axios from 'axios';
import NodeCache from 'node-cache';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  symbols?: string[];
  sentiment?: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
}

export interface NewsQuery {
  symbol?: string;
  category?: 'general' | 'forex' | 'crypto' | 'merger';
  limit?: number;
  from?: string;
  to?: string;
}

class NewsService {
  private cache: NodeCache;
  private newsApiKey: string;
  private finnhubApiKey: string;
  
  constructor() {
    this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
    this.newsApiKey = process.env.NEWS_API_KEY || '';
    this.finnhubApiKey = process.env.FINNHUB_API_KEY || '';
  }

  async getFinancialNews(query: NewsQuery = {}): Promise<NewsArticle[]> {
    const cacheKey = `financial_news_${JSON.stringify(query)}`;
    const cached = this.cache.get<NewsArticle[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      let articles: NewsArticle[] = [];

      // Fetch from multiple sources
      if (query.symbol) {
        articles = await this.getSymbolSpecificNews(query.symbol, query.limit || 20);
      } else {
        articles = await this.getGeneralFinancialNews(query);
      }

      // Sort by publication date
      articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      // Limit results
      const limitedArticles = articles.slice(0, query.limit || 50);

      this.cache.set(cacheKey, limitedArticles);
      return limitedArticles;
    } catch (error) {
      console.error('Error fetching financial news:', error);
      throw new Error('Failed to fetch financial news');
    }
  }

  private async getSymbolSpecificNews(symbol: string, limit: number): Promise<NewsArticle[]> {
    const articles: NewsArticle[] = [];

    try {
      // Finnhub company news
      if (this.finnhubApiKey) {
        const finnhubNews = await this.fetchFinnhubNews(symbol);
        articles.push(...finnhubNews);
      }

      // NewsAPI general search
      if (this.newsApiKey) {
        const newsApiArticles = await this.fetchNewsApiFinancial(symbol);
        articles.push(...newsApiArticles);
      }

      // Remove duplicates based on title similarity
      return this.removeDuplicates(articles).slice(0, limit);
    } catch (error) {
      console.error(`Error fetching news for ${symbol}:`, error);
      return [];
    }
  }

  private async getGeneralFinancialNews(query: NewsQuery): Promise<NewsArticle[]> {
    const articles: NewsArticle[] = [];

    try {
      if (this.newsApiKey) {
        const newsApiArticles = await this.fetchNewsApiFinancial();
        articles.push(...newsApiArticles);
      }

      // Add more sources as needed
      return this.removeDuplicates(articles);
    } catch (error) {
      console.error('Error fetching general financial news:', error);
      return [];
    }
  }

  private async fetchFinnhubNews(symbol?: string): Promise<NewsArticle[]> {
    try {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const params = {
        token: this.finnhubApiKey,
        from: weekAgo.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0],
        ...(symbol && { symbol })
      };

      const response = await axios.get('https://finnhub.io/api/v1/company-news', { params });
      
      return response.data.map((article: any) => ({
        id: `finnhub_${article.id || Date.now()}_${Math.random()}`,
        title: article.headline,
        description: article.summary,
        content: article.summary,
        url: article.url,
        source: 'Finnhub',
        publishedAt: new Date(article.datetime * 1000).toISOString(),
        imageUrl: article.image,
        category: 'general',
        symbols: symbol ? [symbol] : []
      }));
    } catch (error) {
      console.error('Finnhub API error:', error);
      return [];
    }
  }

  private async fetchNewsApiFinancial(symbol?: string): Promise<NewsArticle[]> {
    try {
      const query = symbol 
        ? `${symbol} stock OR ${symbol} earnings OR ${symbol} financial`
        : 'stock market OR finance OR earnings OR economy';
      
      const params = {
        apiKey: this.newsApiKey,
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        domains: 'reuters.com,bloomberg.com,cnbc.com,marketwatch.com,yahoo.com,wsj.com'
      };

      const response = await axios.get('https://newsapi.org/v2/everything', { params });
      
      return response.data.articles.map((article: any) => ({
        id: `newsapi_${article.publishedAt}_${Math.random()}`,
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        imageUrl: article.urlToImage,
        category: 'general',
        symbols: symbol ? [symbol] : []
      }));
    } catch (error) {
      console.error('NewsAPI error:', error);
      return [];
    }
  }

  private removeDuplicates(articles: NewsArticle[]): NewsArticle[] {
    const seen = new Set();
    return articles.filter(article => {
      const key = this.normalizeTitle(article.title);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50); // Use first 50 chars for comparison
  }

  async getTopStories(limit: number = 10): Promise<NewsArticle[]> {
    const cacheKey = `top_stories_${limit}`;
    const cached = this.cache.get<NewsArticle[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const stories = await this.getGeneralFinancialNews({ limit });
      this.cache.set(cacheKey, stories);
      return stories;
    } catch (error) {
      console.error('Error fetching top stories:', error);
      throw new Error('Failed to fetch top stories');
    }
  }

  async searchNews(searchTerm: string, limit: number = 20): Promise<NewsArticle[]> {
    const cacheKey = `search_${searchTerm}_${limit}`;
    const cached = this.cache.get<NewsArticle[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const articles: NewsArticle[] = [];

      if (this.newsApiKey) {
        const params = {
          apiKey: this.newsApiKey,
          q: `${searchTerm} AND (finance OR stock OR market OR earnings)`,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: limit
        };

        const response = await axios.get('https://newsapi.org/v2/everything', { params });
        
        const searchResults = response.data.articles.map((article: any) => ({
          id: `search_${article.publishedAt}_${Math.random()}`,
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          source: article.source.name,
          publishedAt: article.publishedAt,
          imageUrl: article.urlToImage,
          category: 'general',
          symbols: []
        }));

        articles.push(...searchResults);
      }

      const result = this.removeDuplicates(articles);
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error searching news:', error);
      throw new Error('Failed to search news');
    }
  }

  async getTrendingSymbols(): Promise<Array<{ symbol: string; mentions: number; sentiment: string }>> {
    const cacheKey = 'trending_symbols';
    const cached = this.cache.get<Array<{ symbol: string; mentions: number; sentiment: string }>>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // This would typically involve analyzing recent news for symbol mentions
      // For now, return some mock trending data
      const trending = [
        { symbol: 'AAPL', mentions: 45, sentiment: 'positive' },
        { symbol: 'TSLA', mentions: 38, sentiment: 'neutral' },
        { symbol: 'GOOGL', mentions: 32, sentiment: 'positive' },
        { symbol: 'MSFT', mentions: 28, sentiment: 'positive' },
        { symbol: 'AMZN', mentions: 25, sentiment: 'neutral' }
      ];

      this.cache.set(cacheKey, trending, 1800); // 30 minutes cache
      return trending;
    } catch (error) {
      console.error('Error fetching trending symbols:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache.flushAll();
  }
}

export const newsService = new NewsService();