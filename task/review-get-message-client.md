In client, i'm done a lot of stuff.

- Basically, i'm create new state `currentConversation` and pass it through Sidebar -> ... -> ConversationOverview.
- So that when we click on a conversation in Sidebar, it will be displayed in Chatbox.
- Chatbox receives the `currentConversation` and pass through ->...-> `MessageContainer`,
- `MessageContainer` extracting id and then fetch all the messages based on that id.
- Anxios implementation are in `message.service.ts` logic quite same as `conversation.service.ts`.
- So that we can display the coresponding chatbox when we click on a conversation in Sidebar.

`Inbox.tsx`:

```tsx
function Inbox() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    React.useState<Conversation | null>(null);

  /* Mouting conversations */
  /* ..................... */

  function handleSelectConversation(conversation: Conversation) {
    setCurrentConversation(conversation);
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
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">
      <Sidebar
        conversations={conversations}
        handleSelectConversation={handleSelectConversation}
      />
      <Chatbox conversation={currentConversation} onStartNewChat={() => {}} />
    </div>
  );
}
```

`Chatbox` -> `ChatboxMain` -> `MessageContainer`:

```tsx
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
      /* ..................... */
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
```

`message.service.ts`:

```tsx
export interface MessageResponse {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date;
}
export interface GetMessageResponse {
  success: boolean;
  data: MessageResponse[];
}

export const getMessageByConversationId = async (conversationId: string) => {
  const response = await axios.get<GetMessageResponse>(
    `${API_URL}/messages/${conversationId}`
  );
  return response.data.data;
};
```

- The `Message Props` of these components is audited to fit with new response shape:

```tsx
{
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date;
}
```
