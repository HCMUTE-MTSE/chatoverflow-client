import { useSearch } from '~/hooks/search/useSearch';
import { searchApi } from '~/services/api/search/search.service';
import { useNavigate } from 'react-router';

import type {
  SearchResult,
  SearchFilters,
} from '../../../services/api/search/type';
import { GlobalSearch } from './GlobalSearch';

export function SearchPage() {
  const navigate = useNavigate();
  const { search, clearResults } = useSearch();

  const handleSearch = async (
    query: string,
    filters: SearchFilters
  ): Promise<SearchResult[]> => {
    try {
      // Use the search API directly since GlobalSearch expects results immediately
      const results = await searchApi.searchQuestions(query, filters);
      return results;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    clearResults();
  };

  return (
    <div className="container mx-auto px-4">
      <GlobalSearch
        onSearch={handleSearch}
        onResultClick={handleResultClick}
        placeholder="Search questions"
      />
    </div>
  );
}
