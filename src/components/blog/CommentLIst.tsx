import type { BlogComment } from "src/types/comments";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: BlogComment[];
  loading: boolean;
  currentUserId: string | null;
}

export default function CommentList({
  comments,
  loading,
  currentUserId,
}: CommentListProps) {
  if (loading) {
    return <p className="text-center mt-8 blog-comments__note">Loading comments...</p>;
  }

  return (
    <div className="flex flex-col gap-4 mt-6 mb-6">
      {comments.length === 0 && (
        <p className="text-center blog-comments__note">No comments yet. Be the first!</p>
      )}
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  );
}
