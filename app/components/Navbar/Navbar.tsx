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
  BlogIcon,
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

  { id: 'blog', to: '/blog', icon: <BlogIcon />, text: navbar.blog },

  { id: 'ask', to: '/ask', icon: <AskIcon />, text: navbar.ask },
];
export default function Navbar() {
  return (
    <nav className="h-screen bg-gray-900 border-r flex flex-col">
      <Logo />
      <ul className="list-none m-0 p-0 flex flex-col gap-1 flex-1">
        {navItemsData.map(({ id, to, icon, text }) => (
          <NavItem key={id} to={to} icon={icon} text={text} />
        ))}
      </ul>
    </nav>
  );
}
