import React, { useState, useEffect } from 'react';
import type { Notification } from '~/models/res/notification.response';
import {
  getNotifications,
  markAllAsRead,
} from '~/services/api/notifications/notification.service';
import NotificationItem from './NotificationItem';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationRead: () => void;
}

export default function NotificationDropdown({
  isOpen,
  onClose,
  onNotificationRead,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state when dropdown opens
      setNotifications([]);
      setCurrentPage(1);
      setNextUrl(null);
      fetchNotifications(1, true);
    }
  }, [isOpen]);

  const fetchNotifications = async (
    page: number = 1,
    reset: boolean = false
  ) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await getNotifications(page, 10);
      if (response.success) {
        if (reset) {
          setNotifications(response.data);
        } else {
          setNotifications((prev) => [...prev, ...response.data]);
        }
        setNextUrl(response.pagination?.nextUrl || null);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // Check if scrolled near bottom (within 50px)
    if (
      scrollHeight - scrollTop - clientHeight < 50 &&
      nextUrl &&
      !loadingMore &&
      !loading
    ) {
      fetchNotifications(currentPage + 1, false);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
    onNotificationRead();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      onNotificationRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Notifications</h3>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="max-h-80 overflow-y-auto"
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="p-4 text-center text-gray-400">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-sm">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-400">
            <p className="text-sm">{error}</p>
            <button
              onClick={() => fetchNotifications(1, true)}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={handleMarkAsRead}
                />
              ))}
            </div>
            {/* Load more indicator */}
            {loadingMore && (
              <div className="p-3 text-center text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-1 text-xs">Loading more...</p>
              </div>
            )}
            {/* End of results indicator */}
            {!nextUrl && !loadingMore && notifications.length > 0 && (
              <div className="p-2 text-center text-gray-500">
                <p className="text-xs">No more notifications</p>
              </div>
            )}
          </>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-300 py-1"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
