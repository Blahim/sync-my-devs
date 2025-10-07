import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Route: GET /portfolio-api/skills
    if (path === 'skills' || url.searchParams.get('type') === 'skills') {
      const { data: skills, error } = await supabase
        .from('skills')
        .select('id, name, level, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify(skills), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Route: GET /portfolio-api/projects
    if (path === 'projects' || url.searchParams.get('type') === 'projects') {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id, title, description, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify(projects), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Route: GET /portfolio-api (retourne tout)
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('id, name, level, created_at')
      .order('created_at', { ascending: false });

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, created_at')
      .order('created_at', { ascending: false });

    if (skillsError) throw skillsError;
    if (projectsError) throw projectsError;

    return new Response(
      JSON.stringify({
        skills: skills || [],
        projects: projects || [],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in portfolio-api:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
