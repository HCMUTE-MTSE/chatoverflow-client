import React from 'react';

import { useSocket, useChatSocket } from '~/hooks/chat';

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
  const socket = useSocket();

  const { newMessage, sendMessage } = useChatSocket({
    socket,
    conversationId: conversation?.id || null,
  });

  const handleSendMessage = async (content: string, senderId: string) => {
    await sendMessage(senderId, content);
    console.log('Message sent:', content, 'from:', senderId);
  };

  return (
    <div className="flex flex-col flex-1">
      {conversation ? (
        <div className="h-96 flex flex-col flex-1">
          <MessageContainer
            conversation={conversation}
            newMessage={newMessage}
          />
          <MessageInputForm onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <EmptyConversation onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
};

export default ChatboxMain;
