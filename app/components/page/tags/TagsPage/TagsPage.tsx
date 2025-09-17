import React, { useEffect, useState, useCallback } from 'react';
import TagCard from '~/components/ui/TagCard';
import Select from '~/components/ui/Select/Select';
import Input from '~/components/ui/Input/Input';
import LoadMoreButton from '~/components/ui/LoadMoreButton';
import { getTagList, getTagListByName } from '~/services/api/tags/tag.service';
import type { TagResponse } from '~/services/api/tags/tag.service';
import tagsLang from '~/lang/en/tags';

export default function Tags() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('most-popular');
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Create filter options using internationalization
  const filterOptions = [
    { value: 'most-popular', label: tagsLang.filters.mostPopular },
    { value: 'newest', label: tagsLang.filters.newest },
    { value: 'oldest', label: tagsLang.filters.oldest },
    { value: 'name', label: tagsLang.filters.name },
  ];

  // Fetch initial tags function
  const fetchInitialTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTagList(1, 12);
      setTags(response.data ?? []);
      setNextUrl(response.pagination?.nextUrl ?? null);
      setCurrentPage(1);
    } catch (error) {
      console.error(tagsLang.errorLoadingTags, error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (searchQuery.trim()) {
            setSearchLoading(true);
            setIsSearchMode(true);
            try {
              const response = await getTagListByName(
                searchQuery.trim(),
                1,
                12
              );
              setTags(response.data ?? []);
              setNextUrl(response.pagination?.nextUrl ?? null);
              setCurrentPage(1);
            } catch (error) {
              console.error(tagsLang.errorLoadingTags, error);
            } finally {
              setSearchLoading(false);
            }
          } else {
            // Reset to normal mode when search is cleared
            setIsSearchMode(false);
            fetchInitialTags();
          }
        }, 500);
      };
    })(),
    [fetchInitialTags]
  );

  // Initial load
  useEffect(() => {
    fetchInitialTags();
  }, [fetchInitialTags]);

  // Trigger search when search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Load more function
  const handleLoadMore = async () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    try {
      const response = isSearchMode
        ? await getTagListByName(searchTerm.trim(), currentPage + 1, 12)
        : await getTagList(currentPage + 1, 12);
      setTags((prev) => [...prev, ...(response.data ?? [])]);
      setNextUrl(response.pagination?.nextUrl ?? null);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error(tagsLang.errorLoadingMore, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - giống Figma */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-64 w-160 h-230 bg-indigo-900/50 rounded-full blur-[357px]"></div>
        <div className="absolute -bottom-28 -right-36 w-138 h-110 bg-indigo-900/50 rounded-full blur-[357px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-white text-3xl font-bold mb-16 tracking-tight">
            {tagsLang.title}
          </h1>

          {/* Search and Filter Row */}
          <div className="flex items-center gap-8 mb-16">
            {/* Search Input - sử dụng Input component */}
            <div className="flex-1 max-w-2xl">
              <Input
                label=""
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                placeholder={tagsLang.searchPlaceholder}
                className="max-w-2xl"
              />
            </div>

            {/* Filter Dropdown - sử dụng Select component */}
            <div>
              <Select
                label=""
                value={selectedFilter}
                onChange={(value) => setSelectedFilter(value)}
                options={filterOptions}
                placeholder={tagsLang.filters.mostPopular}
              />
            </div>
          </div>
        </div>

        {/* Tags Grid - spacing giống Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <TagCard
              key={tag.id}
              name={tag.name}
              description={tag.description}
              questionCount={tag.questionCount}
            />
          ))}
        </div>

        {/* Search loading indicator */}
        {searchLoading && (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-400 text-sm">{tagsLang.searching}</p>
          </div>
        )}

        {/* Load More Button - show when there's more data and not currently searching */}
        {!searchLoading && (
          <LoadMoreButton
            onClick={handleLoadMore}
            disabled={!nextUrl}
            loading={loading}
          />
        )}

        {/* No results message */}
        {!searchLoading && !loading && isSearchMode && tags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">{tagsLang.noResultsFound}</p>
          </div>
        )}

        {/* Initial loading state */}
        {!isSearchMode && tags.length === 0 && loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">{tagsLang.loadingTags}</p>
          </div>
        )}
      </div>
    </div>
  );
}
