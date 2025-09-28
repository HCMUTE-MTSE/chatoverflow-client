So, i audited those components and now the flow is:

1. `<Chatbox />` calls `<ChatboxHeader />` and `<ChatboxMain />`.

```tsx
interface ChatboxProps {
  conversationId?: string | null;
  onStartNewChat: () => void;
}
const Chatbox: React.FC<ChatboxProps> = ({
  conversationId = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col w-96 bg-white border border-gray-200 rounded-lg shadow-lg h-96">
      <ChatboxHeader />
      <ChatboxMain
        conversationId={conversationId}
        onStartNewChat={onStartNewChat}
      />
    </div>
  );
};
```

2. `<ChatboxMain />` recive `conversationId` and `onStartNewChat`. Depend on the value of `conversationId`, `<ChatboxMain />` calls `<MessageContainer />` or `<EmptyConversation />`.

```tsx
const ChatboxMain: React.FC<ChatboxMainProps> = ({
  conversationId = null,
  onStartNewChat,
}) => {
  return (
    <div className="flex flex-col flex-1">
      {conversationId ? (
        <MessageContainer conversationId={conversationId} />
      ) : (
        <EmptyConversation onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
};
```

---

3. `Sidebar` calls `<SidebarHeader />` and pass `conversations` to `<SidebarMain />`.

```tsx
interface Conversation {
  id: string;
  targetName: string;
  targetAvatar?: string;
}
interface SidebarProps {
  conversations: Conversation[];
}
const Sidebar: React.FC<SidebarProps> = ({ conversations }) => {
  return (
    <div className="flex flex-col w-80 bg-white border-r border-gray-200 h-full">
      <SidebarHeader />
      <SidebarMain conversations={conversations} />
    </div>
  );
};
```

4. `<Inbox>` doing data-fetching stuff and compose `<Sidebar />` and `<Chatbox />`

```tsx
function Inbox() {
  /* const conversations = fetchConversations(); */
  const conversations = [
    {
      id: '1',
      targetName: 'John Doe',
      targetAvatar:
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: '2',
      targetName: 'Jane Clear',
      targetAvatar:
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">
      <Sidebar conversations={conversations} />
      <Chatbox conversationId={'1'} onStartNewChat={() => {}} />
    </div>
  );
}
```
