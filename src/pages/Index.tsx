import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Newspaper, 
  GraduationCap, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Clock,
  ArrowRight,
  PlayCircle,
  Star
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Sentiment Analysis",
      description: "Advanced AI algorithms analyze market sentiment from news, social media, and financial reports in real-time.",
      color: "bg-gradient-primary",
      link: "/sentiment"
    },
    {
      icon: Newspaper,
      title: "Live News Feed",
      description: "Stay updated with curated financial news with built-in sentiment scoring and trend analysis.",
      color: "bg-gradient-success",
      link: "/news"
    },
    {
      icon: GraduationCap,
      title: "Interactive Learning",
      description: "Master chart analysis and technical indicators with hands-on courses and real market examples.",
      color: "bg-accent",
      link: "/learn"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "News Sources", value: "500+", icon: Newspaper },
    { label: "Analysis Accuracy", value: "94%", icon: TrendingUp },
    { label: "Learning Modules", value: "50+", icon: GraduationCap }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Portfolio Manager",
      content: "The sentiment analysis tool has completely transformed how I assess market conditions. It's incredibly accurate and saves me hours of research.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Day Trader",
      content: "The educational platform helped me understand technical analysis in ways traditional books never could. The interactive charts are fantastic.",
      rating: 5
    },
    {
      name: "Emily Rodriguez", 
      role: "Financial Analyst",
      content: "Having real-time sentiment data alongside news feeds gives me a significant edge in making informed investment decisions.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  AI-Powered Financial Analysis
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Understand Markets with{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Data-Driven Insights
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Explore sentiments, stay updated with intelligent news feeds, and master chart analysis 
                  with our comprehensive financial education platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/sentiment">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                  <Link to="/learn">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Explore Tools
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>100% Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-success" />
                  <span>Real-time data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-success" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card rounded-2xl shadow-elegant border p-8 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Market Sentiment</h3>
                    <Badge className="bg-success/10 text-success">Live</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">68%</div>
                      <div className="text-xs text-muted-foreground">Positive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">22%</div>
                      <div className="text-xs text-muted-foreground">Neutral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">10%</div>
                      <div className="text-xs text-muted-foreground">Negative</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tech Sector</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-success">+12%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Energy Sector</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-success">+8%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Financial Sector</span>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">+2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Better Decisions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze markets, understand sentiment, and make informed financial decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-500 group border-0 bg-gradient-card">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                      <Link to={feature.link}>
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by Financial Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of traders, analysts, and investors who rely on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card bg-card border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-hero rounded-3xl p-12 text-primary-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Market Analysis?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using our AI-powered platform to make better financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/sentiment">
                  <Brain className="w-5 h-5 mr-2" />
                  Start Free Analysis
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/learn">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Explore Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
