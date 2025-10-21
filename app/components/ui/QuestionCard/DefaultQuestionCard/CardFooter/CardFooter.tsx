import {
  QuestionCardLikeIcon,
  QuestionCardAnswerIcon,
  QuestionCardViewIcon,
} from '../../../../../libs/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { type User } from '../type';
import { getUserProfileLink } from '../../../../../utils/userUtils';

interface CardFooterProps {
  user: User;
  time: string;
  votes: number;
  answers: number;
  views: number;
}

export default function CardFooter({
  user,
  time,
  votes,
  answers,
  views,
}: CardFooterProps) {
  const [profileLink, setProfileLink] = useState(
    user._id ? `/user/${user._id}` : '#'
  );

  useEffect(() => {
    if (user._id) {
      const loadProfileLink = async () => {
        const link = await getUserProfileLink(user._id!);
        setProfileLink(link);
      };
      loadProfileLink();
    }
  }, [user._id]);

  return (
    <div className="flex items-center text-xs mt-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      {user._id ? (
        <Link
          to={profileLink}
          className="font-medium text-white hover:text-orange-500 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {user.name}
        </Link>
      ) : (
        <span className="font-medium text-white">{user.name}</span>
      )}
      <span className="text-gray-400 mx-2">• asked {time}</span>

      <div className="ml-auto flex items-center gap-4 text-white text-xs">
        <span className="flex items-center gap-1">
          <QuestionCardLikeIcon /> {votes.toLocaleString()} Votes
        </span>
        <span className="flex items-center gap-1">
          <QuestionCardAnswerIcon /> {answers.toLocaleString()} Answers
        </span>
        <span className="flex items-center gap-1">
          <QuestionCardViewIcon /> {views.toLocaleString()} Views
        </span>
      </div>
    </div>
  );
}
