import React from 'react';

import styles from './NavItem.module.css';

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
   return (
      <li className={styles.navItem}>
         <a
            href={to}
            className={`${styles.link} ${className}`}
            style={style}
         >
            {icon}
            {text}
         </a>
      </li>
   );
}
