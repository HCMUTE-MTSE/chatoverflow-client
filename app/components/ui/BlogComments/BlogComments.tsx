import React, { useEffect, useState } from 'react';
import { getBlogComments } from '../../../services/api/blog/blog.service';
import type { Comment } from '../../../models/res/blog.response';
import BlogComment from '../BlogComment';
import BlogCommentForm from '../BlogCommentForm';
import blog from '../../../lang/en/blog';

interface BlogCommentsProps {
  blogSlug: string;
}

export default function BlogComments({ blogSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogSlug]);

  const fetchComments = async (
    pageNum: number = 1,
    append: boolean = false
  ) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const response = await getBlogComments(blogSlug, pageNum);

      if (append) {
        setComments((prev) => [...prev, ...response.data]);
      } else {
        setComments(response.data);
      }

      setHasNextPage(
        response.pagination?.nextUrl !== null &&
          response.pagination?.nextUrl !== undefined
      );
      setPage(pageNum);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : blog.comments.failedToLoad);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleCommentUpdate = (
    commentId: string,
    upvotes: number,
    downvotes: number,
    upvotedBy: string[],
    downvotedBy: string[]
  ) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, upvotes, downvotes, upvotedBy, downvotedBy }
          : comment
      )
    );
  };

  const handleCommentEdit = (commentId: string, newContent: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    );
  };

  const handleCommentDelete = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const loadMoreComments = () => {
    if (!loadingMore && hasNextPage) {
      fetchComments(page + 1, true);
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1A1E2B] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                </div>
                <div className="h-16 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {blog.comments.title} ({comments.length})
      </h2>

      <BlogCommentForm
        blogSlug={blogSlug}
        onCommentAdded={handleCommentAdded}
      />

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {comments.length === 0 && !error ? (
        <div className="text-gray-400 text-center py-8">
          {blog.comments.noComments}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <BlogComment
              key={comment.id}
              comment={comment}
              onCommentUpdate={handleCommentUpdate}
              onCommentEdit={handleCommentEdit}
              onCommentDelete={handleCommentDelete}
            />
          ))}

          {hasNextPage && (
            <div className="text-center pt-4">
              <button
                onClick={loadMoreComments}
                disabled={loadingMore}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loadingMore ? blog.comments.loading : blog.comments.loadMore}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
