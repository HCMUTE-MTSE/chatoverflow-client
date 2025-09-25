import * as React from 'react';
import type { SearchFilters } from '../../../services/api/search/type';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-300 font-medium">Type:</label>
        <select
          value={filters.type || 'all'}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All</option>
          <option value="question">Questions</option>
          <option value="answer">Answers</option>
          <option value="user">Users</option>
          <option value="tag">Tags</option>
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-300 font-medium">Sort by:</label>
        <select
          value={filters.sortBy || 'relevance'}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-300 font-medium">Date:</label>
        <select
          value={filters.dateRange || 'all'}
          onChange={(e) => updateFilter('dateRange', e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All time</option>
          <option value="day">Past day</option>
          <option value="week">Past week</option>
          <option value="month">Past month</option>
          <option value="year">Past year</option>
        </select>
      </div>
    </div>
  );
}
