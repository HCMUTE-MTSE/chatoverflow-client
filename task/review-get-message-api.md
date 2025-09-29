So i define new route for get conversation message:

```
router.get('/messages/:conversationId', chatController.getMessages);
```

The structure of controller, service and repository is the same as the previous task.
`Chat.controller.js`

```js
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

`Chat.service.js`

```js
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

`Chat.repository.js`

```js
exports.getMessagesByConversationId = async (conversationId) => {
  return await Message.find({
    conversationId: conversationId,
  }).sort({ createdAt: 1 });
};
```

The endpoint is lived at `http://localhost:3000/chat/messages/{conversationId}`, here is a sample response:
`GET http://localhost:3000/chat/messages/68d94fb760c579690b25e68d`

```json
{
    "success": true,
    "data": [
        {
            "id": "68d9536bd33d7098806fc0c7",
            "senderId": "68cacc5509bc97efbb83ac06",
            "senderName": "User 6",
            "content": "Let me think about that",
            "createdAt": "2025-09-28T15:25:31.601Z"
        },
        {
            "id": "68d9536bd33d7098806fc0c8",
            "senderId": "68cacc5509bc97efbb83ac0a",
            "senderName": "User 10",
            "content": "Really? That's interesting!",
            "createdAt": "2025-09-28T15:25:31.601Z"
        },
        ...
    ]
}
```
