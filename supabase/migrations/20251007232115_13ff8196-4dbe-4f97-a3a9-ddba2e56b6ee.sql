-- Modifier les politiques RLS pour permettre la lecture publique
-- mais garder l'écriture réservée aux utilisateurs authentifiés

-- Supprimer les anciennes politiques de lecture
DROP POLICY IF EXISTS "Users can view their own skills" ON public.skills;
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;

-- Créer de nouvelles politiques de lecture publique
CREATE POLICY "Anyone can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);