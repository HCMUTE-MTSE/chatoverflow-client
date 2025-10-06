export const BLOG_SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  LAST_7_DAYS: 'last_7_days',
  HIGHEST_VOTES: 'highest_votes',
  LOWEST_VOTES: 'lowest_votes',
} as const;

export type BlogSortOption =
  (typeof BLOG_SORT_OPTIONS)[keyof typeof BLOG_SORT_OPTIONS];

export const DEFAULT_BLOG_SORT = BLOG_SORT_OPTIONS.NEWEST;

export const BLOG_SORT_LABELS: Record<BlogSortOption, string> = {
  [BLOG_SORT_OPTIONS.NEWEST]: 'Newest',
  [BLOG_SORT_OPTIONS.OLDEST]: 'Oldest',
  [BLOG_SORT_OPTIONS.LAST_7_DAYS]: 'Last 7 Days',
  [BLOG_SORT_OPTIONS.HIGHEST_VOTES]: 'Highest Votes',
  [BLOG_SORT_OPTIONS.LOWEST_VOTES]: 'Lowest Votes',
};
