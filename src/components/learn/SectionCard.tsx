import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { Section } from "@/data/modulesData";

const SectionCard = ({
  section,
  selected,
  onClick,
}: {
  section: Section;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Card
      key={section.id}
      className={`cursor-pointer ${selected ? "border-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent>
        <CardTitle className="text-lg">{section.title}</CardTitle>
        {section.description && (
          <CardDescription className="mt-1">
            {section.description}
          </CardDescription>
        )}
        <div className="flex justify-end items-center mt-2">
          <PlayCircle className="w-6 h-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
