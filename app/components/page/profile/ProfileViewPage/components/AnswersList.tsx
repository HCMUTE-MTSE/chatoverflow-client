import React from 'react';
import AnswerCard from '~/components/ui/AnswerCard/Card';
import QuestionEditor from '~/components/ui/AskEditQuestion/QuestionEditor';
import LoadMoreButton from '~/components/ui/LoadMoreButton/LoadMoreButton';
import type { Answer } from '../../../question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import { type JSONContent } from '@tiptap/react';

interface AnswersListProps {
  answers: Answer[];
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  } | null;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  editingId?: string | null;
  editingContent?: JSONContent;
  onEdit?: (answer: Answer) => void;
  onDelete?: (answerId: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onContentChange?: (content: JSONContent) => void;
  onClick: (questionId: string) => void;
  onLoadMore: () => void;
}

export function AnswersList({
  answers,
  pagination,
  loading,
  loadingMore,
  hasMore,
  editingId,
  editingContent,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onContentChange,
  onClick,
  onLoadMore,
}: AnswersListProps) {
  return (
    <div className="space-y-4">
      {loading && answers.length === 0 ? (
        <div className="text-gray-400 text-center py-8">Loading answers...</div>
      ) : answers.length > 0 ? (
        <>
          {answers.map((answer) => (
            <div key={answer._id} className="mb-6">
              {editingId === answer._id ? (
                <div className="p-4 bg-[#23262F] rounded-lg">
                  <QuestionEditor
                    title="Edit Answer"
                    content={editingContent || { type: 'doc', content: [] }}
                    onChange={onContentChange || (() => {})}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      className="bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#FFB800] transition"
                      onClick={onSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <AnswerCard
                  answer={answer}
                  isOwner={true}
                  {...(onEdit && { onEdit: () => onEdit(answer) })}
                  {...(onDelete && { onDelete: () => onDelete(answer._id) })}
                  showUpvoteButton={false}
                  showDownvoteButton={false}
                  showReplyButton={false}
                  onClick={() => onClick(answer.question)}
                />
              )}
            </div>
          ))}

          {hasMore && (
            <div className="flex flex-col items-center gap-2 pt-6">
              <LoadMoreButton
                onClick={onLoadMore}
                disabled={false}
                loading={loadingMore}
              />
              {pagination && (
                <p className="text-gray-400 text-sm">
                  Showing {answers.length} answers (Page {pagination.page})
                </p>
              )}
            </div>
          )}

          {!hasMore && (
            <div className="text-gray-500 text-center py-4">
              All answers loaded
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400 text-center py-8">No answers yet</div>
      )}
    </div>
  );
}
