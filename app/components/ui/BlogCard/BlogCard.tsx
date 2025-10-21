import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfileLink } from '../../../utils/userUtils';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { deleteBlog } from '../../../services/api/blog/blog.service';
import ConfirmDialog from '../ConfirmDialog';
import { parseJwt } from '../../../utils/jwt';

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
  showActions?: boolean;
  onDelete?: (slug: string) => void;
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
  showActions = true,
  onDelete,
}: BlogCardProps) {
  const navigate = useNavigate();
  const defaultAvatar = '/assets/images/defaultavatar.png';
  const defaultCover = '/assets/images/default-blog-cover.jpg';
  const [userProfileLink, setUserProfileLink] = useState(
    `/user/${author.userId}`
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(author.userId);
      setUserProfileLink(link);
    };
    loadProfileLink();
  }, [author.userId]);

  useEffect(() => {
    // Check if current user is the author (compare sub from token with author.userId)
    const token = localStorage.getItem('token');
    if (token && showActions) {
      const decoded = parseJwt(token);
      if (decoded && decoded.sub && decoded.sub === author.userId) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      setIsOwner(false);
    }
  }, [author.userId, showActions]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog/${slug}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteBlog(slug);
      setShowDeleteDialog(false);
      if (onDelete) {
        onDelete(slug);
      }
      // Reload page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
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
            {/* Edit/Delete icons - top right corner */}
            {showActions && isOwner && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={handleEdit}
                  className="p-2 bg-gray-900 bg-opacity-80 hover:bg-opacity-100 rounded-full text-blue-400 hover:text-blue-300 transition-all"
                  title="Edit blog"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-2 bg-gray-900 bg-opacity-80 hover:bg-opacity-100 rounded-full text-red-400 hover:text-red-300 transition-all"
                  title="Delete blog"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
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
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-gray-400">Votes:</span>
                <span className="text-xs font-medium text-[#6DFF8D] px-2 py-1 bg-[#212734] rounded-sm">
                  {upvotes}
                </span>
                <span className="text-xs font-medium text-[#FF6D6D] px-2 py-1 bg-[#212734] rounded-sm">
                  {downvotes}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
