import * as React from 'react';
import header from '../../lang/en/header';
import { useNavigate } from 'react-router';
import { logout as logoutService } from '~/services/api/auth/logout.service';
import NotificationIcon from '../ui/NotificationIcon';
import { IsOpenChatContext } from '~/root';

import { SearchPage } from '../page/global-search/SearchPage';
import { ChatIcon } from '~/libs/icons';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const [nickName, setNickName] = React.useState(header.defaultNickName);
  const [avatar, setAvatar] = React.useState(header.defaultAvatar);
  const [mounted, setMounted] = React.useState(false);
  const [isOpenChat, setIsOpenChat] = React.useContext(IsOpenChatContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const nn = window.localStorage.getItem('nickName');
      const av = window.localStorage.getItem('avatar');

      if (nn) setNickName(nn);
      if (av) setAvatar(av);
    }
  }, []);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const initials =
    nickName?.trim()?.[0]?.toUpperCase() || header.defaultNickName[0];
  const goStatistics = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (token) {
        navigate('/statistics');
      } else {
        navigate('/login');
      }
    }
  };

  const goProfile = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (token) {
        navigate('/profile-view');
      } else {
        navigate('/login');
      }
    }
  };

  const handleLogout = async () => {
    setOpen(false);
    try {
      await logoutService();
    } catch (err) {
      console.error('Logout failed:', err);
      //fallback
      localStorage.removeItem('token');
      localStorage.removeItem('nickName');
      localStorage.removeItem('avatar');
    } finally {
      setNickName(header.defaultNickName);
      setAvatar(header.defaultAvatar);
      navigate('/login');
    }
  };

  if (!mounted) {
    return (
      <header className="w-full sticky top-0 z-10 bg-gray-950/70 backdrop-blur border-b border-gray-800">
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="flex-1 flex justify-center">
            <input
              placeholder={header.search}
              className="w-full max-w-md h-10 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </header>
    );
  }
  console.log('resolve merge conflict');
  return (
    <header className="w-full sticky top-0 z-10 bg-gray-950/70 backdrop-blur border-b border-gray-800">
      <div className="px-6 py-4 flex items-center gap-4">
        {/* Search */}
        <SearchPage />

        {/* Open chat */}
        <button
          onClick={() => {
            setIsOpenChat(!isOpenChat);
          }}
        >
          <ChatIcon />
        </button>

        {/* Notifications */}
        <NotificationIcon />

        {/* Avatar + Dropdown */}
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-gray-700 hover:ring-orange-500 transition"
          >
            {avatar ? (
              <img
                alt="avatar"
                src={avatar}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-700 text-white text-sm font-bold">
                {initials}
              </div>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-2">
              <div className="px-3 py-2 text-sm text-gray-300">
                <p className="font-semibold text-white truncate">{nickName}</p>
              </div>
              <div className="h-px bg-gray-800 my-1" />
              <button
                onClick={goProfile}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800"
              >
                {header.profile}
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/create-blog');
                }}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800"
              >
                {header.createBlog}
              </button>
              <button
                onClick={goStatistics}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800"
              >
                {header.statistics}
              </button>
              <div className="h-px bg-gray-800 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-300 rounded-md hover:bg-gray-800"
              >
                {header.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
