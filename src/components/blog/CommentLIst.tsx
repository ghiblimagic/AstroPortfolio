import { useState, useEffect } from "react";
import type { Comment } from "src/types/comments"; // your supabase-generated type
import { getComments } from "src/pages/api/comments/get";
import CommentItem from "./CommentItem";

interface CommentListProps {
  slug: string;
  currentUserId: string | null;
}

const CommentList: React.FC<CommentListProps> = ({ slug, currentUserId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments(slug);
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
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
