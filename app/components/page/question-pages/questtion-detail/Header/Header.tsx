import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  upvoteQuestion,
  downvoteQuestion,
  voteStatus,
} from '~/services/api/topic/question.service';
import { getUserProfileLink } from '~/utils/userUtils';

interface HeaderProps {
  questionId: string;
  ownerId: string;
  ownerAvatar: string;
  ownerName: string;
  totalUpvote: number;
  totalDownvote: number;
}

export default function Header({
  questionId,
  ownerId,
  ownerAvatar,
  ownerName,
  totalUpvote,
  totalDownvote,
}: HeaderProps) {
  const navigate = useNavigate();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(totalUpvote);
  const [downvoteCount, setDownvoteCount] = useState(totalDownvote);
  const [userProfileLink, setUserProfileLink] = useState(`/user/${ownerId}`);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchVoteStatus = async () => {
        const status = await voteStatus(questionId, token);
        if (status) {
          setUpvoted(status.upvoted);
          setDownvoted(status.downvoted);
        }
      };
      fetchVoteStatus();
    }
  }, [token]);

  // Load user profile link
  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(ownerId);
      setUserProfileLink(link);
    };
    loadProfileLink();
  }, [ownerId]);

  const handleUpvote = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    const result = await upvoteQuestion(questionId, token);
    if (result) {
      setUpvoted(!upvoted);
      setDownvoted(false);
      setUpvoteCount(result.upvotes);
      setDownvoteCount(result.downvotes);
    }
  };

  const handleDownvote = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    const result = await downvoteQuestion(questionId, token);
    if (result) {
      setDownvoted(!downvoted);
      setUpvoted(false);
      setUpvoteCount(result.upvotes);
      setDownvoteCount(result.downvotes);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <Link
          to={userProfileLink}
          className="font-medium text-white hover:text-orange-500 transition-colors header__owner-link"
          onClick={(e) => e.stopPropagation()}
        >
          {ownerName}
        </Link>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-1 px-2 py-1 rounded-sm ${
            upvoted
              ? 'text-[#6DFF8D] bg-[#212734]'
              : 'text-[#6DFF8D] hover:bg-[#212734]'
          } transition-colors`}
        >
          {upvoted ? <BiSolidUpvote size={16} /> : <BiUpvote size={16} />}
          <span>{upvoteCount}</span>
        </button>

        <button
          onClick={handleDownvote}
          className={`flex items-center gap-1 px-2 py-1 rounded-sm ${
            downvoted
              ? 'text-[#FF6D6D] bg-[#212734]'
              : 'text-[#FF6D6D] hover:bg-[#212734]'
          } transition-colors`}
        >
          {downvoted ? <BiSolidDownvote size={16} /> : <BiDownvote size={16} />}
          <span>{downvoteCount}</span>
        </button>
      </div>
    </div>
  );
}
