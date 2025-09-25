import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatCard({
  value,
  label,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 ${className || ''}`}
    >
      {icon ? (
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <div className="text-white text-lg font-semibold">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-white text-lg font-semibold mb-1">{value}</div>
          <div className="text-gray-400 text-sm">{label}</div>
        </div>
      )}
    </div>
  );
}
