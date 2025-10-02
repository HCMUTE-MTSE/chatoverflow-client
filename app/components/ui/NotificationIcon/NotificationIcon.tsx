import React, { useState, useEffect, useRef } from 'react';
import { BellIcon } from '~/libs/icons';
import { getUnreadCount } from '~/services/api/notifications/notification.service';
import NotificationDropdown from '../NotificationDropdown';

export default function NotificationIcon() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch unread count on component mount and periodically
  useEffect(() => {
    fetchUnreadCount();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await getUnreadCount();
      if (response.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
      // Don't show error to user for polling requests
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationRead = () => {
    // Refresh unread count when a notification is read
    fetchUnreadCount();
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="relative p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
        aria-label="Notifications"
      >
        <BellIcon size={20} />

        {/* Unread count badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[18px] h-[18px]">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Loading indicator */}
        {loading && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
        )}
      </button>

      <NotificationDropdown
        isOpen={isDropdownOpen}
        onClose={handleCloseDropdown}
        onNotificationRead={handleNotificationRead}
      />
    </div>
  );
}
