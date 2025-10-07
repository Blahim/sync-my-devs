import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1" style={{ background: "var(--gradient-card)" }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{project.title}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{project.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
