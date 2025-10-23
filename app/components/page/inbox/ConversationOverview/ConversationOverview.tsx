import React from 'react';

import type { Conversation } from '../type';

import { HiOutlineChevronRight } from 'react-icons/hi2';

interface ConversationOverviewProps {
  conversation: Conversation;
  handleSelectConversation: (conversation: Conversation) => void;
}

const ConversationOverview: React.FC<ConversationOverviewProps> = ({
  conversation,
  handleSelectConversation,
}) => {
  return (
    <button
      className="flex items-center justify-between p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
      onClick={() => handleSelectConversation(conversation)}
    >
      {/* Avatar and name */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          {conversation.targetAvatar ? (
            <img
              src={conversation.targetAvatar}
              alt={conversation.targetName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="text-white text-sm font-medium">
              {conversation.targetName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <span className="text-gray-100 font-medium">
          {conversation.targetName}
        </span>
      </div>

      {/* Open conversation icon */}
      <HiOutlineChevronRight size={16} className="text-sky-400" />
    </button>
  );
};

export default ConversationOverview;
