import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { Module } from "@/data/modulesData";
import { Progress } from "@/components/ui/progress";

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

const ModuleCard = ({
  module,
  onStartCourse,
}: {
  module: Module;
  onStartCourse: (module: Module) => void;
}) => {
  const Icon = module.icon;

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300 group">
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
          <Badge
            variant="outline"
            className={getDifficultyColor(module.difficulty)}
          >
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
            onClick={() => onStartCourse(module)}
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
};

export default ModuleCard;
