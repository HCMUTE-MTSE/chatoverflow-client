// ReplyList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Reply, CreateReplyRequest } from '~/models/reply.types';
import {
  getRepliesByAnswerId,
  createReplyToAnswer,
} from '~/services/api/topic/reply.service';
import ReplyCard from './ReplyCard';
import ReplyForm from './ReplyForm';
import LoadMoreReplies from './LoadMoreReplies';

interface ReplyListProps {
  answerId: string;
  className?: string;
}

interface ReplyWithNesting extends Reply {
  children: ReplyWithNesting[];
}

const ReplyList: React.FC<ReplyListProps> = ({ answerId, className = '' }) => {
  const [replies, setReplies] = useState<ReplyWithNesting[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // State cho root reply form
  const [showRootReplyForm, setShowRootReplyForm] = useState(false);

  const buildNestedReplies = (flatReplies: Reply[]): ReplyWithNesting[] => {
    const map = new Map<string, ReplyWithNesting>();
    const roots: ReplyWithNesting[] = [];

    flatReplies.forEach((r) => map.set(r._id, { ...r, children: [] }));
    flatReplies.forEach((r) => {
      const node = map.get(r._id)!;
      if (r.parent) {
        const parent = map.get(r.parent);
        if (parent) parent.children.push(node);
        else roots.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const fetchReplies = async (page: number = 1, append: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await getRepliesByAnswerId(answerId, page, 10);
      if (response.success && response.data) {
        const newReplies = response.data.replies.map((r) => ({
          ...r,
          children: [],
        }));
        const allReplies = append
          ? [...replies.flatMap(flattenReplies), ...newReplies]
          : newReplies;
        setReplies(buildNestedReplies(allReplies));
        setTotalCount(response.data.totalCount);
        setHasMore(response.data.hasMore);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const flattenReplies = (reply: ReplyWithNesting): Reply[] => [
    reply,
    ...reply.children.flatMap(flattenReplies),
  ];

  const handleCreateReply = async (request: CreateReplyRequest) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');

    const response = await createReplyToAnswer(request, token);
    if (response.success && response.data) {
      await fetchReplies(1, false);
      setShowRootReplyForm(false);
    }
  };

  const handleLoadMore = async () => {
    await fetchReplies(currentPage + 1, true);
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchReplies();
  }, [answerId]);

  const currentCount = replies.reduce(
    (count, r) => count + flattenReplies(r).length,
    0
  );

  // Recursive render function - simplified vì không cần quản lý reply form
  const renderReplies = (replyList: ReplyWithNesting[], level: number = 0) =>
    replyList.map((reply) => (
      <div key={reply._id} className="space-y-2">
        <ReplyCard reply={reply} level={level} answerId={answerId} />
        {reply.children.length > 0 && renderReplies(reply.children, level + 1)}
      </div>
    ));

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Root reply form trigger */}
      <button
        onClick={() => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }
          setShowRootReplyForm(!showRootReplyForm);
        }}
        className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
      >
        Add a reply
      </button>
      {showRootReplyForm && (
        <ReplyForm
          answerId={answerId}
          onSubmit={handleCreateReply}
          onCancel={() => setShowRootReplyForm(false)}
          placeholder="Write a reply to this answer..."
          className="mt-2"
        />
      )}

      {/* Nested replies */}
      {renderReplies(replies)}

      {/* Load more */}
      {hasMore && (
        <LoadMoreReplies
          totalCount={totalCount}
          currentCount={currentCount}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default ReplyList;
