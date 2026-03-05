import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { Module } from "@/data/modulesData";

const getDifficultyColor = (difficulty: string) => {
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

const ModuleCard = ({ module }: { module: Module }) => {
  const Icon = module.icon;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = module.pdfUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start space-x-3">
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

          <Badge
            variant="outline"
            className={getDifficultyColor(module.difficulty)}
          >
            {module.difficulty}
          </Badge>
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;