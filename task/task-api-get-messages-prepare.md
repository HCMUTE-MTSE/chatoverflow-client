Now we will create an endpoint to get messages from a selected conversation.

But first, we need to carefully thinking about the route structure.

For now, we have get-conversations-by-userId route:
`http://localhost:3000/chat/conversations/<userId>`

How can we design a clear route for getting messages from a specific conversation?

- We can expand the route to include the conversation ID: `http://localhost:3000/chat/conversations/<userId>/<conversationId>`
- Or we can use a query parameter: `http://localhost:3000/chat/conversations/<userId>?conversationId=<conversationId>`
- Or define a new route: `http://localhost:3000/chat/conversations/messages/<conversationId>`

Each of these options has its own pros and cons, and it just three of many, many possibilities.
**So we need to choose the one that best suits our needs**, let carefully think about it.

Warn reminder that keep in mind scalability, but we also need simple, clear and clean approach. So plese prevent over-engineering in your direction. Refain unnecessary complexity like clever abstractions or magic flows.
