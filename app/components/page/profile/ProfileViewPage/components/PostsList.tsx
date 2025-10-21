import React, { useState, useMemo } from 'react';
import EditQuestionCard from '~/components/ui/QuestionCard/EditQuestionCard/QuestionCard';
import type { ProfileApiResponse } from '../../../../../hooks/profile/useProfileData';

interface PostsListProps {
  posts: ProfileApiResponse['posts'];
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onClick: (postId: string) => void;
}

const POSTS_PER_PAGE = 10;

export function PostsList({
  posts,
  onEdit,
  onDelete,
  onClick,
}: PostsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán posts hiển thị theo trang
  const paginatedPosts = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage]);

  const hasMore = currentPage * POSTS_PER_PAGE < posts.length;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Reset về trang 1 khi posts thay đổi (sau khi xóa)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [posts.length]);

  return (
    <div className="space-y-4">
      {paginatedPosts && paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => {
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
        })
      ) : (
        <div className="text-gray-400 text-center py-8">No posts yet</div>
      )}

      {hasMore && (
        <div className="flex flex-col items-center gap-2 pt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors"
          >
            Load More
          </button>
          <p className="text-gray-400 text-sm">
            Showing {paginatedPosts.length} of {posts.length} posts (Page{' '}
            {currentPage}/{totalPages})
          </p>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-gray-500 text-center py-4">All posts loaded</div>
      )}
    </div>
  );
}
