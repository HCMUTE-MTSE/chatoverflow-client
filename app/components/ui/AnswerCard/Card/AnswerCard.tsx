import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AnswerHeader from '../AnswerHeader';
import AnswerContent from '../AnswerContent';
import AnswerFooter from '../AnswerFooter';
import { ReplyList } from '~/components/ui/Reply';
import type { Answer } from '~/components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import {
  getAnswerVoteStatus,
  upvoteAnswer,
  downvoteAnswer,
} from '~/services/api/topic/answer.service';

interface Props {
  answer: Answer;
  isOwner?: boolean;
  onAnswerUpdate?: (updatedAnswer: Answer) => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onClick?: () => void;
  showReplyButton?: boolean;
  showUpvoteButton?: boolean;
  showDownvoteButton?: boolean;
}

const AnswerCard: React.FC<Props> = ({
  answer,
  isOwner = false,
  onAnswerUpdate,
  onDelete,
  onEdit,
  onClick = undefined,
  showReplyButton = true,
  showUpvoteButton = true,
  showDownvoteButton = true,
}) => {
  const [userInfo, setUserInfo] = useState(answer.user);
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [userDownvoted, setUserDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(answer.upvotedBy.length);
  const [downvoteCount, setDownvoteCount] = useState(answer.downvotedBy.length);
  const [showReplies, setShowReplies] = useState(true);
  const navigate = useNavigate();
  // 🚀 Sync showReplies with showReplyButton prop
  useEffect(() => {
    if (!showReplyButton) {
      setShowReplies(false);
    }
  }, [showReplyButton]);

  // 🚀 Handle upvote with API call
  const handleLocalUpvote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await upvoteAnswer(answer._id, token);
      if (res.success && res.data) {
        // Update local state
        setUserUpvoted(res.data.userUpvoted);
        setUserDownvoted(res.data.userDownvoted);

        // Update counts based on response
        const newUpvoteCount = res.data.userUpvoted
          ? upvoteCount + 1
          : upvoteCount - 1;
        const newDownvoteCount = res.data.userDownvoted
          ? downvoteCount
          : userDownvoted
          ? downvoteCount - 1
          : downvoteCount;

        setUpvoteCount(newUpvoteCount);
        setDownvoteCount(newDownvoteCount);

        // Notify parent component
        onAnswerUpdate?.({
          ...answer,
          upvotedBy: res.data.userUpvoted
            ? [...answer.upvotedBy, token]
            : answer.upvotedBy.filter((u) => u !== token),
          downvotedBy: res.data.userDownvoted
            ? answer.downvotedBy.filter((u) => u !== token)
            : answer.downvotedBy,
        });
      }
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  // 🚀 Handle downvote with API call
  const handleLocalDownvote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await downvoteAnswer(answer._id, token);
      if (res.success && res.data) {
        // Update local state
        setUserUpvoted(res.data.userUpvoted);
        setUserDownvoted(res.data.userDownvoted);

        // Update counts based on response
        const newDownvoteCount = res.data.userDownvoted
          ? downvoteCount + 1
          : downvoteCount - 1;
        const newUpvoteCount = res.data.userUpvoted
          ? upvoteCount
          : userUpvoted
          ? upvoteCount - 1
          : upvoteCount;

        setUpvoteCount(newUpvoteCount);
        setDownvoteCount(newDownvoteCount);

        // Notify parent component
        onAnswerUpdate?.({
          ...answer,
          downvotedBy: res.data.userDownvoted
            ? [...answer.downvotedBy, token]
            : answer.downvotedBy.filter((u) => u !== token),
          upvotedBy: res.data.userUpvoted
            ? answer.upvotedBy.filter((u) => u !== token)
            : answer.upvotedBy,
        });
      }
    } catch (err) {
      console.error('Failed to downvote:', err);
    }
  };

  const handleReplyClick = () => {
    setShowReplies((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click when clicking on buttons or interactive elements
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]')
    ) {
      return;
    }
    onClick?.();
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
    <div
      onClick={handleClick}
      className="hover:shadow cursor-pointer  mb-4 shadow flex flex-col w-full max-w-2xl mx-auto rounded-lg bg-[#1E1E2F]"
    >
      <AnswerHeader
        user={{
          _id: answer.user._id,
          name: answer.user.name,
          avatarUrl: answer.user.avatar,
        }}
        askedTime={new Date(answer.createdAt).toLocaleString()}
        upvotes={upvoteCount}
        downvotes={downvoteCount}
        onUpvote={showUpvoteButton ? handleLocalUpvote : undefined}
        onDownvote={showDownvoteButton ? handleLocalDownvote : undefined}
        userUpvoted={userUpvoted}
        userDownvoted={userDownvoted}
      />
      <AnswerContent content={answer.content} />
      <AnswerFooter
        onReply={showReplyButton ? handleReplyClick : undefined}
        onDelete={isOwner ? onDelete : undefined}
        onEdit={isOwner ? onEdit : undefined}
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
