import { useState, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
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
  const [message, setMessage] = useState<null | string>(null);

  // Fetch comments on mount
  useEffect(() => {
    async function fetchComments() {
      try {
        console.log("fetch comments ran");
        const response = await fetch(`/api/comments/${slug}`);
        const data = await response.json();
        if (data.error) {
          setMessage(
            "There was an error when loading comments, please refresh or try again later",
          );
          setLoading(false);
          return;
        }
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
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_V3_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "body",
      }}
    >
      <div className="portfolio-card portfolio-card--padded mt-12 mx-4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Comments</h2>

        <CommentForm
          slug={slug}
          onCommentAdded={handleCommentAdded}
        />

        {message && (
          <p className="bg-white my-6 rounded-lg pl-4 py-2 border border-yellow-400">
            {" "}
            {message}{" "}
          </p>
        )}

        <CommentList
          comments={comments}
          loading={loading}
          currentUserId={currentUserId}
        />
      </div>
    </GoogleReCaptchaProvider>
  );
}
