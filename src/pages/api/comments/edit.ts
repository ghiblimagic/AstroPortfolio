import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export interface CommentUpdate {
  id: string;
  content: string;
  user_id: string; // must match logged-in user
}

export async function editComment({ id, content, user_id }: CommentUpdate) {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) throw error;
  return data;
}
