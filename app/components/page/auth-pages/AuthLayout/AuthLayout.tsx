import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
         {children}
      </div>
   );
}
