import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Newspaper, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  ExternalLink,
  Minus
} from "lucide-react";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Tech Stocks Rally as AI Sector Shows Strong Growth",
      summary: "Major technology companies see significant gains following positive AI earnings reports and increased investment in artificial intelligence infrastructure.",
      source: "Financial Times",
      timestamp: "2 hours ago",
      sentiment: "positive",
      confidence: 85,
      topics: ["Technology", "AI", "Stocks"],
      url: "#"
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Interest Rate Changes",
      summary: "The Federal Reserve indicates possible adjustments to interest rates in response to current economic conditions and inflation trends.",
      source: "Reuters",
      timestamp: "4 hours ago",
      sentiment: "neutral",
      confidence: 72,
      topics: ["Federal Reserve", "Interest Rates", "Economy"],
      url: "#"
    },
    {
      id: 3,
      title: "Energy Sector Faces Headwinds Amid Regulatory Concerns",
      summary: "Oil and gas companies experience volatility as new environmental regulations and supply chain disruptions impact market outlook.",
      source: "Bloomberg",
      timestamp: "6 hours ago",
      sentiment: "negative",
      confidence: 78,
      topics: ["Energy", "Regulation", "Environment"],
      url: "#"
    },
    {
      id: 4,
      title: "Cryptocurrency Markets Show Mixed Signals",
      summary: "Bitcoin and other digital assets display varying performance as institutional adoption continues alongside regulatory uncertainty.",
      source: "CoinDesk",
      timestamp: "8 hours ago",
      sentiment: "neutral",
      confidence: 65,
      topics: ["Cryptocurrency", "Bitcoin", "Regulation"],
      url: "#"
    },
    {
      id: 5,
      title: "Pharmaceutical Breakthrough Boosts Healthcare Stocks",
      summary: "Major pharmaceutical company announces promising clinical trial results, leading to sector-wide optimism and increased investment.",
      source: "Wall Street Journal",
      timestamp: "10 hours ago",
      sentiment: "positive",
      confidence: 88,
      topics: ["Healthcare", "Pharmaceuticals", "Clinical Trials"],
      url: "#"
    }
  ];

  const trendingTopics = [
    { name: "AI & Technology", count: 156, trend: "up" },
    { name: "Federal Reserve", count: 89, trend: "neutral" },
    { name: "Energy Sector", count: 67, trend: "down" },
    { name: "Cryptocurrency", count: 134, trend: "up" },
    { name: "Healthcare", count: 78, trend: "up" }
  ];

  const getSentimentBadge = (sentiment, confidence) => {
    const color = sentiment === 'positive' ? 'bg-success/10 text-success border-success/20' :
                 sentiment === 'negative' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                 'bg-muted text-muted-foreground border-border';
    
    const icon = sentiment === 'positive' ? <TrendingUp className="w-3 h-3" /> :
                sentiment === 'negative' ? <TrendingDown className="w-3 h-3" /> :
                <Minus className="w-3 h-3" />;

    return (
      <Badge variant="outline" className={`${color} flex items-center space-x-1`}>
        {icon}
        <span className="capitalize">{sentiment}</span>
        <span className="text-xs">({confidence}%)</span>
      </Badge>
    );
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4 text-success" /> :
           trend === 'down' ? <TrendingDown className="w-4 h-4 text-destructive" /> :
           <Minus className="w-4 h-4 text-muted-foreground" />;
  };

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
              <Input 
                placeholder="Search news..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="reuters">Reuters</SelectItem>
                <SelectItem value="bloomberg">Bloomberg</SelectItem>
                <SelectItem value="wsj">Wall Street Journal</SelectItem>
                <SelectItem value="ft">Financial Times</SelectItem>
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
            {newsArticles.map((article) => (
              <Card key={article.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {article.summary}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {getSentimentBadge(article.sentiment, article.confidence)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{article.source}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <span>Read more</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
                <CardDescription>Most discussed topics today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(topic.trend)}
                      <span className="font-medium text-sm">{topic.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sentiment Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Market Sentiment</CardTitle>
                <CardDescription>Overall sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm">Positive</span>
                    </div>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm">Neutral</span>
                    </div>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm">Negative</span>
                    </div>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Mentions */}
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