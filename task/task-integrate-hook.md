So, i have my client setup:

`ChatboxMain`:

```tsx
interface ChatboxMainProps {
  conversation?: Conversation | null;
  onStartNewChat: () => void;
}

const ChatboxMain: React.FC<ChatboxMainProps> = ({
  conversation = null,
  onStartNewChat,
}) => {
  const handleSendMessage = (message: string) => {
    /* TODO: Implement send message logic */
    console.log('Sending message:', message);
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
```

`MessageContainer`:

```tsx
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
      /* trimmed... */
  };

  React.useEffect(() => {
    fetchMessages();
  }, [conversation]);

  /* loading and error UI */

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
```

`MessageInputForm`:

```tsx
const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="text-gray-500 w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            style={{
              minHeight: '40px',
              maxHeight: '120px',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <IoSend size={16} />
        </button>
      </form>
    </div>
  );
};
```

We need to intergrate the the custom hook from previous task to handle the send message logic.
If you uncertain about something, please ask me for more detail.
