import React, { useState } from 'react';
import { createBlogComment } from '../../../services/api/blog/blog.service';
import type { Comment } from '../../../models/res/blog.response';
import blog from '../../../lang/en/blog';

interface BlogCommentFormProps {
  blogSlug: string;
  onCommentAdded: (comment: Comment) => void;
}

export default function BlogCommentForm({
  blogSlug,
  onCommentAdded,
}: BlogCommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError(blog.comments.contentRequired);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createBlogComment(blogSlug, content.trim());
      onCommentAdded(response.data);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : blog.comments.failedToPost);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1E2B] rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-white mb-4">
        {blog.comments.addComment}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={blog.comments.placeholder}
            className="w-full bg-[#212734] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? blog.comments.posting : blog.comments.postComment}
          </button>
        </div>
      </form>
    </div>
  );
}
