import React from 'react';

import type { Conversation } from '../type';

import ChatboxHeader from '../ChatboxHeader';
import ChatboxMain from '../ChatboxMain';

interface ChatboxProps {
  conversation: Conversation | null;
  onStartNewChat: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({
  conversation = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-lg">
      <ChatboxHeader />
      <ChatboxMain
        conversation={conversation}
        onStartNewChat={onStartNewChat}
      />
    </div>
  );
};

export default Chatbox;
