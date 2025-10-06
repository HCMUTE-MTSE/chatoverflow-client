import React, { useState, useEffect } from 'react';
import blog from '~/lang/en/blog';
import {
  BLOG_SORT_OPTIONS,
  BLOG_SORT_LABELS,
  type BlogSortOption,
} from '~/models/constant/blog-filters';
import { getTagList, type TagResponse } from '~/services/api/tags/tag.service';

interface BlogFilterProps {
  currentSort: BlogSortOption;
  selectedTags: string[];
  onSortChange: (sortBy: BlogSortOption) => void;
  onTagsChange: (tags: string[]) => void;
  onApplyFilter: () => void;
}

export default function BlogFilter({
  currentSort,
  selectedTags,
  onSortChange,
  onTagsChange,
  onApplyFilter,
}: BlogFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<TagResponse[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const response = await getTagList(1, 20);
      if (response.success && response.data) {
        setAvailableTags(response.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoadingTags(false);
    }
  };

  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagsChange(selectedTags.filter((t) => t !== tagName));
    } else {
      onTagsChange([...selectedTags, tagName]);
    }
  };

  const handleClearFilters = () => {
    onSortChange(BLOG_SORT_OPTIONS.NEWEST);
    onTagsChange([]);
    onApplyFilter();
  };

  const hasActiveFilters =
    currentSort !== BLOG_SORT_OPTIONS.NEWEST || selectedTags.length > 0;

  // Filter tags based on search
  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value as BlogSortOption)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
            aria-label={blog.list.title}
          >
            {Object.entries(BLOG_SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isOpen
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {isOpen ? blog.list.hideFilters : blog.list.showFilters}
          {selectedTags.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 rounded-full text-xs">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Apply Filter Button */}
        <button
          onClick={onApplyFilter}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {blog.list.applyFilters}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
          >
            {blog.list.clearAll}
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-300">
              {blog.list.filterByTags}
            </h3>
            {availableTags.length > 5 && (
              <input
                type="text"
                placeholder={blog.list.searchTagsPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:border-blue-500"
              />
            )}
          </div>

          {loadingTags ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-400">
                {blog.list.loadingTags}
              </p>
            </div>
          ) : filteredTags.length === 0 ? (
            <p className="text-sm text-gray-400">
              {searchTerm
                ? blog.list.noTagsFoundFor
                  ? blog.list.noTagsFoundFor.replace('{searchTerm}', searchTerm)
                  : `No tags found for "${searchTerm}"`
                : blog.list.noTagsAvailable}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                  {tag.questionCount !== undefined && (
                    <span className="ml-1 text-xs opacity-75">
                      ({tag.questionCount})
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">
                {(blog.list.selectedTagsLabel || 'Selected tags') +
                  ` (${selectedTags.length}):`}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 text-blue-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
