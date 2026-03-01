import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import LearnHeader from "@/components/learn/LearnHeader";
import FeaturedCourseCard from "@/components/learn/FeaturedCourseCard";
import ModuleCard from "@/components/learn/ModuleCard";
import SectionCard from "@/components/learn/SectionCard";
import PDFViewer from "@/components/learn/PDFViewer";

import { modules, Module, Section } from "@/data/modulesData";

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const navigate = useNavigate();

  const handleStartCourse = (module: Module) => {
    setSelectedModule(module);
    setSelectedSection(null);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedSection(null);
  };

  const handleSelectSection = (section: Section) => {
    setSelectedSection(section);
  };

  // Example featured course data
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <LearnHeader />

        {!selectedModule ? (
          <>
            <Tabs defaultValue="courses" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:w-400">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="lessons">Current Lesson</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Courses tab */}
              <TabsContent value="courses" className="space-y-8">
                <FeaturedCourseCard
                  course={featuredCourse}
                  onContinue={() => navigate("/learn/featured-course")}
                />

                {/* Modules list */}
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {modules.map((module) => (
                    <ModuleCard key={module.id} module={module} onStartCourse={handleStartCourse} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div>
            {/* Back button */}
            <Button variant="outline" className="mb-4" onClick={handleBackToModules}>
              ← Back to Courses
            </Button>

            {/* Sections list */}
            <h2 className="text-2xl font-bold mb-4">
              {selectedModule.title} - Sections
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {selectedModule.sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  isSelected={selectedSection?.id === section.id}
                  onSelect={() => handleSelectSection(section)}
                />
              ))}
            </div>

            {/* PDF Viewer */}
            {selectedSection && <PDFViewer section={selectedSection} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
