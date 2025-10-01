## Review

- Database migation is done.
- So now the the realtime message broadcasting logic is working properly.
- I logged as two users from different tabs and sent messages to each other.
- The new message is displayed in both sides.

## Next step

- Now we need to implement the logic to create a new conversation.

## Recall structure

From the root component `app\components\page\inbox\Inbox\Inbox.tsx`:

```tsx
return (
  <div className="h-96 grid grid-cols-[2fr_3fr] w-196 bg-red-500">
    <Sidebar
      conversations={conversations}
      handleSelectConversation={handleSelectConversation}
    />
    /* We temporally pass an empty func to `onStartNewChat` */
    <Chatbox conversation={currentConversation} onStartNewChat={() => {}} />
  </div>
);
```

The `onStartNewChat` is passed through the `Chatbox` -> `ChatboxMain` -> `EmptyConversation`.

```tsx
const EmptyConversation: React.FC<EmptyConversationProps> = ({
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      {/* Chat Logo... */}

      {/* Title and Description... */}

      {/* Start New Chat Button */}
      <button
        onClick={onStartNewChat}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        <TbMessagePlus size={20} />
        <span>Start new chat</span>
      </button>
    </div>
  );
};
```

## Implementation

Let start with the server, we need to create new endpoint to create a new conversation with two users.

Current route map:

```js
router.get('/conversations/:userId', chatController.getConversations);
router.get('/messages/:conversationId', chatController.getMessages);
router.post('/messages', chatController.sendMessage);
```

User4: `68dbbcd83f9a9905d8e2456e`
User9: `68dbc458483def7bc0f6dbe4`
User26: `68dbbcd83f9a9905d8e24584`
