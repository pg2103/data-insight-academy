import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  PlayCircle,
  BookOpen,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  Download
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  // Example modules with sections and PDF URLs placed in public/assets/pdfs/
  const modules = [
    {
      id: 1,
      title: "Introduction to Financial Markets",
      description:
        "Learn the basics of how financial markets work, key terminology, and market participants.",
      duration: "2 hours",
      difficulty: "Beginner",
      lessons: 8,
      progress: 100,
      icon: BarChart3,
      topics: ["Market Basics", "Trading Fundamentals", "Economic Indicators"],
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
      duration: "4 hours",
      difficulty: "Intermediate",
      lessons: 12,
      progress: 65,
      icon: TrendingUp,
      topics: ["Chart Patterns", "Support & Resistance", "Moving Averages"],
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
  ];

  const featuredCourse = {
    title: "Complete Financial Analysis Masterclass",
    description:
      "A comprehensive 20-hour course covering everything from basic concepts to advanced analysis techniques.",
    instructor: "Dr. Sarah Chen",
    rating: 4.8,
    students: 12500,
    price: "Free",
    image: "/api/placeholder/400/225",
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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
              <p className="text-muted-foreground">
                Master chart reading and market analysis with interactive courses
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Learn;
