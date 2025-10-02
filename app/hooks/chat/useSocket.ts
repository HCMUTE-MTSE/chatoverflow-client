/* Manages socket connection lifecycle */

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      //transports: ['websocket'],
      autoConnect: true,
      //withCredentials: true,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('=============Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('=============Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('=============Socket connection error:', error);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socketRef.current;
}
