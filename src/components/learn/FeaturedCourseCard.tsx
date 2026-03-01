import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturedCourse {
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  price: string;
  image: string;
}

const FeaturedCourseCard = ({ course }: { course: FeaturedCourse }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Featured Course
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {course.title}
            </h2>
            <p className="text-muted-foreground mb-6">{course.description}</p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {course.students.toLocaleString()} students
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-success">
                  {course.price}
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex items-center space-x-2"
                onClick={() => navigate("/learn/featured-course")}
              >
                <PlayCircle className="w-5 h-5" />
                <span>Continue Learning</span>
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
  );
};

export default FeaturedCourseCard;
