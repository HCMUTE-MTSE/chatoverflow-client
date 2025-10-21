import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SafeHTML from '../../components/ui/SafeHTML/SafeHTML';
import BlogComments from '../../components/ui/BlogComments';
import { getBlogDetail, voteBlog } from '../../services/api/blog/blog.service';
import { getUserProfileLink } from '../../utils/userUtils';
import { parseJwt } from '../../utils/jwt';
import type { BlogDetailResponse } from '../../models/res/blog.response';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';

type BlogPost = BlogDetailResponse['data'];

export default function ViewBlog() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingLoading, setVotingLoading] = useState(false);
  const [userProfileLink, setUserProfileLink] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID from token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.sub) {
        setCurrentUserId(decoded.sub);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!slug) throw new Error('Blog post not found');
        const response = await getBlogDetail(slug);
        setPost(response.data);

        // Load user profile link
        if (response.data.author.userId) {
          const link = await getUserProfileLink(response.data.author.userId);
          setUserProfileLink(link);
        }
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

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!slug || !post || votingLoading) return;

    setVotingLoading(true);
    try {
      const response = await voteBlog(slug, voteType);
      // Re-fetch blog to get updated vote lists
      const updatedBlog = await getBlogDetail(slug);
      setPost(updatedBlog.data);
    } catch (err) {
      console.error('Failed to vote:', err);
      // You could add a toast notification here
    } finally {
      setVotingLoading(false);
    }
  };

  const hasUserUpvoted =
    post && currentUserId ? post.upvotedBy.includes(currentUserId) : false;
  const hasUserDownvoted =
    post && currentUserId ? post.downvotedBy.includes(currentUserId) : false;

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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={post.author.avatar || '/assets/images/defaultavatar.png'}
            alt={post.author.nickName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <Link
              to={userProfileLink}
              className="text-white font-medium hover:text-orange-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author.nickName}
            </Link>
            <p className="text-gray-400 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => handleVote('upvote')}
            disabled={votingLoading}
            className={`flex items-center gap-1 transition-colors disabled:opacity-50 ${
              hasUserUpvoted
                ? 'text-[#6DFF8D]'
                : 'text-gray-400 hover:text-[#6DFF8D]'
            }`}
          >
            {hasUserUpvoted ? (
              <BiSolidUpvote size={20} />
            ) : (
              <BiUpvote size={20} />
            )}
            <span className="px-2 py-1 bg-[#212734] rounded-sm font-medium">
              {post.upvotes}
            </span>
          </button>
          <button
            onClick={() => handleVote('downvote')}
            disabled={votingLoading}
            className={`flex items-center gap-1 transition-colors disabled:opacity-50 ${
              hasUserDownvoted
                ? 'text-[#FF6D6D]'
                : 'text-gray-400 hover:text-[#FF6D6D]'
            }`}
          >
            {hasUserDownvoted ? (
              <BiSolidDownvote size={20} />
            ) : (
              <BiDownvote size={20} />
            )}
            <span className="px-2 py-1 bg-[#212734] rounded-sm font-medium">
              {post.downvotes}
            </span>
          </button>
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

      {slug && <BlogComments blogSlug={slug} />}
    </div>
  );
}
