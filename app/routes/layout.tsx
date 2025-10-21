import * as React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '~/components/Navbar/Navbar';
import Header from '~/components/Header';
import { useTokenRefresher } from '~/hooks/useTokenRefresher';
import { useSocket, useNotificationSocket } from '~/hooks/chat';
import { NotificationPopup } from '~/components/ui/NotificationPopup';
import { parseJwt } from '~/utils/jwt';
import Inbox from '~/components/page/inbox/Inbox';
import Portal from '~/components/ui/Portal';

export const IsOpenChatContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export default function Layout() {
  const [isOpenChat, setIsOpenChat] = React.useState(false);
  React.useEffect(() => {
    console.log('Layout mounted/remounted');
  }, []);
  console.log('Layout rendering, isOpenChat:', isOpenChat);

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
    <IsOpenChatContext.Provider value={[isOpenChat, setIsOpenChat]}>
      <div
        className="grid grid-cols-[1fr_5fr] gap-4 h-screen"
        style={{ scrollbarGutter: 'stable' }}
      >
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
        {/* Chat Inbox - fixed position, outside main layout */}
        {isOpenChat && (
          <Portal>
            <Inbox />
          </Portal>
        )}
      </div>
    </IsOpenChatContext.Provider>
  );
}
