import { useState, useEffect, useCallback } from 'react';
import { getSearchSuggestions } from '../../services/api/search/search.service';

interface SuggestionItem {
  id: string;
  title: string;
  type: string;
  url: string;
}

export function useSearchSuggestions(query: string, debounceMs: number = 300) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await getSearchSuggestions(query, 5);
        setSuggestions(results);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    clearSuggestions,
  };
}
