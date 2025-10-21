import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../components/ui/BlogCard/BlogCard';
import BlogFilter from '../../components/ui/BlogFilter';
import blog from '../../lang/en/blog';
import { getBlogList } from '../../services/api/blog/blog.service';
import type { BlogListResponse } from '../../models/res/blog.response';
import {
  DEFAULT_BLOG_SORT,
  type BlogSortOption,
} from '../../models/constant/blog-filters';
import { FiPlus } from 'react-icons/fi';

type BlogPost = BlogListResponse['data'][0];

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<BlogSortOption>(DEFAULT_BLOG_SORT);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<{
    sortBy: string;
    tags: string[];
  }>({
    sortBy: DEFAULT_BLOG_SORT,
    tags: [],
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async (resetPosts: boolean = false) => {
    try {
      setLoading(true);
      const currentPage = resetPosts ? 1 : page;

      const data = await getBlogList({
        page: currentPage,
        sortBy: appliedFilters.sortBy,
        tags: appliedFilters.tags.length > 0 ? appliedFilters.tags : undefined,
      });

      if (resetPosts) {
        setPosts(data.data);
        setPage(1);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
      }
      setHasMore(!!data.pagination?.nextUrl);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    setAppliedFilters({
      sortBy,
      tags: selectedTags,
    });
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  // Fetch on page change
  useEffect(() => {
    if (page > 1) {
      fetchPosts(false);
    }
  }, [page]);

  // Fetch on filter change
  useEffect(() => {
    fetchPosts(true);
  }, [appliedFilters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter and Create Button Row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <BlogFilter
            currentSort={sortBy}
            selectedTags={selectedTags}
            onSortChange={setSortBy}
            onTagsChange={setSelectedTags}
            onApplyFilter={handleApplyFilter}
          />
        </div>
        <button
          onClick={() => navigate('/create-blog')}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          <FiPlus size={20} />
          Create Blog
        </button>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">{blog.list.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <BlogCard {...post} showActions={false} />
              </div>
            );
          }
          return <BlogCard key={post.id} {...post} showActions={false} />;
        })}
      </div>
      {loading && (
        <div className="text-center text-gray-500 mt-4">
          {blog.list.loadMore}
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500 mt-4">
          No more posts to load
        </div>
      )}
      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          {blog.list.noResults}
        </div>
      )}
    </div>
  );
}
