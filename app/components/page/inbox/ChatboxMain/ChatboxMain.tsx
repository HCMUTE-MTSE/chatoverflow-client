import React from 'react';

import type { Conversation } from '../type';

import MessageContainer from '../MessageContainer';
import EmptyConversation from '../EmptyConversation';
import MessageInputForm from '../MessageInputForm';

interface ChatboxMainProps {
  conversation?: Conversation | null;
  onStartNewChat: () => void;
}

const ChatboxMain: React.FC<ChatboxMainProps> = ({
  conversation = null,
  onStartNewChat,
}) => {
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    /* TODO: Implement send message logic */
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {conversation ? (
        <div>
          <MessageContainer conversation={conversation} />
          <MessageInputForm onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <EmptyConversation onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
};

export default ChatboxMain;
