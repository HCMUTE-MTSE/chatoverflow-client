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
import type { Comment } from '../../../models/res/blog.response';

interface BlogCommentProps {
  comment: Comment;
  onCommentUpdate: (
    commentId: string,
    upvotes: number,
    downvotes: number
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
      onCommentUpdate(
        comment.id,
        response.data.upvotes,
        response.data.downvotes
      );
    } catch (err) {
      console.error('Failed to vote on comment:', err);
      // You could add a toast notification here
    } finally {
      setVotingLoading(false);
    }
  };

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
            className="flex items-center gap-1 text-[#6DFF8D] hover:text-[#5EE67E] transition-colors disabled:opacity-50"
          >
            <BiSolidUpvote size={16} />
            <span className="px-1 bg-[#212734] rounded-sm">
              {comment.upvotes}
            </span>
          </button>
          <button
            onClick={() => handleVote('downvote')}
            disabled={votingLoading}
            className="flex items-center gap-1 text-[#FF6D6D] hover:text-[#FF5A5A] transition-colors disabled:opacity-50"
          >
            <BiSolidDownvote size={16} />
            <span className="px-1 bg-[#212734] rounded-sm">
              {comment.downvotes}
            </span>
          </button>
        </div>
      </div>

      <div className="text-gray-300 leading-relaxed">{comment.content}</div>
    </div>
  );
}
