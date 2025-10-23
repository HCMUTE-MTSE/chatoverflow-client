/* Manages notification socket events */

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import type { Notification } from '~/models/res/notification.response';

interface UseNotificationSocketProps {
  socket: Socket | null;
  userId: string | null;
  accessToken: string | null;
}

export function useNotificationSocket({
  socket,
  userId,
  accessToken,
}: UseNotificationSocketProps) {
  const [newNotification, setNewNotification] = useState<Notification | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authenticate socket when user logs in
  useEffect(() => {
    if (!socket || !userId || !accessToken) {
      setIsAuthenticated(false);
      return;
    }
    // Emit user_login to authenticate and join notification room
    socket.emit('user_login', { token: accessToken });

    // Listen for authentication success
    const handleAuthSuccess = (data: { message: string; userId: string }) => {
      setIsAuthenticated(true);
    };

    // Listen for authentication error
    const handleAuthError = (data: { message: string }) => {
      console.error('❌ Socket authentication error:', data.message);
      setIsAuthenticated(false);
    };

    socket.on('auth_success', handleAuthSuccess);
    socket.on('auth_error', handleAuthError);

    return () => {
      socket.off('auth_success', handleAuthSuccess);
      socket.off('auth_error', handleAuthError);
    };
  }, [socket, userId, accessToken]);

  // Listen for new notifications
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    const handleNewNotification = (notification: Notification) => {
      console.log('📬 New notification received via socket:', notification);
      setNewNotification(notification);
    };

    socket.on('new_notification', handleNewNotification);

    return () => {
      socket.off('new_notification', handleNewNotification);
    };
  }, [socket, isAuthenticated]);

  // Clear notification after it's been displayed
  const clearNotification = () => {
    setNewNotification(null);
  };

  return {
    newNotification,
    clearNotification,
    isAuthenticated,
  };
}
