So i create <MessageInputForm /> an input form for send message, in ChatboxMain, i passed a temporally function:

```tsx
const handleSendMessage = (message: string) => {
  console.log('Sending message:', message);
  /* TODO: Implement send message logic */
};
```

Now let implement the API call to actually send messages to the backend follow the structure we implemented in the previous tasks.
But before diving into the code, how can we define the API route ?

Here is the recall structure so far:
`app\routes\chat\index.js`:

```js
router.get('/conversations/:userId', chatController.getConversations);
router.get('/messages/:conversationId', chatController.getMessages);
```

`app\controller\chat\Chat.controller.js`:

```js
exports.getConversations = async (req, res) => {....}
exports.getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    if (!conversationId) {
      return res
        .status(400)
        .json({ success: false, error: 'Conversation ID is required' });
    }

    const messages = await chatService.getConversationMessages(conversationId);

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

`app\service\chat\Chat.service.js`:

```js
exports.getUserConversations = async (conversationId) => {....}

exports.getConversationMessages = async (conversationId) => {
  const messages = await chatRepository.getMessagesByConversationId(
    conversationId
  );

  const messagesViewModel = await Promise.all(
    messages.map(async (message) => {
      const sender = await User.findById(message.senderId);
      const senderName = sender.name;

      return {
        id: message._id.toString(),
        senderId: message.senderId,
        senderName: senderName,
        content: message.content,
        createdAt: message.createdAt,
      };
    })
  );

  return messagesViewModel;
};
```

`app\repository\Chat.repository.js`:

```js
exports.getConversationsByUserId = async (userId) => {
  return await Conversation.find({
    participantIDs: userId,
  }).sort({ updatedAt: -1 });
};

exports.getMessagesByConversationId = async (conversationId) => {
  return await Message.find({
    conversationId: conversationId,
  }).sort({ createdAt: 1 });
};
```
