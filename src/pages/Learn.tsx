import { useState } from "react";
<<<<<<< HEAD
import { Document, Page, pdfjs } from "react-pdf";
=======
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
<<<<<<< HEAD
import {
  GraduationCap,
  PlayCircle,
  BookOpen,
  TrendingUp,
  BarChart3,
  PieChart,
=======
import { 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
  Activity,
  Clock,
  Users,
  Star,
  CheckCircle,
<<<<<<< HEAD
  Lock,
  Download
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  // Example modules with sections and PDF URLs placed in public/assets/pdfs/
=======
  Lock
} from "lucide-react";

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(null);

>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
  const modules = [
    {
      id: 1,
      title: "Introduction to Financial Markets",
<<<<<<< HEAD
      description:
        "Learn the basics of how financial markets work, key terminology, and market participants.",
=======
      description: "Learn the basics of how financial markets work, key terminology, and market participants.",
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
      duration: "2 hours",
      difficulty: "Beginner",
      lessons: 8,
      progress: 100,
      icon: BarChart3,
      topics: ["Market Basics", "Trading Fundamentals", "Economic Indicators"],
<<<<<<< HEAD
      completed: true,
      sections: [
        {
          id: 1,
          title: "Market Basics PDF",
          pdfUrl: "/assets/pdfs/Indicators.pdf",
        },
        {
          id: 2,
          title: "Economic Indicators PDF",
          pdfUrl: "/assets/pdfs/analysis part 1.pdf",
        },
      ],
    },
    {
      id: 2,
      title: "Technical Analysis Fundamentals",
      description:
        "Master chart reading, trend analysis, and technical indicators used by professional traders.",
=======
      completed: true
    },
    {
      id: 2,
      title: "Technical Analysis Fundamentals", 
      description: "Master chart reading, trend analysis, and technical indicators used by professional traders.",
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
      duration: "4 hours",
      difficulty: "Intermediate",
      lessons: 12,
      progress: 65,
      icon: TrendingUp,
      topics: ["Chart Patterns", "Support & Resistance", "Moving Averages"],
<<<<<<< HEAD
      completed: false,
      sections: [
        {
          id: 1,
          title: "Chart Patterns PDF",
          pdfUrl: "/assets/pdfs/Indicators.pdf",
        },
      ],
    },
    // other modules...
=======
      completed: false
    },
    {
      id: 3,
      title: "Understanding Market Sentiment",
      description: "Learn how to interpret market sentiment data and use it in your analysis and decision making.",
      duration: "3 hours", 
      difficulty: "Intermediate",
      lessons: 10,
      progress: 20,
      icon: PieChart,
      topics: ["Sentiment Indicators", "Market Psychology", "Social Media Analysis"],
      completed: false
    },
    {
      id: 4,
      title: "Advanced Chart Patterns",
      description: "Deep dive into complex chart patterns and their practical applications in trading strategies.",
      duration: "5 hours",
      difficulty: "Advanced",
      lessons: 15,
      progress: 0,
      icon: Activity,
      topics: ["Head & Shoulders", "Triangles", "Flag Patterns"],
      completed: false
    }
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
  ];

  const featuredCourse = {
    title: "Complete Financial Analysis Masterclass",
<<<<<<< HEAD
    description:
      "A comprehensive 20-hour course covering everything from basic concepts to advanced analysis techniques.",
=======
    description: "A comprehensive 20-hour course covering everything from basic concepts to advanced analysis techniques.",
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
    instructor: "Dr. Sarah Chen",
    rating: 4.8,
    students: 12500,
    price: "Free",
<<<<<<< HEAD
    image: "/api/placeholder/400/225",
=======
    image: "/api/placeholder/400/225"
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
<<<<<<< HEAD
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const handleStartCourse = (module) => {
    setSelectedModule(module);
    setSelectedSection(null); // reset section on course start
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedSection(null);
  };
=======
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-warning/10 text-warning border-warning/20";
      case "Advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const lessons = [
    { id: 1, title: "Market Structure and Participants", duration: "12 min", completed: true },
    { id: 2, title: "Reading Financial Charts", duration: "18 min", completed: true },
    { id: 3, title: "Volume Analysis", duration: "15 min", completed: true },
    { id: 4, title: "Trend Identification", duration: "20 min", completed: false },
    { id: 5, title: "Support and Resistance Levels", duration: "25 min", completed: false },
    { id: 6, title: "Moving Averages", duration: "22 min", completed: false }
  ];
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Learn Financial Analysis</h1>
<<<<<<< HEAD
              <p className="text-muted-foreground">
                Master chart reading and market analysis with interactive courses
              </p>
=======
              <p className="text-muted-foreground">Master chart reading and market analysis with interactive courses</p>
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Show modules list or selected course with sections */}
        {!selectedModule ? (
          <>
            <Tabs defaultValue="courses" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:w-400">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="lessons">Current Lesson</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-8">
                {/* Featured Course */}
                <Card className="shadow-card bg-gradient-card">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                          Featured Course
                        </Badge>
                        <h2 className="text-2xl font-bold text-foreground mb-4">{featuredCourse.title}</h2>
                        <p className="text-muted-foreground mb-6">{featuredCourse.description}</p>

                        <div className="flex items-center space-x-6 mb-6">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-warning fill-current" />
                            <span className="font-medium">{featuredCourse.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{featuredCourse.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-success">{featuredCourse.price}</span>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button size="lg" className="flex items-center space-x-2" onClick={() => alert('Start featured course logic')}>
                            <PlayCircle className="w-5 h-5" />
                            <span>Start Learning</span>
                          </Button>
                          <Button variant="outline" size="lg">
                            Learn More
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>Course Preview</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Modules */}
                <div className="grid md:grid-cols-2 gap-6">
                  {modules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <Card
                        key={module.id}
                        className="shadow-card hover:shadow-elegant transition-all duration-300 group"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                  {module.title}
                                </CardTitle>
                                <CardDescription className="mt-1">{module.description}</CardDescription>
                              </div>
                            </div>
                            {module.completed && <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {module.topics.map((topic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{module.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{module.lessons} lessons</span>
                              </div>
                            </div>
                            <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                              {module.difficulty}
                            </Badge>
                          </div>

                          {module.progress > 0 && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{module.progress}%</span>
                              </div>
                              <Progress value={module.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex space-x-3">
                            <Button
                              className="flex-1"
                              variant={module.progress > 0 ? "default" : "outline"}
                              onClick={() => handleStartCourse(module)}
                            >
                              {module.progress > 0 ? "Continue" : "Start Course"}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <BookOpen className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Lessons and Progress tabs can remain unchanged */}
            </Tabs>
          </>
        ) : (
          // Show sections list and PDF viewer for selected module
          <div>
            <Button variant="outline" className="mb-4" onClick={handleBackToModules}>
              ← Back to Courses
            </Button>

            <h2 className="text-2xl font-bold mb-4">{selectedModule.title} - Sections</h2>
            {/* Sections List */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {selectedModule.sections.map((section) => (
                <Card
                  key={section.id}
                  className={`cursor-pointer ${
                    selectedSection?.id === section.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedSection(section)}
                >
                  <CardContent className="flex justify-between items-center">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* PDF viewer and download */}
            {selectedSection && (
              <div className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{selectedSection.title}</h3>

                <div className="mb-4">
                  <Document file={selectedSection.pdfUrl} loading="Loading PDF...">
                    <Page pageNumber={1} width={600} />
                  </Document>
                </div>

                <a
                  href={selectedSection.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </a>
              </div>
            )}
          </div>
        )}
=======
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-400">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="lessons">Current Lesson</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-8">
            {/* Featured Course */}
            <Card className="shadow-card bg-gradient-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Featured Course</Badge>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{featuredCourse.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredCourse.description}</p>
                    
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="font-medium">{featuredCourse.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{featuredCourse.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-success">{featuredCourse.price}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button size="lg" className="flex items-center space-x-2">
                        <PlayCircle className="w-5 h-5" />
                        <span>Start Learning</span>
                      </Button>
                      <Button variant="outline" size="lg">Learn More</Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Course Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card key={module.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {module.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {module.description}
                            </CardDescription>
                          </div>
                        </div>
                        {module.completed && (
                          <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{module.lessons} lessons</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                      </div>

                      {module.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1" 
                          variant={module.progress > 0 ? "default" : "outline"}
                        >
                          {module.progress > 0 ? "Continue" : "Start Course"}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Technical Analysis Fundamentals</CardTitle>
                <CardDescription>Module 2 - Lesson 4: Trend Identification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Video: Understanding Market Trends</p>
                    <p className="text-sm">Duration: 20 minutes</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Lesson Overview</h3>
                      <p className="text-muted-foreground">
                        In this lesson, you'll learn how to identify different types of market trends and understand 
                        their significance in technical analysis. We'll cover uptrends, downtrends, and sideways trends.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Topics</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Trend line drawing</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Higher highs and higher lows</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          <span>Trend reversal signals</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          <span>Practical examples</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <Button size="lg" className="flex items-center space-x-2">
                        <PlayCircle className="w-5 h-5" />
                        <span>Start Lesson</span>
                      </Button>
                      <Button variant="outline" size="lg">Download Notes</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lesson Progress</h3>
                    <div className="space-y-3">
                      {lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            lesson.completed ? 'bg-success/5 border-success/20' : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-success" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                          </div>
                          {!lesson.completed && lesson.id > 3 && (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">46%</div>
                    <Progress value={46} className="h-3 mb-4" />
                    <p className="text-sm text-muted-foreground">2 of 4 modules completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-2">7</div>
                    <p className="text-sm text-muted-foreground">Days in a row</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Certificates Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning mb-2">1</div>
                    <p className="text-sm text-muted-foreground">Ready for 2 more</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm text-muted-foreground">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Learn;
=======
export default Learn;
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
