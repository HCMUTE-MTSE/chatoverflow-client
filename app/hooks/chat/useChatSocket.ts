/* Manages chat-specific socket events */

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

interface UseChatSocketProps {
  socket: Socket | null;
  conversationId: string | null;
}

export function useChatSocket({ socket, conversationId }: UseChatSocketProps) {
  const [newMessage, setNewMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!socket || !conversationId) return;

    // Join conversation room
    socket.emit('join_conversation', conversationId);
    console.log('Joined conversation:', conversationId);

    // Listen for new messages
    const handleNewMessage = (message: Message) => {
      console.log('New message received:', message);
      setNewMessage(message);
    };

    socket.on('new_message', handleNewMessage);

    // Cleanup when conversation changes or unmounts
    return () => {
      socket.off('new_message', handleNewMessage);
      socket.emit('leave_conversation', conversationId);
      console.log('Left conversation:', conversationId);
    };
  }, [socket, conversationId]);

  const sendMessage = (senderId: string, content: string) => {
    if (!socket || !conversationId) {
      console.error('Cannot send message: socket or conversationId missing');
      return;
    }

    socket.emit('send_message', {
      conversationId,
      senderId,
      content,
    });
  };

  return {
    newMessage,
    sendMessage,
  };
}
