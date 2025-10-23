export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'question' | 'blog';
  url: string;
  metadata?: {
    author?: string;
    authorAvatar?: string;
    authorReputation?: number;
    createdAt?: string;
    formattedDate?: string;
    tags?: string[];
    votes?: number;
    views?: number;
    answers?: number;
  };
}

export interface SearchFilters {
  type?: 'all' | 'question' | 'blog';
  sortBy?: 'relevance' | 'date' | 'votes';
  dateRange?: 'all' | 'day' | 'week' | 'month' | 'year';
  tags?: string[];
  minVotes?: number;
}
