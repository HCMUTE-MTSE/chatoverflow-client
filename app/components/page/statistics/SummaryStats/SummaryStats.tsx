import * as React from 'react';

export interface SummaryStatsProps {
  totalViews: number;
  totalVotes: number;
  joinDate: string;
  className?: string;
}

export default function SummaryStats({
  totalViews,
  totalVotes,
  joinDate,
  className = '',
}: SummaryStatsProps) {
  return (
    <div
      className={`p-6 bg-gray-800 rounded-lg border border-gray-700 ${className}`}
    >
      <h3 className="text-xl font-semibold text-white mb-6">
        Summary Statistics
      </h3>

      <div className="space-y-4">
        {/* Top row - Total Views and Total Votes side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mt-1">Total Views</div>
          </div>

          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {totalVotes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mt-1">Total Votes</div>
          </div>
        </div>

        {/* Bottom row - Member Since full width */}
        <div className="text-center p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-500/20">
          <div className="text-2xl font-bold text-purple-400">{joinDate}</div>
          <div className="text-sm text-gray-400 mt-1">Member Since</div>
        </div>
      </div>
    </div>
  );
}
