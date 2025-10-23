import React from 'react';
import { Link, useLocation } from 'react-router';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function NavItem({
  to,
  icon,
  text,
  className,
  style,
}: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="relative">
      <Link
        onClick={() => console.log('____________________Navigating-To: ', to)}
        to={to}
        className={`
               flex items-center gap-4 px-4 py-4 mx-4 rounded-lg transition-all duration-300 text-lg font-medium
               ${
                 isActive
                   ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-orange-400'
                   : 'text-white hover:text-white hover:bg-gray-800/50'
               }
               ${className || ''}
            `}
        style={style}
      >
        <div className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`}>
          {icon}
        </div>
        <span className={isActive ? 'font-bold' : ''}>{text}</span>
      </Link>
    </li>
  );
}
