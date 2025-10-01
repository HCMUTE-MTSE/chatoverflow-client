import axios from 'axios';
import type {
  NotificationListResponse,
  UnreadCountResponse,
  MarkReadResponse,
  MarkAllReadResponse,
} from '../../../models/res/notification.response';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/notifications`;

export const getNotifications = async (
  page: number = 1,
  limit: number = 10
) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.get<NotificationListResponse>(
    `${API_URL}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUnreadCount = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.get<UnreadCountResponse>(
    `${API_URL}/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markAsRead = async (notificationId: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.put<MarkReadResponse>(
    `${API_URL}/${notificationId}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markAllAsRead = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.put<MarkAllReadResponse>(
    `${API_URL}/read-all`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
