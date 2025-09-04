import {
  QuestionCardLikeIcon,
  QuestionCardAnswerIcon,
  QuestionCardViewIcon,
} from "../../../../../libs/icons";
import { type User } from "../type";

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
    <div className="flex items-center text-xs mt-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <span className="font-medium text-white">{user.name}</span>
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
