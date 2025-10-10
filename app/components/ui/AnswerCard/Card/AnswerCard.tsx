import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AnswerHeader from '../AnswerHeader';
import AnswerContent from '../AnswerContent';
import AnswerFooter from '../AnswerFooter';
import { ReplyList } from '~/components/ui/Reply';
import type { Answer } from '~/components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import { getAnswerVoteStatus } from '~/services/api/topic/answer.service';

interface Props {
  answer: Answer;
  onReply?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onUpvote: () => void;
  onDownvote: () => void;
}

const AnswerCard: React.FC<Props> = ({
  answer,
  onReply,
  onDelete,
  onEdit,
  onUpvote,
  onDownvote,
}) => {
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(answer.upvotedBy.length);
  const [downvoteCount, setDownvoteCount] = useState(answer.downvotedBy.length);
  const [showReplies, setShowReplies] = useState(true);
  const navigate = useNavigate();

  const handleLocalUpvote = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
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
    onUpvote?.();
  };

  const handleLocalDownvote = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
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
    onDownvote?.();
  };

  const handleReplyClick = () => {
    setShowReplies((prev) => !prev);
    onReply?.();
  };

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    const fetchVoteStatus = async () => {
      try {
        const res = await getAnswerVoteStatus(answer._id, token);
        if (res.success && res.data) {
          setUserUpvoted(res.data.upvoted);
          setUserDownvoted(res.data.downvoted);
        }
      } catch (err) {
        console.error('Failed to fetch vote status', err);
      }
    };

    fetchVoteStatus();
  }, [answer._id]);

  return (
    <div className="mb-4 shadow flex flex-col w-full max-w-2xl mx-auto rounded-lg bg-[#1E1E2F]">
      <AnswerHeader
        user={{
          _id: answer.user._id,
          name: answer.user.name,
          avatarUrl: answer.user.avatarUrl,
        }}
        askedTime={new Date(answer.createdAt).toLocaleString()}
        upvotes={upvoteCount}
        downvotes={downvoteCount}
        onUpvote={handleLocalUpvote}
        onDownvote={handleLocalDownvote}
        userUpvoted={userUpvoted}
        userDownvoted={userDownvoted}
      />
      <AnswerContent content={answer.content} />
      <AnswerFooter
        onReply={handleReplyClick}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      {/* Replies Section */}
      {showReplies && (
        <div className="px-5 pb-4 border-t border-gray-600 mt-4 pt-4">
          <ReplyList answerId={answer._id} />
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
