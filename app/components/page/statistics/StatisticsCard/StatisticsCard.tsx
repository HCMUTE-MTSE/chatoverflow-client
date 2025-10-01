import * as React from 'react';
import { useNavigate } from 'react-router';

export interface StatisticsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  description: string;
  clickable?: boolean;
  navigateTo?: string;
  bgColor?: string;
  iconColor?: string;
}

export default function StatisticsCard({
  title,
  count,
  icon,
  description,
  clickable = false,
  navigateTo,
  bgColor = 'bg-gray-800',
  iconColor = 'text-orange-500',
}: StatisticsCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable && navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border border-gray-700 ${bgColor} ${
        clickable ? 'cursor-pointer hover:bg-gray-750 transition-colors' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {count.toLocaleString()}
          </p>
          <p className="text-sm text-gray-300 mt-2">{description}</p>
        </div>
        <div className={`text-4xl ${iconColor}`}>{icon}</div>
      </div>
      {clickable && (
        <div className="mt-4 flex items-center text-sm text-orange-400">
          <span>Click to view details</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
