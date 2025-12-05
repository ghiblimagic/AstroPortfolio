import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

export const prerender = false;

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export async function getComments(slug: string) {
  console.log("slug in get function", slug);
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("slug", slug)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

console.log("get.ts module loaded");
