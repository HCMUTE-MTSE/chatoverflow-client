import React from 'react';
import Message from '../Message';

interface MessageData {
  id: string;
  content: string;
  sender: string;
  reciver: string;
  isSentByUser: boolean;
  timestamp: Date;
}

interface MessageContainerProps {
  conversationId: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  conversationId,
}) => {
  /* const messages: MessageData[] = fetchConversationMessages(conversationId); */
  const messages: MessageData[] = [
    {
      id: '1',
      content: 'Hello, how are you?',
      sender: 'John Doe',
      reciver: 'Jane Clear',
      isSentByUser: true,
      timestamp: new Date(),
    },
    {
      id: '2',
      content: 'I am fine, thanks!',
      sender: 'Jane Clear',
      reciver: 'John Doe',
      isSentByUser: false,
      timestamp: new Date(),
    },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          sender={message.sender}
          reciver={message.reciver}
          isSentByUser={message.isSentByUser}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageContainer;
