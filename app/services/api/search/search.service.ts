import type { SearchResult, SearchFilters } from './type';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface SearchApiResponse {
  results: SearchResult[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  searchQuery: string;
  appliedFilters: {
    type: string;
    sortBy: string;
    dateRange: string;
    tags: string[];
  };
}

interface SuggestionItem {
  id: string;
  title: string;
  type: string;
  url: string;
}

export interface PopularTag {
  tag: string;
  count: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* Helper function to build query parameters */
const buildSearchParams = (
  query: string,
  filters: SearchFilters = {},
  page: number = 1,
  limit: number = 20
): URLSearchParams => {
  const params = new URLSearchParams({
    q: query.trim(),
    page: page.toString(),
    limit: limit.toString(),
  });

  // Add filters to params
  if (filters.type && filters.type !== 'all') {
    params.append('type', filters.type);
  }

  if (filters.sortBy && filters.sortBy !== 'relevance') {
    params.append('sortBy', filters.sortBy);
  }

  if (filters.dateRange && filters.dateRange !== 'all') {
    params.append('dateRange', filters.dateRange);
  }

  /*   if (filters.tags && filters.tags.length > 0) {
    params.append('tags', filters.tags.join(','));
  }

  if (filters.minVotes !== undefined && filters.minVotes > 0) {
    params.append('minVotes', filters.minVotes.toString());
  } */

  return params;
};

/* Helper function for making API requests */
const makeApiRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data;
};

/* Main search function */
export const searchQuestions = async (
  query: string,
  filters: SearchFilters = {},
  page: number = 1,
  limit: number = 20
): Promise<SearchResult[]> => {
  try {
    const params = buildSearchParams(query, filters, page, limit);
    const url = `${API_BASE_URL}/search?${params}`;

    const data = await makeApiRequest<SearchApiResponse>(url);
    return data.results;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

/* Search suggestions function */
export const getSearchSuggestions = async (
  query: string,
  limit: number = 5
): Promise<SuggestionItem[]> => {
  try {
    if (!query.trim() || query.trim().length < 2) {
      return [];
    }

    const params = new URLSearchParams({
      q: query.trim(),
      limit: limit.toString(),
    });

    const url = `${API_BASE_URL}/search/suggestions?${params}`;
    const data = await makeApiRequest<SuggestionItem[]>(url);
    return data;
  } catch (error) {
    console.error('Search suggestions API error:', error);
    return []; // Return empty array on error for suggestions
  }
};

/* Popular tags function */
export const getPopularTags = async (
  limit: number = 20
): Promise<PopularTag[]> => {
  try {
    const url = `${API_BASE_URL}/search/popular-tags?limit=${limit}`;
    const data = await makeApiRequest<PopularTag[]>(url);
    return data;
  } catch (error) {
    console.error('Popular tags API error:', error);
    throw error;
  }
};

export const searchApi = {
  searchQuestions,
  getSearchSuggestions,
  getPopularTags,
};
