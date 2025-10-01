import React from 'react';

import type { Conversation } from '../type';

import ChatboxHeader from '../ChatboxHeader';
import ChatboxMain from '../ChatboxMain';

interface ChatboxProps {
  conversation: Conversation | null;
  onStartNewChat: (targetUserId: string) => void | Promise<void>;
  currentUserId: string | null;
}

const Chatbox: React.FC<ChatboxProps> = ({
  conversation = null,
  onStartNewChat,
  currentUserId,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-lg">
      <ChatboxHeader />
      <ChatboxMain
        conversation={conversation}
        onStartNewChat={onStartNewChat}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default Chatbox;
