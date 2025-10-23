import * as React from 'react';
import { StatisticsCard } from '../StatisticsCard';
import { HistoryChart, type HistoryDataPoint } from '../HistoryChart';
import { SummaryStats } from '../SummaryStats';
import {
  QuestionIconStatic,
  BlogIconStatic,
  AnswerIconStatic,
  BlogIcon,
} from '~/libs/icons';

export interface UserStatisticsData {
  totalQuestions: number;
  totalBlogs: number;
  totalAnswers: number;
  totalViews: number;
  totalVotes: number;
  joinDate: string;
  historyData: HistoryDataPoint[];
}

export interface UserStatisticsProps {
  data: UserStatisticsData;
  className?: string;
}

export default function UserStatistics({
  data,
  className = '',
}: UserStatisticsProps) {
  const [filteredHistoryData, setFilteredHistoryData] = React.useState(
    data.historyData
  );

  // Handle year changes from HistoryChart
  const handleYearChange = (year: number) => {
    // In a real app, this would trigger an API call to fetch data for the selected year
    console.log(`Fetching data for year: ${year}`);

    // For now, we'll just use the existing data
    // In production, you would filter or fetch new data based on the selected year
    setFilteredHistoryData(data.historyData);
  };
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">Your Statistics</h1>
        <p className="text-gray-300">
          Track your progress and contributions to the community
        </p>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatisticsCard
          title="Total Questions"
          count={data.totalQuestions}
          icon={<QuestionIconStatic />}
          description="Questions you've asked"
          bgColor="bg-gradient-to-br from-amber-900/30 to-orange-900/30"
          iconColor="text-amber-500"
        />

        <StatisticsCard
          title="Total Blogs"
          count={data.totalBlogs}
          icon={<BlogIconStatic />}
          description="Blog posts you've written"
          bgColor="bg-gradient-to-br from-blue-900/30 to-indigo-900/30"
          iconColor="text-blue-500"
        />

        <StatisticsCard
          title="Total Answers"
          count={data.totalAnswers}
          icon={<AnswerIconStatic />}
          description="Answers you've provided"
          bgColor="bg-gradient-to-br from-green-900/30 to-emerald-900/30"
          iconColor="text-green-500"
        />
      </div>

      {/* Charts and Summary */}
      <div className="grid grid-cols-1 gap-6">
        <HistoryChart
          data={filteredHistoryData}
          onYearChange={handleYearChange}
          className="col-span-full"
        />

        <SummaryStats
          totalViews={data.totalViews}
          totalVotes={data.totalVotes}
          joinDate={data.joinDate}
        />
      </div>

      {/* Activity Breakdown */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Activity Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-lg font-bold text-orange-400">
              {Math.round(
                (data.totalQuestions /
                  (data.totalQuestions + data.totalAnswers + data.totalBlogs)) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-400 mt-1">Questions</div>
          </div>

          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-lg font-bold text-green-400">
              {Math.round(
                (data.totalAnswers /
                  (data.totalQuestions + data.totalAnswers + data.totalBlogs)) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-400 mt-1">Answers</div>
          </div>

          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-lg font-bold text-blue-400">
              {Math.round(
                (data.totalBlogs /
                  (data.totalQuestions + data.totalAnswers + data.totalBlogs)) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-400 mt-1">Blogs</div>
          </div>

          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-lg font-bold text-purple-400">
              {data.totalViews > 0
                ? Math.round((data.totalVotes / data.totalViews) * 100)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-400 mt-1">Vote Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
