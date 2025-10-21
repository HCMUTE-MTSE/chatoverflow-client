import React, { useState, useMemo } from 'react';
import AnswerCard from '~/components/ui/AnswerCard/Card';
import QuestionEditor from '~/components/ui/AskEditQuestion/QuestionEditor';
import type { Answer } from '../../../question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import { type JSONContent } from '@tiptap/react';

interface AnswersListProps {
  answers: Answer[];
  editingId: string | null;
  editingContent: JSONContent;
  onEdit: (answer: Answer) => void;
  onDelete: (answerId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onContentChange: (content: JSONContent) => void;
  onClick: (questionId: string) => void;
}

const ANSWERS_PER_PAGE = 10;

export function AnswersList({
  answers,
  editingId,
  editingContent,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onContentChange,
  onClick,
}: AnswersListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán answers hiển thị theo trang
  const paginatedAnswers = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * ANSWERS_PER_PAGE;
    return answers.slice(startIndex, endIndex);
  }, [answers, currentPage]);

  const hasMore = currentPage * ANSWERS_PER_PAGE < answers.length;
  const totalPages = Math.ceil(answers.length / ANSWERS_PER_PAGE);

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Reset về trang 1 khi answers thay đổi (sau khi xóa)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [answers.length]);

  return (
    <div className="space-y-4">
      {paginatedAnswers && paginatedAnswers.length > 0 ? (
        paginatedAnswers.map((answer) => (
          <div key={answer._id} className="mb-6">
            {editingId === answer._id ? (
              <div className="p-4 bg-[#23262F] rounded-lg">
                <QuestionEditor
                  title="Edit Answer"
                  content={editingContent}
                  onChange={onContentChange}
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
                onEdit={() => onEdit(answer)}
                onDelete={() => onDelete(answer._id)}
                showUpvoteButton={false}
                showDownvoteButton={false}
                showReplyButton={false}
                onClick={() => onClick(answer.question)}
              />
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-center py-8">No answers yet</div>
      )}

      {hasMore && (
        <div className="flex flex-col items-center gap-2 pt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors"
          >
            Load More
          </button>
          <p className="text-gray-400 text-sm">
            Showing {paginatedAnswers.length} of {answers.length} answers (Page{' '}
            {currentPage}/{totalPages})
          </p>
        </div>
      )}

      {!hasMore && answers.length > 0 && (
        <div className="text-gray-500 text-center py-4">All answers loaded</div>
      )}
    </div>
  );
}
