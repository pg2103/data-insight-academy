import LearnHeader from "@/components/learn/LearnHeader";
import PlatformIntroCard from "@/components/learn/PlatformIntroCard";
import ModuleCard from "@/components/learn/ModuleCard";
import { modules } from "@/data/modulesData";

const Learn = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">

        <LearnHeader />

        <PlatformIntroCard />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Learn;