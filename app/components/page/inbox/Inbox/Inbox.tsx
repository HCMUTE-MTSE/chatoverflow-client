import * as React from 'react';

import { getConversationsByUserId } from '~/services/api/chat/chat.service';
import { getUser } from '~/services/api/user/user.service';

import type { ConversationResponse } from '~/services/api/chat/chat.service';
import type { Conversation } from '../type';

import Sidebar from '../Sidebar';
import Chatbox from '../Chatbox';
import ConversationSkeleton from '../ConversationSkeleton';
import ConversationError from '../ConversationError';

function Inbox() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUser();
      const currentUserId = userData.data.userId || '';
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
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">
      <Sidebar conversations={conversations} />
      <Chatbox conversationId={null} onStartNewChat={() => {}} />
    </div>
  );
}

export default Inbox;
