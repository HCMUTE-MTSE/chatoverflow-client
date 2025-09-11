import React from 'react';
import { Link } from 'react-router-dom';

interface Author {
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
  createdAt: string;
}

export default function BlogCard({
  coverImage,
  title,
  slug,
  summary,
  author,
  createdAt,
}: BlogCardProps) {
  const defaultAvatar = '/assets/images/defaultavatar.png';
  const defaultCover = '/assets/images/default-blog-cover.jpg';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative h-48">
          <img
            src={coverImage || defaultCover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-white hover:text-blue-400 transition-colors">
            {title}
          </h2>
          <p className="text-gray-400 mb-4 line-clamp-2">{summary}</p>
          <div className="flex items-center">
            <img
              src={author.avatar || defaultAvatar}
              alt={author.nickName}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm text-white">{author.nickName}</p>
              <p className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
