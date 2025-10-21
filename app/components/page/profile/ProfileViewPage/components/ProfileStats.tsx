import React from 'react';
import StatCard from '~/components/ui/StatCard';

interface ProfileStatsProps {
  totalPosts: number;
  totalAnswers: number;
  totalBlogs: number;
  activeTab: 'posts' | 'answers' | 'blogs';
  onTabChange: (tab: 'posts' | 'answers' | 'blogs') => void;
}

export function ProfileStats({
  totalPosts,
  totalAnswers,
  totalBlogs,
  activeTab,
  onTabChange,
}: ProfileStatsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-lg font-semibold mb-4">Stats</h2>
      <div className="flex gap-4 flex-wrap">
        <div
          onClick={() => onTabChange('posts')}
          className={`cursor-pointer rounded-xl p-2 transition-all duration-200 
            ${
              activeTab === 'posts'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
        >
          <StatCard value={totalPosts.toString()} label="Questions" />
        </div>

        <div
          onClick={() => onTabChange('answers')}
          className={`cursor-pointer rounded-xl p-2 transition-all duration-200 
            ${
              activeTab === 'answers'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
        >
          <StatCard value={totalAnswers.toString()} label="Answers" />
        </div>

        <div
          onClick={() => onTabChange('blogs')}
          className={`cursor-pointer rounded-xl p-2 transition-all duration-200 
            ${
              activeTab === 'blogs'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
        >
          <StatCard value={totalBlogs.toString()} label="Blogs" />
        </div>
      </div>
    </div>
  );
}
