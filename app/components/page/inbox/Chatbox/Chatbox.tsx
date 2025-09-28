import React from 'react';
import ChatboxHeader from '../ChatboxHeader';
import ChatboxMain from '../ChatboxMain';

interface ChatboxProps {
  conversationId?: string | null;
  onStartNewChat: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({
  conversationId = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-lg">
      <ChatboxHeader />
      <ChatboxMain
        conversationId={conversationId}
        onStartNewChat={onStartNewChat}
      />
    </div>
  );
};

export default Chatbox;
