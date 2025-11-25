import { useState } from "react";
import type { CommentInsert } from "src/pages/api/comments/add";
import { addComment } from "src/pages/api/comments/add";

interface CommentFormProps {
  slug: string;
}

export default function CommentForm({ slug }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addComment({
        slug,
        content,
        author: author || "Anonymous", // fallback
      });
      setContent("");
      setAuthor("");
      alert("Comment added!");
    } catch (err: any) {
      setError(err.message || "Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg"
    >
      <input
        type="text"
        placeholder="Your name (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 rounded"
      />
      <textarea
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white rounded p-2"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
