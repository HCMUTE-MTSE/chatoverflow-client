So i scaffolded a simple route to get the conversation list by user id.

1. `app\repository\chat.repository.js`

```js
const Conversation = require('../models/Conversation.model');

exports.getConversationsByUserId = async (userId) => {
  return await Conversation.find({
    participantIDs: userId,
  }).sort({ updatedAt: -1 });
};
```

2. `app\services\chat\Chat.service.js`

```js
const chatRepository = require('../../repository/chat.repository');
const User = require('../../models/User.model');

exports.getUserConversations = async (userId) => {
  const conversations = await chatRepository.getConversationsByUserId(userId);

  const conversationsWithTargets = await Promise.all(
    conversations.map(async (conv) => {
      /* 
        Maybe we need call user repository
        To keep things simple, i'll temporarily find user right here.
      */
      const targetUserId = conv.participantIDs.find((id) => id !== userId);
      const targetUser = await User.findById(targetUserId);

      return {
        id: conv._id.toString(),
        targetName: targetUser.name,
        targetAvatar: targetUser.avatar,
      };
    })
  );

  return conversationsWithTargets;
};
```

3. `app\controller\chat\Chat.controller.js`

```js
const chatService = require('../../services/chat/Chat.service');

exports.getConversations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await chatService.getUserConversations(userId);

    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

4. `app\routes\chat\index.js`

```js
const express = require('express');
const router = express.Router();

const chatController = require('../../controller/chat/Chat.controller');

router.get('/conversations/:userId', chatController.getConversations);

module.exports = router;
```

The endpoint is lived at `http://localhost:3000/chat/conversations/{userId}`
This is a sample response:
`GET: http://localhost:3000/chat/conversations/68cacc5509bc97efbb83ac06`

```json
{
  "success": true,
  "data": [
    {
      "id": "68d94fb760c579690b25e69f",
      "targetName": "User 15",
      "targetAvatar": "https://i.pravatar.cc/150?img=15"
    },
    {
      "id": "68d94fb760c579690b25e6a0",
      "targetName": "User 26",
      "targetAvatar": "https://i.pravatar.cc/150?img=26"
    },
    {
      "id": "68d94fb760c579690b25e68e",
      "targetName": "User 7",
      "targetAvatar": "https://i.pravatar.cc/150?img=7"
    },
    {
      "id": "68d94fb760c579690b25e68d",
      "targetName": "User 10",
      "targetAvatar": "https://i.pravatar.cc/150?img=10"
    }
  ]
}
```

Please review the code and give me your feedback, any suggestions about explicit, cleaner and clearer implementation ?
