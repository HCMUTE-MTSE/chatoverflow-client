## Components:

1. `SidebarHeader` - header of sidebar:

- Should be a flexbox with a brand-text in the left and functions icons in the right.

2. `SidebarMain` - main part of sidebar:

- A vertical flex container holding list of `ConversationOverview`.

3. `ConversationOverview` - an overview of a conversation:

- Should be a flexbox with a profile (avatar and name) in the left and "open chat" icon in the right.

4. `Sidebar`:

- A flex container holding `SidebarHeader` and `SidebarMain`.

5. `Chatbox`:

- A flex container holding `ChatboxHeader` and `ChatboxMain`.

6. `ChatboxHeader`:

- A flex container holding a functional icons (expand/collapse/close) in the right.

7. `ChatboxMain`:

- A flex container holding a `MessageContainer` or a `EmptyConversation`.

8. `EmptyConversation`:

- A div display welcome and a button to start a conversation.

9. `MessageContainer`:

- A flex container holding `Message` components.

10. `Message`:

- A div holding a message.

But when i try to login as another user.

Here is related data:

User4 `conversations`:
GET `http://localhost:3000/chat/conversations/68cacc5509bc97efbb83ac04`:

```json
{
  "success": true,
  "data": [
      {
        "id": "68d94fb760c579690b25e693",
        "targetName": "User 10",
        "targetAvatar": "https://i.pravatar.cc/150?img=10"
      }
    {
      /* Other conversations.... */
    },
  ]
}
```

User10 `conversations`:
GET `http://localhost:3000/chat/conversations/68cacc5509bc97efbb83ac0a`:

```json
{
  "success": true,
  "data": [
    {
    "id": "68d94fb760c579690b25e693",
    "targetName": "User 4",
    "targetAvatar": "https://i.pravatar.cc/150?img=4"
    }
    {
      /* Other conversations.... */
    },

  ]
}
```
