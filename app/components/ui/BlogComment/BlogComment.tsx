import React, { useState, useEffect } from 'react';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  voteComment,
  updateBlogComment,
  deleteBlogComment,
} from '../../../services/api/blog/blog.service';
import { getUserProfileLink } from '../../../utils/userUtils';
import { parseJwt } from '../../../utils/jwt';
import ConfirmDialog from '../ConfirmDialog';
import type { Comment } from '../../../models/res/blog.response';

interface BlogCommentProps {
  comment: Comment;
  onCommentUpdate: (
    commentId: string,
    upvotes: number,
    downvotes: number,
    upvotedBy: string[],
    downvotedBy: string[]
  ) => void;
  onCommentDelete: (commentId: string) => void;
  onCommentEdit: (commentId: string, newContent: string) => void;
}

export default function BlogComment({
  comment,
  onCommentUpdate,
  onCommentDelete,
  onCommentEdit,
}: BlogCommentProps) {
  const [votingLoading, setVotingLoading] = useState(false);
  const [userProfileLink, setUserProfileLink] = useState(
    `/user/${comment.author.userId}`
  );
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Get current user ID from token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.sub) {
        setCurrentUserId(decoded.sub);
        // Check if current user is the comment author
        if (decoded.sub === comment.author.userId) {
          setIsOwner(true);
        }
      }
    }
  }, [comment.author.userId]);

  // Load user profile link
  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(comment.author.userId);
      setUserProfileLink(link);
    };
    loadProfileLink();
  }, [comment.author.userId]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (votingLoading) return;

    setVotingLoading(true);
    try {
      const response = await voteComment(comment.id, voteType);

      // Update local state based on vote action
      let newUpvotedBy = [...comment.upvotedBy];
      let newDownvotedBy = [...comment.downvotedBy];

      if (currentUserId) {
        if (voteType === 'upvote') {
          if (!newUpvotedBy.includes(currentUserId)) {
            newUpvotedBy.push(currentUserId);
          } else {
            newUpvotedBy = newUpvotedBy.filter((id) => id !== currentUserId);
          }
          newDownvotedBy = newDownvotedBy.filter((id) => id !== currentUserId);
        } else {
          if (!newDownvotedBy.includes(currentUserId)) {
            newDownvotedBy.push(currentUserId);
          } else {
            newDownvotedBy = newDownvotedBy.filter(
              (id) => id !== currentUserId
            );
          }
          newUpvotedBy = newUpvotedBy.filter((id) => id !== currentUserId);
        }
      }

      onCommentUpdate(
        comment.id,
        response.data.upvotes,
        response.data.downvotes,
        newUpvotedBy,
        newDownvotedBy
      );
    } catch (err) {
      console.error('Failed to vote on comment:', err);
      // You could add a toast notification here
    } finally {
      setVotingLoading(false);
    }
  };

  const hasUserUpvoted = currentUserId
    ? comment.upvotedBy.includes(currentUserId)
    : false;
  const hasUserDownvoted = currentUserId
    ? comment.downvotedBy.includes(currentUserId)
    : false;

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      alert('Comment content cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      await updateBlogComment(comment.id, editContent.trim());
      onCommentEdit(comment.id, editContent.trim());
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update comment:', err);
      alert('Failed to update comment. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBlogComment(comment.id);
      setShowDeleteDialog(false);
      onCommentDelete(comment.id);
    } catch (err) {
      console.error('Failed to delete comment:', err);
      alert('Failed to delete comment. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-[#1A1E2B] rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={comment.author.avatar || '/assets/images/defaultavatar.png'}
              alt={comment.author.nickName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <Link
                to={userProfileLink}
                className="font-medium text-white hover:text-orange-500 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {comment.author.nickName}
              </Link>
              <p className="text-gray-400 text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
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
                <BiSolidUpvote size={16} />
              ) : (
                <BiUpvote size={16} />
              )}
              <span className="px-2 py-1 bg-[#212734] rounded-sm font-medium">
                {comment.upvotes}
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
                <BiSolidDownvote size={16} />
              ) : (
                <BiDownvote size={16} />
              )}
              <span className="px-2 py-1 bg-[#212734] rounded-sm font-medium">
                {comment.downvotes}
              </span>
            </button>
          </div>
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-[#212734] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              rows={3}
              disabled={isSaving}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveEdit}
                disabled={isSaving || !editContent.trim()}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-300 leading-relaxed mb-3">
            {comment.content}
          </div>
        )}

        {/* Action Buttons (Edit/Delete) */}
        {isOwner && !isEditing && (
          <div className="flex gap-3 text-xs">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FiEdit size={14} />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
