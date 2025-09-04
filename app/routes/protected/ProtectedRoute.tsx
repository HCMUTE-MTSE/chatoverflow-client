import * as React from 'react';
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
   const token =
      typeof window !== 'undefined'
         ? window.localStorage.getItem('token')
         : null;

   if (!token) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
}
