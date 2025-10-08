import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Notification } from '~/models/res/notification.response';

interface NotificationPopupProps {
  notification: Notification | null;
  onClose: () => void;
}

// Helper function to get notification message and target URL
function getNotificationDetails(notification: Notification): {
  message: string;
  targetUrl: string;
} {
  const { action, payload } = notification;

  switch (action) {
    case 'new_answer':
      return {
        message: `Câu hỏi "${payload.questionTitle}" của bạn có câu trả lời mới`,
        targetUrl: payload.questionUrl || `/question/${payload.questionId}`,
      };

    case 'question_upvote':
      return {
        message: `Câu hỏi "${payload.questionTitle}" của bạn được upvote (+${payload.totalUpvotes})`,
        targetUrl: payload.questionUrl || `/question/${payload.questionId}`,
      };

    case 'question_downvote':
      return {
        message: `Câu hỏi "${payload.questionTitle}" của bạn bị downvote`,
        targetUrl: payload.questionUrl || `/question/${payload.questionId}`,
      };

    case 'answer_upvote':
      return {
        message: `Câu trả lời của bạn cho "${payload.questionTitle}" được upvote (+${payload.totalUpvotes})`,
        targetUrl: payload.answerUrl || `/question/${payload.questionId}`,
      };

    case 'answer_downvote':
      return {
        message: `Câu trả lời của bạn cho "${payload.questionTitle}" bị downvote`,
        targetUrl: payload.answerUrl || `/question/${payload.questionId}`,
      };

    case 'new_comment':
      return {
        message: `Câu hỏi "${payload.questionTitle}" của bạn có bình luận mới`,
        targetUrl: payload.questionUrl || `/question/${payload.questionId}`,
      };

    case 'blog_upvote':
      return {
        message: `Blog "${payload.blogTitle}" của bạn được upvote (+${payload.totalUpvotes})`,
        targetUrl: payload.blogUrl || `/blog/${payload.blogSlug}`,
      };

    case 'blog_downvote':
      return {
        message: `Blog "${payload.blogTitle}" của bạn bị downvote`,
        targetUrl: payload.blogUrl || `/blog/${payload.blogSlug}`,
      };

    case 'new_blog_comment':
      return {
        message: `Blog "${payload.blogTitle}" của bạn có bình luận mới`,
        targetUrl: payload.blogUrl || `/blog/${payload.blogSlug}`,
      };

    case 'blog_comment_upvote':
      return {
        message: `Bình luận của bạn trong blog "${payload.blogTitle}" được upvote`,
        targetUrl: payload.blogUrl || `/blog/${payload.blogSlug}`,
      };

    default:
      return {
        message: 'Bạn có thông báo mới',
        targetUrl: '/',
      };
  }
}

export function NotificationPopup({
  notification,
  onClose,
}: NotificationPopupProps) {
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (!notification) return;

    // Auto hide after 5 seconds
    const removeTimer = setTimeout(() => {
      setIsRemoving(true);
    }, 4700);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(removeTimer);
      clearTimeout(closeTimer);
    };
  }, [notification, onClose]);

  if (!notification) return null;

  const { message, targetUrl } = getNotificationDetails(notification);

  const handleClick = () => {
    // Parse URL to get path only (remove domain if present)
    let path = targetUrl;
    try {
      const url = new URL(targetUrl);
      path = url.pathname;
    } catch {
      // If it's already a relative path, use as is
      path = targetUrl;
    }

    navigate(path);
    onClose();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50 
        max-w-sm w-full
        bg-gradient-to-r from-blue-600 to-blue-700
        text-white rounded-lg shadow-2xl
        p-4 cursor-pointer
        transform transition-all duration-300
        hover:shadow-blue-500/50 hover:scale-105
        ${isRemoving ? 'animate-toast-down opacity-0' : 'animate-toast-up'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{message}</p>
          <p className="text-xs text-blue-100 mt-1">Nhấn để xem chi tiết</p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
        <div
          className="h-full bg-white/60 animate-progress"
          style={{ animationDuration: '5s' }}
        />
      </div>
    </div>
  );
}
