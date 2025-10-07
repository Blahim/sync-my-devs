import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; level: string }) => void;
  initialData?: { name: string; level: string } | null;
}

export const SkillForm = ({ open, onOpenChange, onSubmit, initialData }: SkillFormProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLevel(initialData.level);
    } else {
      setName("");
      setLevel("");
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, level });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {initialData ? "Modifier la compétence" : "Ajouter une compétence"}
          </DialogTitle>
          <DialogDescription>
            {initialData ? "Modifiez les informations de la compétence" : "Ajoutez une nouvelle compétence à votre portfolio"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: React, TypeScript..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Niveau</Label>
              <Input
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Ex: Expert, Intermédiaire..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" style={{ background: "var(--gradient-primary)" }}>
              {initialData ? "Modifier" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
