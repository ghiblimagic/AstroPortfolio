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
      className="flex flex-col gap-2 p-4 rounded-2xl bg-white  shadow-xl shadow-violet-950"
    >
      <label htmlFor="name-comment-submission">Your name (optional)</label>
      <input
        type="text"
        id="name-comment-submission"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 rounded-2xl bg-violet-100"
      />
      <label htmlFor="comment-submission">Username: </label>

      <textarea
        value={content}
        id="comment-submission"
        onChange={(e) => setContent(e.target.value)}
        className="p-2 rounded-2xl bg-violet-100"
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`block px-4 py-2 m-1 rounded-2xl text-white no-underline w-fit bg-mainColor mx-auto hover:bg-blue-600 hover:text-white text-lg ${isSubmitting && "bg-slate-700"}`}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
