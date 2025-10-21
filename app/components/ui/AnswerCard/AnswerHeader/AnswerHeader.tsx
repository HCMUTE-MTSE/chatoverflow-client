import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { UpVoteIcon, DownVoteIcon } from '~/libs/icons';

import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';
import { getUserProfileLink } from '~/utils/userUtils';

interface AnswerHeaderProps {
  user: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  askedTime: string;
  upvotes: number;
  downvotes: number;
  onUpvote?: () => void;
  onDownvote?: () => void;
  userUpvoted?: boolean;
  userDownvoted?: boolean;
}

const AnswerHeader: React.FC<AnswerHeaderProps> = ({
  user,
  askedTime,
  upvotes,
  downvotes,
  onUpvote,
  onDownvote,
  userUpvoted = false,
  userDownvoted = false,
}) => {
  const [profileLink, setProfileLink] = useState(`/user/${user._id}`);

  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(user._id);
      setProfileLink(link);
    };
    loadProfileLink();
  }, [user._id]);

  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <div className="flex items-center gap-3">
        <Link
          to={profileLink}
          className="flex items-center gap-2 hover:underline focus:outline-none cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={user.avatarUrl || '/assets/images/defaultavatar.png'}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-gray-700 shadow"
          />
          <span className="text-base font-semibold text-white">
            {user.name}
          </span>
        </Link>
        <span className="text-xs text-[#7B8EC8] ml-2">
          • answered {askedTime}
        </span>
      </div>

      <div className="flex items-center gap-2 select-none">
        {onUpvote && (
          <>
            <button
              onClick={onUpvote}
              className={`w-5 h-5 flex items-center justify-center hover:bg-[#23263a] transition cursor-pointer`}
            >
              {userUpvoted ? <BiSolidUpvote color="green" /> : <UpVoteIcon />}
            </button>
            <span className="w-5 h-5 flex items-center justify-center rounded-xs bg-[#23263a] text-white text-xs">
              {upvotes}
            </span>
          </>
        )}

        {onDownvote && (
          <>
            <button
              onClick={onDownvote}
              className="w-5 h-5 flex items-center justify-center hover:bg-[#23263a] transition cursor-pointer"
            >
              {userDownvoted ? (
                <BiSolidDownvote color="red" />
              ) : (
                <DownVoteIcon />
              )}
            </button>
            <span className="w-5 h-5 flex items-center justify-center rounded-xs bg-[#23263a] text-white text-xs">
              {downvotes}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerHeader;
