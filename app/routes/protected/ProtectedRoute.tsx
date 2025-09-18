import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { parseJwt } from '~/utils/jwt';

export default function ProtectedRoute() {
  const [hydrated, setHydrated] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setHydrated(true); // Chỉ chạy logic sau khi client đã mount
  }, []);

  if (!hydrated) {
    // Trong SSR: tạm render rỗng để tránh Navigate trên server
    return null;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const decoded = parseJwt(token);
  const now = Date.now() / 1000;

  if (!decoded?.exp || decoded.exp < now) {
    localStorage.removeItem('token');
    localStorage.removeItem('nickName');
    localStorage.removeItem('avatar');
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
