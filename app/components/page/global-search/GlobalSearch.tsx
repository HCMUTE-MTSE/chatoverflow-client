import * as React from 'react';

import { ListFilterPlus } from 'lucide-react';

import { SearchInput } from './SearchInput';
import { SearchFilters } from './SearchFilters';
import { SearchResults } from './SearchResults';

import type {
  SearchResult,
  SearchFilters as SearchFiltersType,
} from '../../../services/api/search/type';

interface GlobalSearchProps {
  onSearch?: (
    query: string,
    filters: SearchFiltersType
  ) => Promise<SearchResult[]>;
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
}

export function GlobalSearch({
  onSearch,
  onResultClick,
  placeholder = 'Search questions, blogs',
}: GlobalSearchProps) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState<SearchFiltersType>({});
  const [results, setResults] = React.useState<SearchResult[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const [showFilters, setShowFilters] = React.useState(false);

  // Debounce search
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (onSearch) {
        setLoading(true);
        setError('');
        try {
          const searchResults = await onSearch(query, filters);
          console.log('____________________Search-Query: ', query);
          console.log('____________________Search-Filters: ', filters);
          setResults(searchResults);
          console.log('____________________Search-Results: ', searchResults);
        } catch (err) {
          setError('Failed to search. Please try again.');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [query, filters, onSearch]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError('');
  };

  const hasActiveFilters =
    filters.type !== 'question' ||
    filters.sortBy !== 'relevance' ||
    filters.dateRange !== 'all';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="space-y-4 mb-2">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          onClear={handleClear}
          loading={loading}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <ListFilterPlus />
            Filters
            {hasActiveFilters && (
              <span className="bg-orange-500 text-white text-xs rounded-full w-2 h-2"></span>
            )}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <SearchFilters filters={filters} onChange={setFilters} />
        )}
      </div>
      {/* Results */}
      <SearchResults
        results={results}
        loading={loading}
        error={error}
        onResultClick={onResultClick}
        emptyMessage={query ? 'No results found for your search' : ''}
      />
    </div>
  );
}
