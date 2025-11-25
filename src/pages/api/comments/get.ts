import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export async function getComments(slug: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("slug", slug)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
