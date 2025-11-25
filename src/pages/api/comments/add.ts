import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export interface CommentInsert {
  slug: string; // required
  content: string; // required
  user_id?: string | null; // optional for anonymous
  author?: string | null; // optional
}

export async function addComment(comment: CommentInsert) {
  const supabaseComment: Database["public"]["Tables"]["comments"]["Insert"] = {
    slug: comment.slug,
    content: comment.content,
    author: comment.author ?? "Anonymous",
    user_id: comment.user_id ?? null,
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(supabaseComment)
    .select();

  if (error) throw error;
  return data;
}
