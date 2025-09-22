import React, { useState } from 'react';

interface LoadMoreRepliesProps {
  totalCount: number;
  currentCount: number;
  onLoadMore: () => Promise<void>;
  className?: string;
}

const LoadMoreReplies: React.FC<LoadMoreRepliesProps> = ({
  totalCount,
  currentCount,
  onLoadMore,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const remainingCount = totalCount - currentCount;

  if (remainingCount <= 0) {
    return null;
  }

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Failed to load more replies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 py-2 ${className}`}>
      <div className="flex-1 h-px bg-gray-600"></div>
      <button
        onClick={handleLoadMore}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Show {Math.min(remainingCount, 10)} more{' '}
            {remainingCount === 1 ? 'reply' : 'replies'}
          </>
        )}
      </button>
      <div className="flex-1 h-px bg-gray-600"></div>
    </div>
  );
};

export default LoadMoreReplies;
