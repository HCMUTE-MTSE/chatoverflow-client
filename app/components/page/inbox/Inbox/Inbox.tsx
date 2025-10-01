import * as React from 'react';

import { getUser } from '~/services/api/user/user.service';
import { getConversationsByUserId } from '~/services/api/chat/conversation.service';
import { createConversation } from '~/services/api/chat/conversation.service';

import type { ConversationResponse } from '~/services/api/chat/conversation.service';
import type { Conversation } from '../type';

import Sidebar from '../Sidebar';
import Chatbox from '../Chatbox';
import ConversationSkeleton from '../ConversationSkeleton';
import ConversationError from '../ConversationError';

function Inbox() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    React.useState<Conversation | null>(null);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);
  /* Mouting conversations */
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUser();
      const currentUserId = userData.data?.userId || null;
      setCurrentUserId(currentUserId);

      const conversationData = await getConversationsByUserId(currentUserId);
      setConversations(conversationData);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchConversations();
  }, []);

  function handleSelectConversation(conversation: Conversation) {
    setCurrentConversation(conversation);
  }
  async function handleStartNewConversation(targetUserId: string) {
    console.log('Target user ID: ', targetUserId);
    if (!currentUserId) {
      console.error('Please login to start a new conversation.');
      return;
    }

    try {
      const newConversation = await createConversation(
        currentUserId,
        targetUserId
      );
      setConversations((prev) => [...prev, newConversation]);
      setCurrentConversation(newConversation);
      console.log('New conversation created: ', newConversation);
    } catch (err) {
      console.error('Error creating conversation:', err);
    }
  }

  if (loading) {
    return <ConversationSkeleton />;
  }

  if (error) {
    return (
      <ConversationError
        error={error}
        retryHandler={() => fetchConversations()}
      />
    );
  }

  return (
    <div className="h-120 grid grid-cols-[2fr_3fr] w-196 bg-red-500 rounded-lg">
      <Sidebar
        conversations={conversations}
        handleSelectConversation={handleSelectConversation}
      />
      <Chatbox
        conversation={currentConversation}
        currentUserId={currentUserId}
        onStartNewChat={handleStartNewConversation}
      />
    </div>
  );
}

export default Inbox;
