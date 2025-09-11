import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { parseJwt } from '~/utils/jwt';

export default function ProtectedRoute() {
  const token =
    typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  const location = useLocation();

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
