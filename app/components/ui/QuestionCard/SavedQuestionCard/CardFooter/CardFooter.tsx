import React from 'react';
import {
  QuestionCardLikeIcon,
  QuestionCardAnswerIcon,
  QuestionCardViewIcon,
} from '../../../../../libs/icons';
import type { User } from '../type';

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
  return (
    <div className="flex items-center gap-2 text-xs mt-3 flex-wrap">
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
      <span className="font-medium text-white">{user.name}</span>
      <span className="text-gray-400">• asked {time}</span>
      <div className="ml-auto flex items-center gap-4 text-white">
        <span className="flex items-center gap-1">
          <QuestionCardLikeIcon /> {votes.toLocaleString()} Votes
        </span>
        <span className="flex items-center gap-1">
          <QuestionCardAnswerIcon /> {answers} Answers
        </span>
        <span className="flex items-center gap-1">
          <QuestionCardViewIcon /> {views.toLocaleString()} Views
        </span>
      </div>
    </div>
  );
}
