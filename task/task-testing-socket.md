1. I create `test-socket.html` inside client, `public` folder:
2. Browse to `http://localhost:5173/test-socket.html`
3. The console shows: `[2:32:21 PM] Connected with socket ID: K4nOBZrZNEdIRqPhAAAy`

I use this conversation to test:

```
conversationId: 68d94fb760c579690b25e693
user1: 68cacc5509bc97efbb83ac04
user2: 68cacc5509bc97efbb83ac0a
```

4. In "Test Conversation Join", i update conversation id to "68d94fb760c579690b25e693" and click "Join Conversation".
5. The console shows: `[2:35:18 PM] Joining conversation: 68d94fb760c579690b25e693`
6. Update message: "User-4, hello from test client!" and click Send Message.

Now the full console:

```
[2:32:21 PM] Connected with socket ID: K4nOBZrZNEdIRqPhAAAy
[2:35:18 PM] Joining conversation: 68d94fb760c579690b25e693
[2:38:30 PM] Sent message to conversation 68d94fb760c579690b25e693
[2:38:30 PM] NEW MESSAGE received: {"id":"68db88f66c58064378033d14","senderId":"68cacc5509bc97efbb83ac04","senderName":"User 4","content":"User-4, hello from test client!","createdAt":"2025-09-30T07:38:30.154Z"}
```

7. Refresh the client page (the chatbox page), and the message be displayed.

8. Then i open a new tab, and browse to `http://localhost:5173/test-socket.html`, do the same thing.

```
[2:41:37 PM] Connected with socket ID: ytGVq5mPFELjCIPIAAA0
[2:42:24 PM] Joining conversation: 68d94fb760c579690b25e693
[2:42:58 PM] Sent message to conversation 68d94fb760c579690b25e693
[2:42:58 PM] NEW MESSAGE received: {"id":"68db8a026c58064378033d34","senderId":"68cacc5509bc97efbb83ac0a","senderName":"User 10","content":"User-10, hello from test client!","createdAt":"2025-09-30T07:42:58.170Z"}
```

And when i click send messagel, this log is displayed in immediately in both tabs:

```
[2:42:58 PM] NEW MESSAGE received: {"id":"68db8a026c58064378033d34","senderId":"68cacc5509bc97efbb83ac0a","senderName":"User 10","content":"User-10, hello from test client!","createdAt":"2025-09-30T07:42:58.170Z"}
```
