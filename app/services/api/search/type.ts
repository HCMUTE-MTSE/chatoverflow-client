export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'question' | 'answer' | 'user' | 'tag';
  url: string;
  metadata?: {
    author?: string;
    createdAt?: string;
    tags?: string[];
    votes?: number;
  };
}

export interface SearchFilters {
  type?: 'all' | 'question' | 'answer' | 'user' | 'tag';
  sortBy?: 'relevance' | 'date' | 'votes';
  dateRange?: 'all' | 'day' | 'week' | 'month' | 'year';
}
