import * as React from 'react';
import { Outlet } from 'react-router';

import Navbar from '~/components/Navbar/Navbar';

export default function Layout() {
   return (
      <div className="grid grid-cols-[1fr_5fr] gap-4 h-screen">
         <Navbar />
         <Outlet />
      </div>
   );
}
