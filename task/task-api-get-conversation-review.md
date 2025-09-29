So i audided to code.

1. `app\components\page\inbox\Inbox\Inbox.tsx`

- The core idea is to get actual current user id and then get all the conversations,
- i also split the loading and error placeholder into separate components.

```tsx
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
      const currentUserId = userData.data?.userId || null;
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
```

2. The `app\services\api\chat\chat.service.ts` is keep clean and easy to follow:

```ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/chat';

export interface ConversationResponse {
  id: string;
  targetName: string;
  targetAvatar?: string;
}

export interface GetConversationsResponse {
  success: boolean;
  data: ConversationResponse[];
}

export const getConversationsByUserId = async (userId: string) => {
  const response = await axios.get<GetConversationsResponse>(
    `${API_URL}/conversations/${userId}`
  );
  return response.data.data;
};
```
