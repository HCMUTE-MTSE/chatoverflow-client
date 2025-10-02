import type { ApiResponse } from './api.response';

export interface NotificationUser {
  _id: string;
  name: string;
  nickName: string;
  email: string;
}

export interface NotificationPayload {
  blogId?: string;
  blogTitle?: string;
  blogSlug?: string;
  blogUrl?: string;
  totalUpvotes?: number;
  voterUserId?: string;
  commentContent?: string;
  commenterId?: string;
}

export interface Notification {
  id: string;
  userId: NotificationUser;
  action: string;
  payload: NotificationPayload;
  emailSent: boolean;
  sentViaSocket: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotificationListResponse = ApiResponse<Notification[]>;

export type UnreadCountResponse = ApiResponse<{
  count: number;
}>;

export type MarkReadResponse = ApiResponse<Notification>;

export type MarkAllReadResponse = ApiResponse<null>;
