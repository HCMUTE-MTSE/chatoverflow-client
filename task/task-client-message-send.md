## API review:

So i implemented the api as in the previous task.
The endpoint is lived at `POST http://localhost:3000/chat/messages` and here is the sample response:
`request body`:

```json
{
  "conversationId": "68d94fb760c579690b25e693",
  "senderId": "68cacc5509bc97efbb83ac0a",
  "content": "Hello again!"
}
```

`response`:

```json
{
  "success": true,
  "data": {
    "id": "68db59ca656669224d1868cb",
    "senderId": "68cacc5509bc97efbb83ac0a",
    "senderName": "User 10",
    "content": "Hello again!",
    "createdAt": "2025-09-30T04:17:14.591Z"
  }
}
```

Then if i refresh the page, new message will be added to the conversation.

## Task:

Now our task is to call this api and display new message.

But before we starting to code. I wonder:

1. We need a realtime chat, mean when one user send a message, it will be displayed right away to the targe user.
2. If we just call the api by anxios does the "realtime" work ? In the other ways, can we solve this problem without an socket ?.
3. If not, any simple and explicit solution for this stuff ?
4. Both socket-based and non-socket-based solution are acceptable, whatever fits well with our requirements.

Please consider this.

Warm reminder: this stuff itself is complex enough. So please avoid over-engineering. Focus on simple and clean solution.
