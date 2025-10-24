import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Reply, CreateReplyRequest } from '~/models/reply.types';
import {
  upvoteReply,
  downvoteReply,
  getReplyVoteStatus,
  getRepliesByAnswerId,
  createReplyToAnswer,
  editReply,
  deleteReply,
  checkReplyOwner,
} from '~/services/api/topic/reply.service';
import { ChevronUpIcon, ChevronDownIcon } from '~/libs/icons';
import LoadMoreReplies from './LoadMoreReplies';
import ReplyForm from './ReplyForm';
import { getUserProfileLink } from '~/utils/userUtils';

interface ReplyCardProps {
  reply: Reply;
  level?: number;
  answerId: string;
  onReply?: (replyId: string) => void;
  onEdit?: (replyId: string) => void;
  onDelete?: (replyId: string) => void;
  className?: string;
}

const ReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  level = 0,
  answerId,
  onReply,
  onEdit,
  onDelete,
  className = '',
}) => {
  const navigate = useNavigate();
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(reply.upvotedBy.length);
  const [downvoteCount, setDownvoteCount] = useState(reply.downvotedBy.length);
  const [children, setChildren] = useState<Reply[]>(reply.children || []);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(reply.hasMoreChildren || false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [userProfileLink, setUserProfileLink] = useState(
    `/user/${reply.user._id}`
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const indentClass = level > 0 ? `ml-${Math.min(level * 6, 24)}` : '';
  const maxNestingLevel = 3;

  /** ----------------- Vote ----------------- */
  const handleUpvote = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await upvoteReply(reply._id, token);
      if (userUpvoted) {
        setUserUpvoted(false);
        setUpvoteCount((c) => c - 1);
      } else {
        setUserUpvoted(true);
        setUpvoteCount((c) => c + 1);
        if (userDownvoted) {
          setUserDownvoted(false);
          setDownvoteCount((c) => c - 1);
        }
      }
    } catch (error) {
      console.error('Failed to upvote reply:', error);
    }
  };

  const handleDownvote = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await downvoteReply(reply._id, token);
      if (userDownvoted) {
        setUserDownvoted(false);
        setDownvoteCount((c) => c - 1);
      } else {
        setUserDownvoted(true);
        setDownvoteCount((c) => c + 1);
        if (userUpvoted) {
          setUserUpvoted(false);
          setUpvoteCount((c) => c - 1);
        }
      }
    } catch (error) {
      console.error('Failed to downvote reply:', error);
    }
  };

  /** ----------------- Load Children ----------------- */
  const loadMoreChildren = async () => {
    setIsLoading(true);
    try {
      const res = await getRepliesByAnswerId(
        reply.answer,
        page + 1,
        5,
        reply._id
      );
      if (res.success && res.data) {
        setChildren((prev) => [...prev, ...res.data.replies]);
        setHasMore(res.data.hasMore);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error('Failed to load child replies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** ----------------- Create Reply ----------------- */
  const handleCreateReply = async (request: CreateReplyRequest) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
      const response = await createReplyToAnswer(request, token);
      if (response.success && response.data) {
        setChildren((prev) => [response.data, ...prev]);
        setShowReplyForm(false);
      }
    } catch (error) {
      console.error('Failed to create reply:', error);
    }
  };

  /** ----------------- Edit Reply ----------------- */
  const handleEditSubmit = async (content: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await editReply(reply._id, content, token);
      if (res.success && res.data) {
        reply.content = res.data.content;
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to edit reply:', err);
    }
  };

  /** ----------------- Delete Reply ----------------- */
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await deleteReply(reply._id, token);
      if (res.success) {
        setShowDeleteModal(false);
        if (onDelete) onDelete(reply._id); // Báo cho cha
      }
    } catch (err) {
      console.error('Failed to delete reply:', err);
    }
  };

  /** ----------------- Handle Child Delete ----------------- */
  const handleChildDelete = (childId: string) => {
    setChildren((prev) => prev.filter((c) => c._id !== childId));
  };

  /** ----------------- Reply Button ----------------- */
  const handleReplyClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setShowReplyForm(!showReplyForm);
    if (onReply) onReply(reply._id);
  };

  /** ----------------- Effects ----------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchVoteStatus = async () => {
      try {
        const res = await getReplyVoteStatus(reply._id, token);
        if (res.success && res.data) {
          setUserUpvoted(res.data.upvoted);
          setUserDownvoted(res.data.downvoted);
        }
      } catch (err) {
        console.error('Failed to fetch vote status:', err);
      }
    };

    const fetchOwnerStatus = async () => {
      try {
        const res = await checkReplyOwner(reply._id, token);
        if (res.success && res.data) {
          setIsOwner(res.data.isOwner);
        }
      } catch (err) {
        console.error('Failed to check ownership:', err);
      }
    };

    fetchVoteStatus();
    fetchOwnerStatus();
  }, [reply._id]);

  useEffect(() => {
    const loadProfileLink = async () => {
      if (reply.user._id) {
        const link = await getUserProfileLink(reply.user._id);
        setUserProfileLink(link);
      }
    };
    loadProfileLink();
  }, [reply.user._id]);

  /** ----------------- Render ----------------- */
  return (
    <div className={`${indentClass} ${className}`}>
      <div className="border-l-2 border-gray-700 pl-4 mb-3">
        <div className="bg-gray-800 rounded-lg p-3 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {children.length > 0 && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronDownIcon
                    className={`w-3 h-3 transform transition-transform ${
                      isCollapsed ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>
              )}
              <img
                src={reply.user.avatarUrl || '/assets/images/defaultavatar.png'}
                alt={reply.user.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <Link
                to={userProfileLink}
                className="text-sm font-medium text-white hover:text-orange-500 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {reply.user.name}
              </Link>
              <span className="text-xs text-gray-400">
                {new Date(reply.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Vote */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`p-1 rounded ${
                  userUpvoted
                    ? 'text-green-400 bg-green-400/10'
                    : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                } transition-colors`}
              >
                <ChevronUpIcon className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-400 min-w-[20px] text-center">
                {upvoteCount - downvoteCount}
              </span>
              <button
                onClick={handleDownvote}
                className={`p-1 rounded ${
                  userDownvoted
                    ? 'text-red-400 bg-red-400/10'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                } transition-colors`}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="text-sm text-white mb-2 leading-relaxed">
            {isEditing ? (
              <ReplyForm
                answerId={answerId}
                parentId={reply._id}
                onSubmit={(req) => handleEditSubmit(req.content)}
                onCancel={() => setIsEditing(false)}
                initialContent={reply.content}
              />
            ) : (
              reply.content
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {level < maxNestingLevel && (
              <button
                onClick={handleReplyClick}
                className="hover:text-white hover:underline transition-colors"
              >
                Reply
              </button>
            )}
            {isOwner && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="hover:text-red-400 hover:underline transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Inline Reply Form */}
        {showReplyForm && (
          <div className="mt-2">
            <ReplyForm
              answerId={answerId}
              parentId={reply._id}
              onSubmit={handleCreateReply}
              onCancel={() => setShowReplyForm(false)}
              placeholder="Write a reply..."
              className="ml-2"
            />
          </div>
        )}

        {/* Nested Replies */}
        {children.length > 0 && !isCollapsed && (
          <div className="mt-2">
            {children.map((child) => (
              <ReplyCard
                key={child._id}
                reply={child}
                level={level + 1}
                answerId={answerId}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={handleChildDelete} // ✅ xử lý xóa con tại chỗ
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && !isCollapsed && (
          <LoadMoreReplies
            totalCount={reply.totalChildren || 0}
            currentCount={children.length}
            onLoadMore={loadMoreChildren}
            className="ml-6"
          />
        )}

        {/* Loading */}
        {isLoading && !isCollapsed && (
          <div className="ml-6 text-xs text-gray-400">Loading...</div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-50">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-80 flex flex-col items-center text-center">
            <p className="text-white mb-4">
              Are you sure you want to delete? <br /> This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-400 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyCard;
