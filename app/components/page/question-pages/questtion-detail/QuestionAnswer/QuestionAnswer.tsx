import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerCard from '~/components/ui/AnswerCard/Card';
import QuestionEditor from '~/components/ui/AskEditQuestion/QuestionEditor';
import SortDropdown from '~/components/ui/Communities/SortDropdown/SortDropDown';
import { type JSONContent } from '@tiptap/react';
import {
  postAnswer,
  upvoteAnswer,
  downvoteAnswer,
  checkAnswerOwner,
  deleteAnswer,
  editAnswer,
  getAnswersByQuestionId,
} from '~/services/api/topic/answer.service';
import LoadMoreButton from '~/components/ui/LoadMoreButton/LoadMoreButton';

// Sort options
const SORT_OPTIONS = {
  HIGHEST_UPVOTES: 'highest_upvotes',
  NEWEST: 'newest',
  OLDEST: 'oldest',
  MOST_ACTIVE: 'most_active',
} as const;

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.HIGHEST_UPVOTES]: 'Highest Upvotes',
  [SORT_OPTIONS.NEWEST]: 'Newest',
  [SORT_OPTIONS.OLDEST]: 'Oldest',
  [SORT_OPTIONS.MOST_ACTIVE]: 'Most Active',
};

// Sort options for dropdown
const SORT_DROPDOWN_OPTIONS = [
  { label: 'Highest Upvotes', value: SORT_OPTIONS.HIGHEST_UPVOTES },
  { label: 'Newest', value: SORT_OPTIONS.NEWEST },
  { label: 'Oldest', value: SORT_OPTIONS.OLDEST },
  { label: 'Most Active', value: SORT_OPTIONS.MOST_ACTIVE },
];

export interface Answer {
  _id: string;
  content: string;
  question: string;
  user: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  upvotedBy: string[];
  downvotedBy: string[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionAnswerProps {
  questionId: string;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  loading?: boolean;
  totalAnswers: number;
  setTotalAnswers: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionAnswer({
  questionId,
  answers,
  setAnswers,
  loading = false,
  totalAnswers,
  setTotalAnswers,
}: QuestionAnswerProps) {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: 'doc',
    content: [],
  });

  // Sorting
  const [currentSort, setCurrentSort] = useState<SortOption>(
    SORT_OPTIONS.NEWEST
  );
  const [sortLoading, setSortLoading] = useState(false);

  const [owners, setOwners] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<{
    type: 'confirm' | 'success' | null;
    open: boolean;
    answerId?: string;
    message?: string;
  }>({ type: null, open: false });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<JSONContent>({
    type: 'doc',
    content: [],
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Fetch owners
  useEffect(() => {
    if (!token || answers.length === 0) return;
    const fetchOwners = async () => {
      const promises = answers.map((ans) =>
        checkAnswerOwner(ans._id, token)
          .then((res) => ({ id: ans._id, isOwner: res.data?.isOwner || false }))
          .catch(() => ({ id: ans._id, isOwner: false }))
      );
      const results = await Promise.all(promises);
      const ownerMap: Record<string, boolean> = {};
      results.forEach((r) => (ownerMap[r.id] = r.isOwner));
      setOwners(ownerMap);
    };
    fetchOwners();
  }, [answers, token]);

  // Utility
  const isEditorEmpty = (content: JSONContent) =>
    !content?.content?.some(
      (node) =>
        node.type === 'paragraph' &&
        node.content?.some((t) => t.text?.trim() !== '')
    );

  // Post answer
  const handleSendAnswer = async () => {
    if (!token) return alert('You must login to post an answer');
    if (isEditorEmpty(editorContent))
      return alert('Answer content cannot be empty');
    try {
      const res = await postAnswer(
        questionId,
        JSON.stringify(editorContent),
        token
      );
      if (res.success && res.data) {
        setAnswers((prev) => [res.data, ...prev]);
        setTotalAnswers((prev) => prev + 1);
        setEditorContent({ type: 'doc', content: [] });
        setShowEditor(false);
      } else alert(res.message);
    } catch (err) {
      console.error(err);
      alert('Failed to post answer');
    }
  };

  // 🚀 Handle answer update from AnswerCard (upvote/downvote)
  const handleAnswerUpdate = (updatedAnswer: Answer) => {
    setAnswers((prev) =>
      prev.map((ans) => (ans._id === updatedAnswer._id ? updatedAnswer : ans))
    );
  };

  // Delete answer
  const handleDelete = (answerId: string) =>
    setModal({
      open: true,
      type: 'confirm',
      answerId,
      message: 'Are you sure you want to delete this answer?',
    });

  const confirmDelete = async () => {
    if (!modal.answerId || !token) return;
    try {
      const res = await deleteAnswer(modal.answerId, token);
      if (res.success) {
        setAnswers((prev) => prev.filter((ans) => ans._id !== modal.answerId));
        setOwners((prev) => {
          const newOwners = { ...prev };
          delete newOwners[modal.answerId!];
          return newOwners;
        });
        setTotalAnswers((prev) => prev - 1);
        setModal({
          open: true,
          type: 'success',
          message: 'Deleted answer successfully',
        });
      } else {
        setModal({
          open: true,
          type: 'success',
          message: res.message || 'Failed to delete answer',
        });
      }
    } catch (err) {
      setModal({
        open: true,
        type: 'success',
        message: 'Failed to delete answer',
      });
    }
  };

  // Edit answer
  const handleEdit = (ans: Answer) => {
    setEditingId(ans._id);
    try {
      setEditingContent(JSON.parse(ans.content));
    } catch {
      setEditingContent({ type: 'doc', content: [] });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId || !token) return;
    if (isEditorEmpty(editingContent)) return alert('Content cannot be empty');
    try {
      const res = await editAnswer(
        editingId,
        JSON.stringify(editingContent),
        token
      );
      if (res.success && res.data) {
        setAnswers((prev) =>
          prev.map((ans) =>
            ans._id === editingId
              ? {
                  ...ans,
                  content: res.data.content,
                  updatedAt: res.data.updatedAt,
                }
              : ans
          )
        );
        setEditingId(null);
        setEditingContent({ type: 'doc', content: [] });
      } else alert(res.message);
    } catch (err) {
      console.error(err);
      alert('Failed to update answer');
    }
  };

  // Sort answers
  const handleSortChange = async (newSort: SortOption) => {
    if (newSort === currentSort) return;
    setSortLoading(true);
    setCurrentSort(newSort);
    setPage(1);
    setHasMore(true);
    try {
      const res = await getAnswersByQuestionId(questionId, newSort, 1, limit);
      if (res.success && res.data) {
        setAnswers(res.data);
        setHasMore(res.pagination?.nextUrl !== null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSortLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadMoreLoading || !hasMore) return;
    setLoadMoreLoading(true);
    try {
      const nextPage = page + 1;
      const res = await getAnswersByQuestionId(
        questionId,
        currentSort,
        nextPage,
        limit
      );
      if (res.success && res.data.length > 0) {
        setAnswers((prev) => [...prev, ...res.data]);
        setPage(nextPage);
        setHasMore(res.pagination?.nextUrl !== null);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  if (loading) return <div className="text-gray-400">Loading answers...</div>;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-normal text-[#FF9900]">
          {totalAnswers || answers.length} Answers
        </h3>

        {/* Dropdown */}
        <SortDropdown
          sort={currentSort}
          onChange={(val: string) => handleSortChange(val as SortOption)}
          options={SORT_DROPDOWN_OPTIONS}
        />
      </div>

      {/* Add Answer */}
      <button
        className="bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#FFB800] transition mb-4"
        onClick={() => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }
          setShowEditor((v) => !v);
        }}
      >
        {showEditor ? 'Close Answer' : 'Add Answer'}
      </button>

      {showEditor && (
        <div className="mb-6 p-4 bg-[#23262F] rounded-lg">
          <QuestionEditor
            title="Your Answer"
            content={editorContent}
            onChange={setEditorContent}
          />
          <div className="mt-2 flex gap-2">
            <button
              className="bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#FFB800] transition"
              onClick={handleSendAnswer}
            >
              Send Answer
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setShowEditor(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal.open && modal.type && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-[#181A20] rounded-lg shadow-2xl p-6 min-w-[320px] text-center text-white border border-[#23262F]">
              <div className="text-lg font-semibold mb-4">{modal.message}</div>
              {modal.type === 'confirm' ? (
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setModal({ open: false, type: null })}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => setModal({ open: false, type: null })}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Answers */}
      {answers.length === 0 ? (
        <div className="text-gray-400">No answers yet.</div>
      ) : (
        <>
          {answers.map((ans, idx) => (
            <div key={ans._id} className="mb-6">
              {editingId === ans._id ? (
                <div className="p-4 bg-[#23262F] rounded-lg">
                  <QuestionEditor
                    title="Edit Answer"
                    content={editingContent}
                    onChange={setEditingContent}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      className="bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#FFB800] transition"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <AnswerCard
                  answer={ans}
                  isOwner={owners[ans._id]}
                  onAnswerUpdate={handleAnswerUpdate}
                  onEdit={owners[ans._id] ? () => handleEdit(ans) : undefined}
                  onDelete={
                    owners[ans._id] ? () => handleDelete(ans._id) : undefined
                  }
                  onClick={undefined}
                />
              )}
            </div>
          ))}

          {/* Load More Button */}
          {hasMore && (
            <LoadMoreButton
              onClick={handleLoadMore}
              disabled={!hasMore}
              loading={loadMoreLoading}
            />
          )}
        </>
      )}
    </div>
  );
}
