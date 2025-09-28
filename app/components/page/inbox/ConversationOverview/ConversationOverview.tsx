import React from 'react';

import { HiOutlineChevronRight } from 'react-icons/hi2';

/* Include userID later  */
interface ConversationOverviewProps {
  targetName: string;
  targetAvatar?: string;
}

const ConversationOverview: React.FC<ConversationOverviewProps> = ({
  targetName,
  targetAvatar,
}) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
      {/* Avatar and name */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          {targetAvatar ? (
            <img
              src={targetAvatar}
              alt={targetName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="text-white text-sm font-medium">
              {targetName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <span className="text-gray-900 font-medium">{targetName}</span>
      </div>

      {/* Open conversation icon */}
      <HiOutlineChevronRight size={16} className="text-gray-400" />
    </div>
  );
};

export default ConversationOverview;
