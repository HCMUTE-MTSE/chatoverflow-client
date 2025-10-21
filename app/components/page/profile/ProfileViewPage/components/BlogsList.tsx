import React from 'react';
import BlogCard from '~/components/ui/BlogCard/BlogCard';
import type { BlogPost } from '../../../../../hooks/profile/useBlogs';

interface BlogsListProps {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
}

export function BlogsList({ blogs, loading, error }: BlogsListProps) {
  if (loading) {
    return (
      <div className="text-gray-400 text-center py-8">Loading blogs...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-gray-400 text-center py-8">No blogs yet</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
}
