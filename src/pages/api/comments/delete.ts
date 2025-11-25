import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export async function deleteComment(id: string, user_id: string) {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) throw error;
  return data;
}
