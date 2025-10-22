import axios from 'axios';
import type { SearchResult, SearchFilters } from './type';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface SearchApiResponse {
  results: SearchResult[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  query: string;
  filters: {
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

/**
 * Build query parameters for search request
 */
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

  if (filters.type) {
    params.append('type', filters.type);
  }

  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy);
  }

  if (filters.dateRange) {
    params.append('dateRange', filters.dateRange);
  }

  if (filters.tags && filters.tags.length > 0) {
    params.append('tags', filters.tags.join(','));
  }

  if (filters.minVotes !== undefined && filters.minVotes > 0) {
    params.append('minVotes', filters.minVotes.toString());
  }

  return params;
};

/**
 * Helper function for making API requests with axios
 */
const makeApiRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<ApiResponse<T>>(url);

    if (!response.data.success) {
      throw new Error(response.data.error || 'API request failed');
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || error.message || 'Network error'
      );
    }
    throw error;
  }
};

/**
 * Main search function - searches questions and/or blogs
 */
export const search = async (
  query: string,
  filters: SearchFilters = {},
  page: number = 1,
  limit: number = 20
): Promise<SearchApiResponse> => {
  try {
    const params = buildSearchParams(query, filters, page, limit);
    const url = `${API_BASE_URL}/search?${params}`;
    console.log('____________________Search-URL', url);
    const data = await makeApiRequest<SearchApiResponse>(url);
    console.log('____________________Search-Data', data);
    return data;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

/**
 * Get search suggestions for autocomplete/typeahead
 */
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
    return [];
  }
};

/**
 * Get popular tags from questions and blogs
 */
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

/**
 * Exported search API object
 */
export const searchApi = {
  search,
  getSearchSuggestions,
  getPopularTags,
};
