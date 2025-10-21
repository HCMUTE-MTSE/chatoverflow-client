import React from 'react';
import { TbMessagePlus } from 'react-icons/tb';

import ParticipantList from '../ParticipantList';

interface EmptyConversationProps {
  onStartNewChat: (targetUserId: string) => void | Promise<void>;
  currentUserId: string | null;
}

const EmptyConversation: React.FC<EmptyConversationProps> = ({
  onStartNewChat,
  currentUserId,
}) => {
  const [showUserList, setShowUserList] = React.useState(false);

  const handleSelectUser = (userId: string) => {
    onStartNewChat(userId);
    setShowUserList(false);
  };

  if (showUserList) {
    return (
      <ParticipantList
        currentUserId={currentUserId}
        onSelectUser={handleSelectUser}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-800">
      <div className="w-32 h-32 mb-6 bg-orange-300 rounded-full flex items-center justify-center">
        <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
          <span className="text-4xl">🤖</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-orange-400 mb-2">
        Welcome to chat!
      </h3>
      <p className="text-gray-400 mb-6 max-w-sm">
        Start a direct or group chat with other users.
      </p>
      <button
        onClick={() => setShowUserList(true)}
        className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        <TbMessagePlus size={20} />
        <span>Start new chat</span>
      </button>
    </div>
  );
};

export default EmptyConversation;
