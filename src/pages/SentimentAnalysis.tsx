// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Brain, TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";

// const SentimentAnalysis = () => {
//   const [inputText, setInputText] = useState("");
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [sourceType, setSourceType] = useState("manual");

//   const mockAnalysis = {
//     overall: "positive",
//     confidence: 78,
//     breakdown: {
//       positive: 45,
//       neutral: 33,
//       negative: 22
//     },
//     keywords: ["growth", "innovation", "strong", "profitable", "decline", "risk"],
//     trend: [
//       { date: "2024-01-15", sentiment: 0.2 },
//       { date: "2024-01-16", sentiment: 0.4 },
//       { date: "2024-01-17", sentiment: 0.6 },
//       { date: "2024-01-18", sentiment: 0.3 },
//       { date: "2024-01-19", sentiment: 0.7 }
//     ]
//   };

//   const handleAnalyze = async () => {
//     if (!inputText.trim()) return;
    
//     setIsAnalyzing(true);
//     // Simulate API call
//     setTimeout(() => {
//       setAnalysisResult(mockAnalysis);
//       setIsAnalyzing(false);
//     }, 2000);
//   };

//   const getSentimentColor = (sentiment) => {
//     switch (sentiment) {
//       case "positive": return "text-success";
//       case "negative": return "text-destructive";
//       default: return "text-muted-foreground";
//     }
//   };

//   const getSentimentIcon = (sentiment) => {
//     switch (sentiment) {
//       case "positive": return <TrendingUp className="w-5 h-5" />;
//       case "negative": return <TrendingDown className="w-5 h-5" />;
//       default: return <Minus className="w-5 h-5" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
//               <Brain className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Sentiment Analysis</h1>
//               <p className="text-muted-foreground">Analyze market sentiment from text, news, or social media</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Section */}
//           <div className="space-y-6">
//             <Card className="shadow-card">
//               <CardHeader>
//                 <CardTitle>Input Configuration</CardTitle>
//                 <CardDescription>Choose your data source and enter content for analysis</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground mb-2 block">Data Source</label>
//                   <Select value={sourceType} onValueChange={setSourceType}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="manual">Manual Text Input</SelectItem>
//                       <SelectItem value="twitter">Twitter Feed</SelectItem>
//                       <SelectItem value="news">News Articles</SelectItem>
//                       <SelectItem value="reddit">Reddit Posts</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground mb-2 block">Text Content</label>
//                   <Textarea
//                     placeholder="Enter the text you want to analyze for sentiment... (e.g., news articles, social media posts, financial reports)"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     className="min-h-32 resize-none"
//                   />
//                 </div>

//                 <Button 
//                   onClick={handleAnalyze}
//                   disabled={!inputText.trim() || isAnalyzing}
//                   className="w-full"
//                   variant="hero"
//                   size="lg"
//                 >
//                   {isAnalyzing ? (
//                     <>
//                       <Zap className="w-5 h-5 animate-pulse" />
//                       Analyzing...
//                     </>
//                   ) : (
//                     <>
//                       <Brain className="w-5 h-5" />
//                       Analyze Sentiment
//                     </>
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Sample Inputs */}
//             <Card className="shadow-card">
//               <CardHeader>
//                 <CardTitle className="text-lg">Sample Inputs</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="space-y-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full justify-start text-left h-auto p-3"
//                     onClick={() => setInputText("The company reported strong quarterly earnings with 15% revenue growth and expanding market share in key segments.")}
//                   >
//                     <div>
//                       <div className="font-medium">Positive Financial News</div>
//                       <div className="text-xs text-muted-foreground">Earnings report example</div>
//                     </div>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full justify-start text-left h-auto p-3"
//                     onClick={() => setInputText("Market volatility continues to impact investor confidence as regulatory concerns and supply chain disruptions weigh on future prospects.")}
//                   >
//                     <div>
//                       <div className="font-medium">Market Concern</div>
//                       <div className="text-xs text-muted-foreground">Volatility analysis</div>
//                     </div>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Results Section */}
//           <div className="space-y-6">
//             {analysisResult ? (
//               <>
//                 {/* Overall Sentiment */}
//                 <Card className="shadow-card">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <span>Overall Sentiment</span>
//                       <div className={getSentimentColor(analysisResult.overall)}>
//                         {getSentimentIcon(analysisResult.overall)}
//                       </div>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <Badge 
//                           variant={analysisResult.overall === 'positive' ? 'default' : analysisResult.overall === 'negative' ? 'destructive' : 'secondary'}
//                           className="text-sm px-3 py-1"
//                         >
//                           {analysisResult.overall.toUpperCase()}
//                         </Badge>
//                         <span className="text-2xl font-bold text-foreground">{analysisResult.confidence}%</span>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-sm mb-2">
//                           <span>Confidence Score</span>
//                           <span>{analysisResult.confidence}%</span>
//                         </div>
//                         <Progress value={analysisResult.confidence} className="h-2" />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Sentiment Breakdown */}
//                 <Card className="shadow-card">
//                   <CardHeader>
//                     <CardTitle>Sentiment Breakdown</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-3 h-3 bg-success rounded-full"></div>
//                             <span className="text-sm">Positive</span>
//                           </div>
//                           <span className="font-medium">{analysisResult.breakdown.positive}%</span>
//                         </div>
//                         <Progress value={analysisResult.breakdown.positive} className="h-2" />
//                       </div>

//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
//                             <span className="text-sm">Neutral</span>
//                           </div>
//                           <span className="font-medium">{analysisResult.breakdown.neutral}%</span>
//                         </div>
//                         <Progress value={analysisResult.breakdown.neutral} className="h-2" />
//                       </div>

//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-3 h-3 bg-destructive rounded-full"></div>
//                             <span className="text-sm">Negative</span>
//                           </div>
//                           <span className="font-medium">{analysisResult.breakdown.negative}%</span>
//                         </div>
//                         <Progress value={analysisResult.breakdown.negative} className="h-2" />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Keywords */}
//                 <Card className="shadow-card">
//                   <CardHeader>
//                     <CardTitle>Key Terms</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-wrap gap-2">
//                       {analysisResult.keywords.map((keyword, index) => (
//                         <Badge key={index} variant="outline" className="text-xs">
//                           {keyword}
//                         </Badge>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </>
//             ) : (
//               <Card className="shadow-card">
//                 <CardContent className="pt-8">
//                   <div className="text-center text-muted-foreground">
//                     <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                     <p>Enter text above and click "Analyze Sentiment" to see results</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SentimentAnalysis;