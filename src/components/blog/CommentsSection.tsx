import { useState, useEffect } from "react";
import type { BlogComment } from "src/types/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentLIst";

interface CommentsSectionProps {
  slug: string;
  currentUserId: string | null;
}

export default function CommentsSection({
  slug,
  currentUserId,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch comments on mount
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments/${slug}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  // Callback to add new comment to the list
  const handleCommentAdded = (newComment: BlogComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="mt-12 py-8 border-t gradient-line mx-4 px-4 bg-[#3C5DCA] w-full rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Comments
      </h2>

      <CommentForm
        slug={slug}
        onCommentAdded={handleCommentAdded}
      />

      <CommentList
        comments={comments}
        loading={loading}
        currentUserId={currentUserId}
      />
    </div>
  );
}
