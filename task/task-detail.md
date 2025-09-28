## Development Partnership

We build production code together. I handle implementation details while you guide architecture and catch complexity early.

I’ll break the tasks into smaller pieces and focus on them one at a time. While working on each task, please keep the bigger picture in mind, but do not generate the later tasks all at once.

## Project's core stack

### Client-side:

- React
- React Router (v6)
- Anxios
- TypeScript

### Server-side:

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

## Code Organization

- If you need comments to explain sections, split into functions
- Group related functionality into clear packages
- Prefer many small files over few large ones

## Architecture Principles

Prefer explicit over implicit:

- Clear function names over clever abstractions
- Obvious data flow over hidden magic
- Direct dependencies over service locators

## Problem Solving

- When stuck: Stop. The simple solution is usually correct.
- When uncertain: "Let me ultrathink about this architecture."
- When choosing: "I see approach A (simple) vs B (flexible). Which do you prefer?"
- Your redirects prevent over-engineering. When uncertain about implementation, stop and ask for guidance.

## Feature details

We'll build a simplified version of Reddit chats.

- User click to the "chat" icon on the top right corner to open a chat window.
- A chat pop-up window will be displayed.
- User can start a new chat or join an existing one.
- User can send a message to the chat.
- That conversation will be stored and displayed in the sidebar.
