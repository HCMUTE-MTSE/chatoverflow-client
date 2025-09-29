We'll implement sending new message feature.

Let's start with the UI first.

Our UI are missing sending form now. Can you update the `ChatboxMain.tsx` to include the input field and send button?

```tsx
const ChatboxMain: React.FC<ChatboxMainProps> = ({
  conversation = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col flex-1">
      {conversation ? (
        <div>
          <MessageContainer conversation={conversation} />
          {/* <form /> */}
        </div>
      ) : (
        <EmptyConversation onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
};
```

Note that:

- We need a <form /> element for semantic tag.
- If you need an icon, use react-icons directly instead of outer libs.

Even though i've set hard value for the inbox height.It somehow auto increases when we have more messages.

`Inbox.tsx`:

```tsx
<div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">...</div>
```

`Sidebar.tsx`:

```tsx
<div className="flex flex-col bg-white border-r border-gray-200 h-full">
  ...
</div>
```

`Chatbox.tsx`:

```tsx
<div className="flex flex-col bg-white border border-gray-200 shadow-lg">
  ...
</div>
```

`ChatboxMain.tsx`:

```tsx
<div className="flex flex-col flex-1">...</div>
```
