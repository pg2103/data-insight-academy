import { useState, useMemo } from "react";
// --- Components & Icons ---
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Newspaper, Search, Filter, TrendingUp, TrendingDown, Clock, ExternalLink, Minus
} from "lucide-react";

// --- Data ---
import newsData from "../data/news.json";

// --- Types ---
type Article = {
  title: string;
  summary: string;
  link?: string;
  source?: string;
  timestamp?: string;
  sentiment?: {
    label: string;
    score: number;
  };
};

type RawArticle = {
  headline: string;
  synopsis: string;
  link?: string;
  source?: string;
  published_at?: string;
  sentiment?: {
    label: string;
    score: number;
  };
};

// --- Helpers ---
const getSentimentBadge = (sentiment: string, confidence: number) => {
  const color =
    sentiment === "positive"
      ? "bg-success/10 text-success border-success/20"
      : sentiment === "negative"
      ? "bg-destructive/10 text-destructive border-destructive/20"
      : "bg-muted text-muted-foreground border-border";

  const icon =
    sentiment === "positive" ? (
      <TrendingUp className="w-3 h-3" />
    ) : sentiment === "negative" ? (
      <TrendingDown className="w-3 h-3" />
    ) : (
      <Minus className="w-3 h-3" />
    );

  return (
    <Badge variant="outline" className={`${color} flex items-center space-x-1`}>
      {icon}
      <span className="capitalize">{sentiment}</span>
      <span className="text-xs">({confidence}%)</span>
    </Badge>
  );
};

const getTrendIcon = (trend: string) => {
  return trend === "up" ? (
    <TrendingUp className="w-4 h-4 text-success" />
  ) : trend === "down" ? (
    <TrendingDown className="w-4 h-4 text-destructive" />
  ) : (
    <Minus className="w-4 h-4 text-muted-foreground" />
  );
};

// --- Main Component ---
const News = () => {
  // --- Constants ---
  const ARTICLES_PER_PAGE = 5;

  // --- State Management ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const [articles, setArticles] = useState<Article[]>(
    newsData.articles.map((item: RawArticle) => ({
      title: item.headline,
      summary: item.synopsis,
      link: item.link,
      source: item.source,
      timestamp: item.published_at,
      sentiment: item.sentiment,
    }))
  );

  // --- Derived State & Handlers ---
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) 
                         || article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || article.source?.toLowerCase().includes(selectedSource);
    return matchesSearch && matchesSource;
  });

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ARTICLES_PER_PAGE);
  };

  const marketSentiment = useMemo(() => {
    if (!articles.length) return { positive: 0, neutral: 0, negative: 0 };
    let positive = 0, negative = 0, neutral = 0;
    articles.forEach(article => {
        const label = article.sentiment?.label.toLowerCase();
        if (label === 'positive') positive++;
        else if (label === 'negative') negative++;
        else neutral++;
    });
    const total = articles.length;
    return {
        positive: Math.round((positive / total) * 100),
        neutral: Math.round((neutral / total) * 100),
        negative: Math.round((negative / total) * 100),
    };
  }, [articles]);

  const trendingTopics = [
    { name: "AI & Technology", count: 156, trend: "up" },
    { name: "Federal Reserve", count: 89, trend: "neutral" },
    { name: "Energy Sector", count: 67, trend: "down" },
    { name: "Cryptocurrency", count: 134, trend: "up" },
    { name: "Healthcare", count: 78, trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Financial News</h1>
              <p className="text-muted-foreground">Real-time news with sentiment analysis</p>
            </div>
          </div>
          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search news..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            </div>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger><SelectValue placeholder="Topic" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="reuters">Reuters</SelectItem>
                <SelectItem value="bloomberg">Bloomberg</SelectItem>
                <SelectItem value="wsj">Wall Street Journal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-3 space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center p-10 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">No news articles found that match your criteria.</p>
              </div>
            ) : (
              filteredArticles.slice(0, visibleCount).map((article, idx) => (
                <Card key={idx} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{article.source || "Unknown Source"}</span>
                        {article.timestamp && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(article.timestamp).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      {getSentimentBadge(
                        article.sentiment?.label || "neutral",
                        Math.round((article.sentiment?.score || 0) * 100)
                      )}
                    </div>
                    {article.link && (
                      <Button asChild variant="ghost" size="sm" className="-ml-4">
                        <a href={article.link} target="_blank" rel="noreferrer" className="flex items-center space-x-1">
                          <span>Read more</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
            
            {visibleCount < filteredArticles.length && (
              <div className="text-center">
                <Button variant="outline" size="lg" onClick={handleLoadMore}>
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
                <CardDescription>Most discussed topics today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">{getTrendIcon(topic.trend)}<span className="font-medium text-sm">{topic.name}</span></div>
                    <Badge variant="secondary" className="text-xs">{topic.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Market Sentiment</CardTitle>
                <CardDescription>Overall sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-success rounded-full"></div><span className="text-sm">Positive</span></div>
                    <span className="font-medium">{marketSentiment.positive}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-muted-foreground rounded-full"></div><span className="text-sm">Neutral</span></div>
                    <span className="font-medium">{marketSentiment.neutral}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-destructive rounded-full"></div><span className="text-sm">Negative</span></div>
                    <span className="font-medium">{marketSentiment.negative}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Social Mentions</CardTitle>
                <CardDescription>Top mentioned companies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Apple", "Tesla", "Microsoft", "Amazon", "Google"].map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{company}</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;