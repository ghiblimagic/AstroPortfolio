// src/components/CommentItem.tsx
import { useState } from "react";
import type { BlogComment } from "src/types/comments";
import { editComment } from "src/pages/api/comments/edit";
import { deleteComment } from "src/pages/api/comments/delete";

interface CommentItemProps {
  comment: BlogComment;
  currentUserId: string | null;
}

export default function CommentItem({
  comment,
  currentUserId,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState<string | null>(null);

  async function handleEdit() {
    if (!currentUserId) return; // don't allow edit if the user is not signed in

    try {
      await editComment({
        id: comment.id,
        content,
        user_id: currentUserId, // guaranteed to be string now
      });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to edit comment.");
    }
  }

  async function handleDelete() {
    if (!currentUserId) return; // only let signed in users delete their comments
    if (!confirm("Delete this comment?")) return;
    try {
      await deleteComment(comment.id, currentUserId);
      window.location.reload(); // refresh to remove deleted comment
    } catch (err: any) {
      setError(err.message || "Failed to delete comment.");
    }
  }

  return (
    <div className="portfolio-card portfolio-card--padded mb-4">
      <div className="flex justify-between items-center">
        <strong>{comment.author || "Anonymous"}</strong>
        <span className="text-gray-900 text-sm">
          {new Date(comment.created_at || "").toLocaleString()}
        </span>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 rounded"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="portfolio-button portfolio-button--view"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="portfolio-button portfolio-button--code"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-1">{content}</p>
      )}
    </div>
  );
}
