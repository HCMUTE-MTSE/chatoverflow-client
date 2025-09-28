import React from 'react';
import { TbMessagePlus } from 'react-icons/tb';

interface EmptyConversationProps {
  onStartNewChat?: () => void;
}

const EmptyConversation: React.FC<EmptyConversationProps> = ({
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      {/* Chat Logo */}
      <div className="w-32 h-32 mb-6 bg-teal-100 rounded-full flex items-center justify-center">
        <div className="w-24 h-24 bg-teal-200 rounded-full flex items-center justify-center">
          <span className="text-4xl">🤖</span>
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Welcome to chat!
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        Start a direct or group chat with other redditors.
      </p>

      {/* Start New Chat Button */}
      <button
        onClick={onStartNewChat}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        <TbMessagePlus size={20} />
        <span>Start new chat</span>
      </button>
    </div>
  );
};

export default EmptyConversation;
