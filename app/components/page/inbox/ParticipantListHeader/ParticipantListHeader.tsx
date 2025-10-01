import React from 'react';
import { IoSearch } from 'react-icons/io5';

const ParticipantListHeader: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Start a new chat
      </h3>
      <div className="relative">
        <IoSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          disabled
        />
      </div>
    </div>
  );
};

export default ParticipantListHeader;
