import React from 'react';

interface AnswerFooterProps {
  onReply?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const AnswerFooter: React.FC<AnswerFooterProps> = ({
  onReply,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex items-center gap-4 px-5 pb-4 text-sm text-[#7B8EC8]">
      {onReply && (
        <button onClick={onReply} className="hover:underline cursor-pointer">
          Reply
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="hover:underline cursor-pointer">
          Delete
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} className="hover:underline cursor-pointer">
          Edit
        </button>
      )}
    </div>
  );
};

export default AnswerFooter;
