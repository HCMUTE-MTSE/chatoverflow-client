import * as React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { SearchFilters } from '../../../services/api/search/type';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    updateFilter('tags', tagsArray.length > 0 ? tagsArray : undefined);
  };

  const clearFilters = () => {
    onChange({
      type: 'all',
      sortBy: 'relevance',
      dateRange: 'all',
      tags: undefined,
      minVotes: undefined,
    });
  };

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.sortBy !== 'relevance' ||
    filters.dateRange !== 'all' ||
    (filters.tags && filters.tags.length > 0) ||
    (filters.minVotes && filters.minVotes > 0);

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-200">Filter Results</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Type Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">Type</label>
          <select
            value={filters.type || 'all'}
            onChange={(e) =>
              updateFilter(
                'type',
                e.target.value as 'all' | 'question' | 'blog'
              )
            }
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="all">All</option>
            <option value="question">Questions</option>
            <option value="blog">Blogs</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">Sort by</label>
          <select
            value={filters.sortBy || 'relevance'}
            onChange={(e) =>
              updateFilter(
                'sortBy',
                e.target.value as 'relevance' | 'date' | 'votes'
              )
            }
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Newest</option>
            <option value="votes">Most Votes</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">
            Date range
          </label>
          <select
            value={filters.dateRange || 'all'}
            onChange={(e) =>
              updateFilter(
                'dateRange',
                e.target.value as 'all' | 'day' | 'week' | 'month' | 'year'
              )
            }
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="all">All time</option>
            <option value="day">Past 24 hours</option>
            <option value="week">Past week</option>
            <option value="month">Past month</option>
            <option value="year">Past year</option>
          </select>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm text-gray-300 font-medium">
            Tags{' '}
            <span className="text-gray-500 font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={filters.tags?.join(', ') || ''}
            onChange={handleTagsChange}
            placeholder="e.g. javascript, react, nodejs"
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          {filters.tags && filters.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {filters.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs"
                >
                  {tag}
                  <button
                    onClick={() => {
                      const newTags = filters.tags?.filter(
                        (_, i) => i !== index
                      );
                      updateFilter(
                        'tags',
                        newTags?.length ? newTags : undefined
                      );
                    }}
                    className="hover:text-orange-100"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Min Votes Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">
            Minimum votes
          </label>
          <input
            type="number"
            min="0"
            value={filters.minVotes || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateFilter('minVotes', value > 0 ? value : undefined);
            }}
            placeholder="0"
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Active filters:{' '}
            <span className="text-gray-300">
              {[
                filters.type !== 'all' && `Type: ${filters.type}`,
                filters.sortBy !== 'relevance' && `Sort: ${filters.sortBy}`,
                filters.dateRange !== 'all' && `Date: ${filters.dateRange}`,
                filters.tags &&
                  filters.tags.length > 0 &&
                  `Tags: ${filters.tags.length}`,
                filters.minVotes &&
                  filters.minVotes > 0 &&
                  `Min votes: ${filters.minVotes}`,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
