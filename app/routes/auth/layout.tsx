import type { ReactNode } from 'react';
import { Outlet } from 'react-router';

export default function AuthLayout({}: { children?: ReactNode }) {
   return <Outlet />;
}
