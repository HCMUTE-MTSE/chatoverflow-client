import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Notification } from '~/models/res/notification.response';
import { markAsRead } from '~/services/api/notifications/notification.service';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Mark as read if not already read
      if (!notification.isRead) {
        await markAsRead(notification.id);
        onRead(notification.id);
      }

      // Navigate based on notification type
      let targetUrl = null;

      if (notification.payload.blogUrl) {
        // Blog notifications
        const url = new URL(notification.payload.blogUrl);
        targetUrl = url.pathname;
      } else if (
        notification.payload.questionUrl ||
        notification.payload.answerUrl
      ) {
        // Question/Answer notifications
        const url = new URL(
          notification.payload.questionUrl ||
            notification.payload.answerUrl ||
            ''
        );
        targetUrl = url.pathname;
      } else if (notification.payload.questionId) {
        // Fallback: construct question URL from questionId
        targetUrl = `/question/${notification.payload.questionId}`;
      }

      if (targetUrl) {
        navigate(targetUrl);
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const getNotificationMessage = () => {
    switch (notification.action) {
      // Blog notifications
      case 'blog_upvote':
        return `Your blog "${notification.payload.blogTitle}" received an upvote`;
      case 'new_blog_comment':
        return `New comment on your blog "${notification.payload.blogTitle}"`;
      case 'blog_downvote':
        return `Your blog "${notification.payload.blogTitle}" received a downvote`;

      // Question notifications
      case 'question_upvote':
        return `Your question "${notification.payload.questionTitle}" received an upvote`;
      case 'question_downvote':
        return `Your question "${notification.payload.questionTitle}" received a downvote`;
      case 'new_question':
        return `New question: "${notification.payload.questionTitle}"`;

      // Answer notifications
      case 'new_answer':
        return `New answer on your question "${notification.payload.questionTitle}"`;
      case 'answer_upvote':
        return `Your answer on "${notification.payload.questionTitle}" received an upvote`;
      case 'answer_downvote':
        return `Your answer on "${notification.payload.questionTitle}" received a downvote`;

      default:
        return `You have a new notification`;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-3 text-left hover:bg-gray-700 transition-colors border-l-2 ${
        notification.isRead
          ? 'border-transparent bg-gray-800/50'
          : 'border-blue-500 bg-gray-800'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${notification.isRead ? 'text-gray-300' : 'text-white font-medium'}`}
          >
            {getNotificationMessage()}
          </p>
          {notification.action === 'new_blog_comment' &&
            notification.payload.commentContent && (
              <p className="text-xs text-gray-400 mt-1 truncate">
                "{notification.payload.commentContent}"
              </p>
            )}
        </div>
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
          {formatTimeAgo(notification.createdAt)}
        </span>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
      )}
    </button>
  );
}
