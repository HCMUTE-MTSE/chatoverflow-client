import React from 'react';

import styles from './Navbar.module.css';
import Logo from '../Logo/Logo';
import NavItem from '../NavItem/NavItem';
import {
   HomeIcon,
   DiscoverIcon,
   PodcastIcon,
   ProfileIcon,
} from '../../libs/icons';

const navItemsData = [
   { id: 'home', to: '/', icon: <HomeIcon />, text: 'Home' },
   {
      id: 'shop',
      to: '/shop',
      icon: <DiscoverIcon />,
      text: 'Shop',
   },
   {
      id: 'invoice',
      to: '/invoice',
      icon: <PodcastIcon />,
      text: 'Invoice',
   },
   {
      id: 'profile',
      to: '/profile',
      icon: <ProfileIcon />,
      text: 'Profile',
   },
];
export default function Navbar() {
   return (
      <nav className="h-screen bg-gray-900 border-r flex flex-col">
         <Logo />
         <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {navItemsData.map(({ id, to, icon, text }) => (
               <NavItem key={id} to={to} icon={icon} text={text} />
            ))}
         </ul>
      </nav>
   );
}
