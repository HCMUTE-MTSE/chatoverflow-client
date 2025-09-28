import React from 'react';

import MessageContainer from '../MessageContainer';
import EmptyConversation from '../EmptyConversation';

interface ChatboxMainProps {
  conversationId?: string | null;
  onStartNewChat: () => void;
}

const ChatboxMain: React.FC<ChatboxMainProps> = ({
  conversationId = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col flex-1">
      {conversationId ? (
        <MessageContainer conversationId={conversationId} />
      ) : (
        <EmptyConversation onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
};

export default ChatboxMain;
