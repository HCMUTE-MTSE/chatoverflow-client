import * as React from 'react';
import type { SearchResult } from '../../../services/api/search/type';
import { SearchResultItem } from './SearchResultItem';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface SearchResultsProps {
  results: SearchResult[];
  loading?: boolean;
  error?: string;
  onResultClick?: (result: SearchResult) => void;
  emptyMessage?: string;
  totalResults?: number;
}

export function SearchResults({
  results,
  loading = false,
  error,
  onResultClick,
  emptyMessage = 'No results found',
  totalResults,
}: SearchResultsProps) {
  // Loading State
  if (loading && results.length === 0) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-700 rounded-lg animate-pulse"
          >
            <div className="flex items-start gap-4">
              {/* Icon skeleton */}
              <div className="w-5 h-5 bg-gray-600 rounded mt-1 flex-shrink-0"></div>

              <div className="flex-1 space-y-3">
                {/* Badge and stats skeleton */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-6 bg-gray-600 rounded-full"></div>
                  <div className="w-12 h-4 bg-gray-600 rounded"></div>
                  <div className="w-16 h-4 bg-gray-600 rounded"></div>
                </div>

                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="w-3/4 h-6 bg-gray-600 rounded"></div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-600 rounded"></div>
                  <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                </div>

                {/* Footer skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-4 bg-gray-600 rounded"></div>
                    <div className="w-20 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-6 bg-gray-600 rounded"></div>
                    <div className="w-16 h-6 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-full p-4 mb-4">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Search Error
        </h3>
        <p className="text-gray-400 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (results.length === 0) {
    return null;
  }

  // Results State
  const displayCount = totalResults ?? results.length;
  const showingPartial = totalResults && totalResults > results.length;

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-700">
        <div className="text-sm text-gray-400">
          {showingPartial ? (
            <>
              Showing{' '}
              <span className="font-medium text-gray-300">
                {results.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-gray-300">{displayCount}</span>{' '}
              {displayCount === 1 ? 'result' : 'results'}
            </>
          ) : (
            <>
              <span className="font-medium text-gray-300">{displayCount}</span>{' '}
              {displayCount === 1 ? 'result' : 'results'} found
            </>
          )}
        </div>

        {/* Results Type Breakdown (if useful) */}
        {results.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {(() => {
              const questions = results.filter(
                (r) => r.type === 'question'
              ).length;
              const blogs = results.filter((r) => r.type === 'blog').length;
              const parts = [];
              if (questions > 0)
                parts.push(
                  `${questions} question${questions !== 1 ? 's' : ''}`
                );
              if (blogs > 0)
                parts.push(`${blogs} blog${blogs !== 1 ? 's' : ''}`);
              return parts.join(' • ');
            })()}
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-0">
        {results.map((result) => (
          <SearchResultItem
            key={result.id}
            result={result}
            onClick={onResultClick}
          />
        ))}
      </div>
    </div>
  );
}
