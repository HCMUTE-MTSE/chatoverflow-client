import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function LoadMoreButton({
  onClick,
  disabled,
  loading,
}: LoadMoreButtonProps) {
  // Don't render the button if it's disabled (no more data)
  if (disabled) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8 mb-4">
      <button
        onClick={onClick}
        disabled={loading}
        className={`
          px-8 py-3 rounded-lg font-medium text-sm transition-all duration-200
          ${
            loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg transform hover:scale-105'
          }
          flex items-center gap-2 min-w-[140px] justify-center
        `}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}
