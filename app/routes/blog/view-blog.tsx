import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SafeHTML from '../../components/ui/SafeHTML/SafeHTML';
import {
  getBlogDetail,
  type BlogDetailResponse,
} from '../../services/api/blog/blog.service';

type BlogPost = BlogDetailResponse['data'];

export default function ViewBlog() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!slug) throw new Error('Blog post not found');
        const response = await getBlogDetail(slug);
        setPost(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load blog post'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-gray-700 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {post.coverImage && (
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

      <div className="flex items-center mb-6">
        <img
          src={post.author.avatar || '/assets/images/defaultavatar.png'}
          alt={post.author.nickName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="text-white font-medium">{post.author.nickName}</p>
          <p className="text-gray-400 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <SafeHTML html={post.contentHtml} className="blog-content" />
      </div>
    </div>
  );
}
