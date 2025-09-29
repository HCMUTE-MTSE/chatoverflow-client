import React from 'react';

import { getMessageByConversationId } from '~/services/api/chat/message.service';
import { getUser } from '~/services/api/user/user.service';

import type { Conversation } from '../type';
import type { MessageType } from '../type';

import Message from '../Message';

interface MessageContainerProps {
  conversation: Conversation;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  conversation,
}) => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  /* Mouting messages */
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUser();
      setCurrentUserId(userData.data?.userId || null);

      const messageData = await getMessageByConversationId(conversation.id);
      setMessages(messageData);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load message');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, [conversation]);

  /* Using placeholder component latter */
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(messages);
  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message) => (
        <Message
          key={message.id}
          senderId={message.senderId}
          senderName={message.senderName}
          isSentByUser={message.senderId === currentUserId}
          content={message.content}
          createdAt={new Date(message.createdAt)}
        />
      ))}
    </div>
  );
};

export default MessageContainer;
