import * as React from 'react';
import type { SearchResult } from '../../../services/api/search/type';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
  loading?: boolean;
  error?: string;
  onResultClick?: (result: SearchResult) => void;
  emptyMessage?: string;
}

export function SearchResults({
  results,
  loading = false,
  error,
  onResultClick,
  emptyMessage = 'No results found',
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4 overflow-y-scroll">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-700 rounded-lg animate-pulse "
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-600 rounded mt-1"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-16 h-5 bg-gray-600 rounded"></div>
                  <div className="w-12 h-4 bg-gray-600 rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-gray-600 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-600 rounded mb-1"></div>
                <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 text-lg mb-2">Search Error</div>
        <div className="text-gray-400">{error}</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center">
        <div className="text-gray-400 text-sm">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      <div className="overflow-y-scroll max-h-96">
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
