import { useState, useCallback } from 'react';
import type {
  SearchResult,
  SearchFilters,
} from '../../services/api/search/type';
import { searchQuestions } from '../../services/api/search/search.service';

interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalResults: number;
  search: (query: string, filters?: SearchFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  clearResults: () => void;
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const search = useCallback(
    async (query: string, filters: SearchFilters = {}) => {
      if (!query.trim()) {
        setResults([]);
        setError(null);
        setHasMore(false);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);
      setCurrentPage(1);
      setCurrentQuery(query);
      setCurrentFilters(filters);

      try {
        const searchResults = await searchQuestions(query, filters, 1);
        setResults(searchResults);
        setHasMore(searchResults.length === 20); // Assuming 20 is page size
        setTotalResults(searchResults.length);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Search failed';
        setError(errorMessage);
        setResults([]);
        setHasMore(false);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    if (!currentQuery || loading || !hasMore) return;

    setLoading(true);
    const nextPage = currentPage + 1;

    try {
      const moreResults = await searchQuestions(
        currentQuery,
        currentFilters,
        nextPage
      );

      if (moreResults.length > 0) {
        setResults((prev) => [...prev, ...moreResults]);
        setCurrentPage(nextPage);
        setHasMore(moreResults.length === 20);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load more results';
      setError(errorMessage);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentQuery, currentFilters, currentPage, loading, hasMore]);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setHasMore(false);
    setCurrentPage(1);
    setTotalResults(0);
    setCurrentQuery('');
    setCurrentFilters({});
  }, []);

  return {
    results,
    loading,
    error,
    hasMore,
    currentPage,
    totalResults,
    search,
    loadMore,
    clearResults,
  };
}
