import * as React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '~/components/Navbar/Navbar';
import Header from '~/components/Header';
import { useTokenRefresher } from '~/hooks/useTokenRefresher';
import { useSocket, useNotificationSocket } from '~/hooks/chat';
import { NotificationPopup } from '~/components/ui/NotificationPopup';
import { parseJwt } from '~/utils/jwt';

export default function Layout() {
  useTokenRefresher();
  const location = useLocation();
  const isTagsPage = location.pathname === '/tags';
  const isProfilePage = location.pathname === '/profile';

  // Initialize socket for notifications
  const socket = useSocket();
  const [userId, setUserId] = React.useState<string | null>(null);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  // Get user info from token
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.sub) {
        setUserId(decoded.sub);
        setAccessToken(token);
      }
    }
  }, []);

  // Use notification socket hook
  const { newNotification, clearNotification } = useNotificationSocket({
    socket,
    userId,
    accessToken,
  });

  if (isTagsPage || isProfilePage) {
    // Layout đặc biệt cho trang Tags và Profile - full screen với sidebar
    return (
      <div className="grid grid-cols-[1fr_5fr] h-screen bg-black">
        <Navbar />
        <div className="flex flex-col h-screen overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
        {/* Notification popup */}
        <NotificationPopup
          notification={newNotification}
          onClose={clearNotification}
        />
      </div>
    );
  }

  // Layout mặc định cho các trang khác
  return (
    <div className="grid grid-cols-[1fr_5fr] gap-4 h-screen">
      <Navbar />
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto px-6 py-4">
          <Outlet />
        </div>
      </div>
      {/* Notification popup */}
      <NotificationPopup
        notification={newNotification}
        onClose={clearNotification}
      />
    </div>
  );
}
