import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearch } from '~/hooks/search/useSearch';
import { SearchInput } from './SearchInput';
import { SearchFilters } from './SearchFilters';
import { SearchResults } from './SearchResults';
import { ListFilterPlus } from 'lucide-react';

import type {
  SearchResult,
  SearchFilters as SearchFiltersType,
} from '../../../services/api/search/type';

export function SearchPage() {
  const navigate = useNavigate();
  const {
    results,
    loading,
    error,
    hasMore,
    currentPage,
    totalPages,
    totalResults,
    search,
    loadMore,
    clearResults,
  } = useSearch();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({
    type: 'all',
    sortBy: 'relevance',
    dateRange: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Search function (stable reference) — optional, wrap in useCallback if needed
  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      clearResults();
      return;
    }
    search(trimmed, filters);
  }, [query, filters, search, clearResults]);

  // Debounce effect: run handleSearch 500ms after query/filters change
  useEffect(() => {
    const id = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(id);
  }, [handleSearch]);

  const handleClear = () => {
    setQuery('');
    clearResults();
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    handleClear();
  };

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.sortBy !== 'relevance' ||
    filters.dateRange !== 'all' ||
    (filters.tags && filters.tags.length > 0);

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="space-y-4 mb-6">
          <SearchInput
            value={query}
            onChange={setQuery} // ensure SearchInput calls onChange(value: string)
            placeholder="Search questions, blogs..."
            onClear={handleClear}
            loading={loading}
          />

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              <ListFilterPlus className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex items-center justify-center bg-orange-500 text-white text-xs rounded-full w-5 h-5">
                  •
                </span>
              )}
            </button>

            {/* Results Summary */}
            {totalResults > 0 && !loading && (
              <div className="text-sm text-gray-400">
                Showing {results.length} of {totalResults} results
                {totalPages > 1 && (
                  <span className="ml-2">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <SearchFilters filters={filters} onChange={setFilters} />
          )}
        </div>

        {/* Search Results */}
        <SearchResults
          results={results}
          loading={loading}
          error={error || undefined}
          onResultClick={handleResultClick}
          emptyMessage={query ? 'No results found for your search' : ''}
        />

        {/* Load More Button */}
        {hasMore && !loading && results.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Load More Results
            </button>
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && results.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
              Loading more results...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
