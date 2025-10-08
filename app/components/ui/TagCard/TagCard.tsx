import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TagCardProps {
  name: string;
  description: string;
  questionCount: number;
  className?: string;
}

export default function TagCard({
  name,
  description,
  questionCount,
  className,
}: TagCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col gap-4 p-8 bg-gray-900/90 backdrop-blur-[150px] border border-gray-800/50 rounded-xl hover:border-gray-700/50 transition-all duration-300 cursor-pointer min-w-[260px] ${className || ''}`}
      onClick={() => navigate(`/tags/${name}/questions`)}
    >
      {/* Profile section */}
      <div className="flex flex-col gap-4">
        {/* Tag name badge */}
        <div className="bg-gray-800/80 rounded px-5 py-2 w-fit">
          <span className="text-white font-semibold text-base">{name}</span>
        </div>
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed w-[200px] line-clamp-3">
          {description}
        </p>
      </div>

      {/* Stats section */}
      <div className="flex items-center gap-3">
        <span
          className="font-semibold text-sm"
          style={{
            background: 'linear-gradient(129deg, #ff7000 0%, #e2995f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {questionCount.toLocaleString()}+
        </span>
        <span className="text-gray-400 font-medium text-sm">Questions</span>
      </div>
    </div>
  );
}
