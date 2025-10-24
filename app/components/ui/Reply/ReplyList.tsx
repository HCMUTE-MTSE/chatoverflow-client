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

  // Hiện/ẩn form trả lời gốc
  const [showRootReplyForm, setShowRootReplyForm] = useState(false);

  /** ----------------- Xây cây reply ----------------- */
  const buildNestedReplies = (flatReplies: Reply[]): ReplyWithNesting[] => {
    const map = new Map<string, ReplyWithNesting>();
    const roots: ReplyWithNesting[] = [];

    // Tạo map để dễ tra cứu
    flatReplies.forEach((r) => map.set(r._id, { ...r, children: [] }));

    // Xây cấu trúc cây
    flatReplies.forEach((r) => {
      const node = map.get(r._id)!;
      if (r.parent) {
        const parent = map.get(r.parent);
        if (parent) parent.children.push(node);
        else roots.push(node); // Trường hợp parent không tồn tại
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  /** ----------------- Lấy danh sách reply ----------------- */
  const fetchReplies = async (page: number = 1, append: boolean = false) => {
    setIsLoading(true);
    try {
      const res = await getRepliesByAnswerId(answerId, page, 10);
      if (res.success && res.data) {
        const newReplies = res.data.replies;
        if (append) {
          // Nếu load thêm → nối danh sách cũ với mới
          setReplies((prev) =>
            buildNestedReplies([...flattenReplies(prev), ...newReplies])
          );
        } else {
          // Nếu load lần đầu → set mới hoàn toàn
          setReplies(buildNestedReplies(newReplies));
        }
        setTotalCount(res.data.totalCount);
        setHasMore(res.data.hasMore);
      }
    } catch (err) {
      console.error('Failed to fetch replies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** ----------------- Flatten replies (dạng cây → mảng phẳng) ----------------- */
  const flattenReplies = (replyList: ReplyWithNesting[]): Reply[] => {
    return replyList.flatMap((r) => [r, ...flattenReplies(r.children || [])]);
  };

  /** ----------------- Tạo reply mới ----------------- */
  const handleCreateReply = async (request: CreateReplyRequest) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await createReplyToAnswer(request, token);
      if (res.success && res.data) {
        // Reload toàn bộ danh sách
        await fetchReplies(1, false);
        setShowRootReplyForm(false);
      }
    } catch (err) {
      console.error('Failed to create reply:', err);
    }
  };

  /** ----------------- Load thêm ----------------- */
  const handleLoadMore = async () => {
    await fetchReplies(currentPage + 1, true);
    setCurrentPage((prev) => prev + 1);
  };

  /** ----------------- useEffect ----------------- */
  useEffect(() => {
    fetchReplies();
  }, [answerId]);

  /** ----------------- Xóa reply đệ quy ----------------- */
  const removeReplyById = (
    list: ReplyWithNesting[],
    id: string
  ): ReplyWithNesting[] => {
    return list
      .filter((r) => r._id !== id) // Bỏ thằng bị xóa
      .map((r) => ({
        ...r,
        children: removeReplyById(r.children || [], id), // Duyệt con
      }));
  };

  /** ----------------- Callback khi xóa reply ----------------- */
  const handleDeleteReply = (deletedId: string) => {
    setReplies((prev) => removeReplyById(prev, deletedId));
  };

  /** ----------------- Render replies ----------------- */
  const renderReplies = (replyList: ReplyWithNesting[], level: number = 0) =>
    replyList.map((reply) => (
      <div key={reply._id} className="space-y-2">
        <ReplyCard
          reply={reply}
          level={level}
          answerId={answerId}
          onDelete={handleDeleteReply} // ✅ Quan trọng
        />
        {reply.children.length > 0 && renderReplies(reply.children, level + 1)}
      </div>
    ));

  const currentCount = flattenReplies(replies).length;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Nút hiển thị form trả lời gốc */}
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

      {/* Danh sách replies */}
      {renderReplies(replies)}

      {/* Nút Load More */}
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
