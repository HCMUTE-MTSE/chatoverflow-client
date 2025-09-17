import React from 'react';
import styles from './Navbar.module.css';
import Logo from '../Logo/Logo';
import NavItem from '../NavItem/NavItem';
import {
  HomeIcon,
  CollectionsIcon,
  JobsIcon,
  TagsIcon,
  CommunitiesIcon,
  AskIcon,
} from '../../libs/icons';

import navbar from '../../lang/en/navbar';

const navItemsData = [
  { id: 'home', to: '/', icon: <HomeIcon />, text: navbar.home },
  {
    id: 'collections',
    to: '/collections',
    icon: <CollectionsIcon />,
    text: navbar.collections,
  },
  { id: 'jobs', to: '/jobs', icon: <JobsIcon />, text: navbar.jobs },
  { id: 'tags', to: '/tags', icon: <TagsIcon />, text: navbar.tags },
  {
    id: 'communities',
    to: '/communities',
    icon: <CommunitiesIcon />,
    text: navbar.communities,
  },
  { id: 'ask', to: '/ask', icon: <AskIcon />, text: navbar.ask },
];
export default function Navbar() {
  return (
    <nav className="h-screen bg-black flex flex-col pt-10 pb-8">
      {/* Logo section */}
      <div className="px-6 mb-18">
        <Logo />
      </div>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col justify-between">
        <ul className="list-none m-0 p-0 flex flex-col gap-6">
          {navItemsData.map(({ id, to, icon, text }) => (
            <NavItem key={id} to={to} icon={icon} text={text} />
          ))}
        </ul>

        {/* Logout section - giống Figma design */}
        <div className="px-4">
          <a
            href="/logout"
            className="flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-lg font-medium text-white"
          >
            <div className="w-6 h-6 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
