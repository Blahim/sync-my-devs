import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@/components/Auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LogOut, Briefcase, Award } from "lucide-react";
import { toast } from "sonner";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillForm } from "@/components/SkillForm";
import { ProjectForm } from "@/components/ProjectForm";

interface Skill {
  id: string;
  name: string;
  level: string;
  user_id: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  user_id: string;
}

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSkills();
      fetchProjects();
    }
  }, [user]);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des compétences");
    } else {
      setSkills(data || []);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des projets");
    } else {
      setProjects(data || []);
    }
  };

  const handleSkillSubmit = async (data: { name: string; level: string }) => {
    if (!user) return;

    if (editingSkill) {
      const { error } = await supabase
        .from("skills")
        .update(data)
        .eq("id", editingSkill.id);

      if (error) {
        toast.error("Erreur lors de la modification");
      } else {
        toast.success("Compétence modifiée avec succès");
        fetchSkills();
        setEditingSkill(null);
      }
    } else {
      const { error } = await supabase
        .from("skills")
        .insert([{ ...data, user_id: user.id }]);

      if (error) {
        toast.error("Erreur lors de l'ajout");
      } else {
        toast.success("Compétence ajoutée avec succès");
        fetchSkills();
      }
    }
  };

  const handleProjectSubmit = async (data: { title: string; description: string }) => {
    if (!user) return;

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(data)
        .eq("id", editingProject.id);

      if (error) {
        toast.error("Erreur lors de la modification");
      } else {
        toast.success("Projet modifié avec succès");
        fetchProjects();
        setEditingProject(null);
      }
    } else {
      const { error } = await supabase
        .from("projects")
        .insert([{ ...data, user_id: user.id }]);

      if (error) {
        toast.error("Erreur lors de l'ajout");
      } else {
        toast.success("Projet ajouté avec succès");
        fetchProjects();
      }
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Compétence supprimée");
      fetchSkills();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Projet supprimé");
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TechBlahime
          </h1>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="skills" className="gap-2">
              <Award className="h-4 w-4" />
              Compétences
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Projets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Compétences</h2>
              <Button
                onClick={() => {
                  setEditingSkill(null);
                  setSkillFormOpen(true);
                }}
                className="gap-2"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onEdit={() => {
                    setEditingSkill(skill);
                    setSkillFormOpen(true);
                  }}
                  onDelete={() => handleDeleteSkill(skill.id)}
                />
              ))}
            </div>
            {skills.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Aucune compétence ajoutée. Commencez par en ajouter une !
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Projets</h2>
              <Button
                onClick={() => {
                  setEditingProject(null);
                  setProjectFormOpen(true);
                }}
                className="gap-2"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => {
                    setEditingProject(project);
                    setProjectFormOpen(true);
                  }}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
            {projects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Aucun projet ajouté. Commencez par en ajouter un !
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <SkillForm
        open={skillFormOpen}
        onOpenChange={setSkillFormOpen}
        onSubmit={handleSkillSubmit}
        initialData={editingSkill}
      />

      <ProjectForm
        open={projectFormOpen}
        onOpenChange={setProjectFormOpen}
        onSubmit={handleProjectSubmit}
        initialData={editingProject}
      />
    </div>
  );
};

export default Index;
