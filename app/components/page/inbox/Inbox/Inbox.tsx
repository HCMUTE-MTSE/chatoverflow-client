import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { getUser } from '~/services/api/user/user.service';
import { getConversationsByUserId } from '~/services/api/chat/conversation.service';
import { createConversation } from '~/services/api/chat/conversation.service';

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
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  /* Mouting conversations */
  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUser();
      const currentUserId = userData.data.user.userId;

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
  const location = useLocation();
  const initialConversationId = location.state?.conversationId;

  React.useEffect(() => {
    fetchConversations();
  }, []);

  React.useEffect(() => {
    if (initialConversationId && conversations.length > 0) {
      const conversation = conversations.find(
        (c) => c.id === initialConversationId
      );
      if (conversation) {
        setCurrentConversation(conversation);
      }
    }
  }, [initialConversationId, conversations]);

  function handleSelectConversation(conversation: Conversation) {
    setCurrentConversation(conversation);
  }

  function handleUnselectAllConversations() {
    setCurrentConversation(null);
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
    <div className="fixed bottom-4 right-4 h-120 grid grid-cols-[2fr_3fr] w-156 bg-red-500 rounded-lg shadow-lg border border-gray-300 my-2">
      <Sidebar
        conversations={conversations}
        handleSelectConversation={handleSelectConversation}
        handleUnselectAllConversations={handleUnselectAllConversations}
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
