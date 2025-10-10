import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfileLink } from '../../../utils/userUtils';
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';

interface Author {
  userId: string;
  avatar: string;
  nickName: string;
}

interface BlogCardProps {
  id: string;
  coverImage: string;
  title: string;
  slug: string;
  summary: string;
  author: Author;
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

export default function BlogCard({
  coverImage,
  title,
  slug,
  summary,
  author,
  tags,
  upvotes,
  downvotes,
  createdAt,
}: BlogCardProps) {
  const defaultAvatar = '/assets/images/defaultavatar.png';
  const defaultCover = '/assets/images/default-blog-cover.jpg';
  const [userProfileLink, setUserProfileLink] = useState(
    `/user/${author.userId}`
  );

  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(author.userId);
      setUserProfileLink(link);
    };
    loadProfileLink();
  }, [author.userId]);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
      <Link to={`/blog/${slug}`} className="h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative h-48 flex-shrink-0">
          <img
            src={coverImage || defaultCover}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultCover;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-white hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed line-clamp-2 overflow-hidden">
            {summary}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Votes and Author Info */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <img
                src={author.avatar || defaultAvatar}
                alt={author.nickName}
                className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultAvatar;
                }}
              />
              <div className="min-w-0 flex-grow">
                <Link
                  to={userProfileLink}
                  className="text-sm text-white hover:text-orange-500 transition-colors blog-card-truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  {author.nickName}
                </Link>
                <p className="text-xs text-gray-500">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Vote Stats */}
            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-1" title="Upvotes">
                <BiSolidUpvote className="text-[#6DFF8D]" size={16} />
                <span className="text-xs text-gray-400 font-medium px-1 bg-[#212734] rounded-sm">
                  {upvotes}
                </span>
              </div>
              <div className="flex items-center gap-1" title="Downvotes">
                <BiSolidDownvote className="text-[#FF6D6D]" size={16} />
                <span className="text-xs text-gray-400 font-medium px-1 bg-[#212734] rounded-sm">
                  {downvotes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
