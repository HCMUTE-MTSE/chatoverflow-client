import React from 'react';
import EditQuestionCard from '~/components/ui/QuestionCard/EditQuestionCard/QuestionCard';
import LoadMoreButton from '~/components/ui/LoadMoreButton/LoadMoreButton';
import type { PostsResponse } from '../../../../../hooks/profile/usePosts';

interface PostsListProps {
  posts: PostsResponse['data'];
  pagination?: PostsResponse['pagination'] | null;
  loading?: boolean;
  loadingMore?: boolean;
  error?: string | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onClick: (postId: string) => void;
}

export function PostsList({
  posts,
  pagination,
  loading,
  loadingMore,
  error,
  hasMore,
  onLoadMore,
  onEdit,
  onDelete,
  onClick,
}: PostsListProps) {
  if (loading && posts.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">Loading posts...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts && posts.length > 0 ? (
        <>
          {posts.map((post) => {
            const cardProps: any = {
              key: post._id,
              title: post.title,
              tags: post.tags.map((tag) => tag.toUpperCase()),
              user: {
                name: post.user.name,
                avatar: post.user.avatar || '/assets/images/defaultavatar.png',
              },
              time: new Date(post.askedTime).toLocaleDateString(),
              votes: post.upvotes,
              answers: post.answerCount || 0,
              views: post.views,
              onClick: () => onClick(post._id),
            };

            if (onEdit) cardProps.onEdit = () => onEdit(post._id);
            if (onDelete) cardProps.onDelete = () => onDelete(post._id);

            return <EditQuestionCard {...cardProps} />;
          })}

          {/* Load More Button */}
          {onLoadMore && (
            <LoadMoreButton
              onClick={onLoadMore}
              disabled={!hasMore}
              loading={!!loadingMore}
            />
          )}

          {/* Pagination Info */}
          {hasMore && pagination && (
            <p className="text-gray-400 text-sm text-center -mt-2 mb-4">
              Showing {posts.length} posts • Page {pagination.page}
            </p>
          )}

          {/* End Message */}
          {!hasMore && posts.length > 0 && (
            <div className="text-gray-500 text-center py-4">
              All {posts.length} posts loaded
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400 text-center py-8">No posts yet</div>
      )}
    </div>
  );
}
