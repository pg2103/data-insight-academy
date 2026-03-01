import { GraduationCap } from "lucide-react";

const LearnHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Learn Financial Analysis
          </h1>
          <p className="text-muted-foreground">
            Master chart reading and market analysis with interactive courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnHeader;
