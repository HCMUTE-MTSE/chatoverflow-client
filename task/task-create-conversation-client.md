## Review

So the endpoint work properly. I done a test:

Request:
`POST http://localhost:3000/chat/conversations`

```json
{
  "userId1": "68dbbcd83f9a9905d8e2456e" /* User 4 */,
  "userId2": "68dbbcd83f9a9905d8e24584" /* User 26 */
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "68dd25a1762549c25d1abd79",
    "targetName": "User 26",
    "targetAvatar": "https://i.pravatar.cc/150?img=26",
    "isNew": true
  }
}
```

Now let head to the client.

## Implementation

When user click "Start new chat", we'll display a selection UI where the current user can pick who to start a conversation with

The endpoint to get users list is already implemented, lived at: `GET http://localhost:3000/user`

```json
{
  "success": true,
  "message": "Fetched users successfully",
  "data": [
    {
      "_id": "68dbbcd83f9a9905d8e24575",
      "name": "User 11",
      "nickName": "nick11",
      "email": "user11@example.com",
      "avatar": "https://i.pravatar.cc/150?img=11",
      "dateOfBirth": "1991-12-10T17:00:00.000Z",
      "address": {
        "province": "Province 11",
        "ward": "Ward 11",
        "street": "Street 11"
      },
      "gender": "other",
      "status": "active",
      "createdAt": "2025-09-30T11:19:52.172Z",
      "updatedAt": "2025-09-30T11:19:52.172Z",
      "questionsCount": 5,
      "answersCount": 6
    }
    /* ...other users */
  ]
}
```

We need to implement anxious the fetch users list, i've create `app\services\api\chat\user.service.ts`.

In the UI, we just need simple grid of user, with user `avatar`, `username` and their `nickName`.

So i need some kind of components:
`ParticipantList`: contain `ParticipantListHeader` and `ParticipantCard`.
`ParticipantCard`: display user `avatar`, `username` and `nickName`.
`ParticipantListHeader`: display "a search and filter bar" for decorative purpose, we won't implement in this for now.

This just sample component, feel free to add more component for structural purpose.
