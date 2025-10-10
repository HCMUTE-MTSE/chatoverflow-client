import type { ApiResponse } from './api.response';

export interface NotificationUser {
  _id: string;
  name: string;
  nickName: string;
  email: string;
}

export interface NotificationPayload {
  // Blog related
  blogId?: string;
  blogTitle?: string;
  blogSlug?: string;
  blogUrl?: string;
  commentContent?: string;
  commenterId?: string;

  // Question related
  questionId?: string;
  questionTitle?: string;
  questionUrl?: string;

  // Answer related
  answerId?: string;
  answerContent?: string;
  answererId?: string;
  answerUrl?: string;

  // Common
  totalUpvotes?: number;
  totalDownvotes?: number;
  voterUserId?: string;
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
