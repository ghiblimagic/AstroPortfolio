import { useState, useEffect } from "react";
import type { Comment } from "src/types/comments"; // your supabase-generated type
import { getComments } from "@/pages/api/comments/get";
import CommentItem from "./CommentItem";

console.log("getComments function:", getComments); // ADD THIS LINE
console.log("typeof getComments:", typeof getComments); // ADD THIS LINE

interface CommentListProps {
  slug: string;
  currentUserId: string | null;
}

const CommentList: React.FC<CommentListProps> = ({ slug, currentUserId }) => {
  console.log(
    "CommentList RENDERED - slug:",
    slug,
    "currentUserId:",
    currentUserId,
  ); // ADD THIS
  console.log("slug in comment list", slug);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("After useState, before useEffect");

  useEffect(() => {
    console.log("INSIDE useEffect");
    console.log("1. useEffect triggered, slug:", slug);

    async function fetchComments() {
      console.log("2. fetchComments function called");
      try {
        console.log("3. About to call getComments with slug:", slug);
        const data = await getComments(slug);
        console.log("4. Received comments:", data);
        setComments(data);
      } catch (err) {
        console.error("5. Failed to fetch comments:", err);
      } finally {
        console.log("6. Setting loading to false");
        setLoading(false);
      }
    }

    console.log("7. About to call fetchComments");
    fetchComments();
    console.log("8. fetchComments called (async)");
  }, [slug]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="flex flex-col gap-4 mt-11">
      {comments.length === 0 && <p>No comments yet. Be the first!</p>}
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default CommentList;
