import React, { useState, useEffect } from 'react';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { voteComment } from '../../../services/api/blog/blog.service';
import { getUserProfileLink } from '../../../utils/userUtils';
import { parseJwt } from '../../../utils/jwt';
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
}

export default function BlogComment({
  comment,
  onCommentUpdate,
}: BlogCommentProps) {
  const [votingLoading, setVotingLoading] = useState(false);
  const [userProfileLink, setUserProfileLink] = useState(
    `/user/${comment.author.userId}`
  );
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

  return (
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

      <div className="text-gray-300 leading-relaxed">{comment.content}</div>
    </div>
  );
}
