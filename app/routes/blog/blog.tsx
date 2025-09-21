import React, { useEffect, useState, useRef, useCallback } from 'react';
import BlogCard from '../../components/ui/BlogCard/BlogCard';
import blog from '../../lang/en/blog';
import { getBlogList } from '../../services/api/blog/blog.service';
import type { BlogListResponse } from '../../models/res/blog.response';

type BlogPost = BlogListResponse['data'][0];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogList(page);
      setPosts((prevPosts) => [...prevPosts, ...data.data]);
      setHasMore(!!data.pagination.nextUrl);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">{blog.list.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <BlogCard {...post} />
              </div>
            );
          }
          return <BlogCard key={post.id} {...post} />;
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
