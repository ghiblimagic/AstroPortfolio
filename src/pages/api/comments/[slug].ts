import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export const get: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("slug", slug)
    .order("created_at", { ascending: true });

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data), { status: 200 });
};
