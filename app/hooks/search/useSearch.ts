import { useState, useCallback } from 'react';
import type {
  SearchResult,
  SearchFilters,
} from '../../services/api/search/type';
import { search } from '../../services/api/search/search.service';

interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
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
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const performSearch = useCallback(
    async (query: string, filters: SearchFilters = {}) => {
      if (!query.trim()) {
        setResults([]);
        setError(null);
        setHasMore(false);
        setTotalPages(0);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);
      setCurrentPage(1);
      setCurrentQuery(query);
      setCurrentFilters(filters);

      try {
        console.log('____________________Start-Search...');
        const response = await search(query, filters, 1);
        console.log('____________________Search-Response', response);
        setResults(response.results);
        setHasMore(response.pagination.hasNext);
        setTotalResults(response.pagination.totalResults);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Search failed';
        setError(errorMessage);
        setResults([]);
        setHasMore(false);
        setTotalPages(0);
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
      const response = await search(currentQuery, currentFilters, nextPage);

      if (response.results.length > 0) {
        setResults((prev) => [...prev, ...response.results]);
        setCurrentPage(nextPage);
        setHasMore(response.pagination.hasNext);
        setTotalPages(response.pagination.totalPages);
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
    setTotalPages(0);
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
    totalPages,
    totalResults,
    search: performSearch,
    loadMore,
    clearResults,
  };
}
