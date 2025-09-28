import React, { useState, useEffect, useRef } from 'react';
import {
  getTagListByName,
  type TagResponse,
} from '~/services/api/tags/tag.service';

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagSelector({
  selectedTags,
  onTagsChange,
  placeholder = 'Search and select tags...',
}: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<TagResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchTags(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchTags = async (name: string) => {
    try {
      setIsLoading(true);
      const response = await getTagListByName(name, 1, 10);
      if (response.success && response.data) {
        setSuggestions(response.data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error searching tags:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagSelect = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      onTagsChange([...selectedTags, tagName]);
    }
    setSearchTerm('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleTagRemove = (tagName: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagName));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim() && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="ml-2 text-blue-200 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagSelect(tag.name)}
              disabled={selectedTags.includes(tag.name)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors ${
                selectedTags.includes(tag.name)
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{tag.name}</span>
                {tag.questionCount !== undefined && (
                  <span className="text-sm text-gray-400">
                    {tag.questionCount} questions
                  </span>
                )}
              </div>
              {tag.description && (
                <div className="text-sm text-gray-400 truncate mt-1">
                  {tag.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen &&
        searchTerm.trim() &&
        !isLoading &&
        suggestions.length === 0 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
            <div className="px-4 py-2 text-gray-400 text-center">
              No tags found for "{searchTerm}"
            </div>
          </div>
        )}
    </div>
  );
}
