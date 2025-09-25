import React, { useState } from 'react';
import type { CreateReplyRequest } from '~/models/reply.types';

interface ReplyFormProps {
  answerId: string;
  parentId?: string;
  onSubmit: (request: CreateReplyRequest) => Promise<void>;
  onCancel: () => void;
  placeholder?: string;
  className?: string;
  initialContent?: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  answerId,
  parentId,
  onSubmit,
  onCancel,
  placeholder = 'Write a reply...',
  className = '',
  initialContent = '',
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  React.useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content: content.trim(),
        answerId,
        parentId,
      });
      setContent('');
      onCancel();
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 border border-gray-600 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[80px] p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {content.length}/1000 characters
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !content.trim() || isSubmitting || content.length > 1000
              }
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Reply'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
