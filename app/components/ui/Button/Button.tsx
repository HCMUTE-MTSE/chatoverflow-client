import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
   onClick?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => void;
   children: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
}

export default function Button({
   onClick,
   children,
   className,
   style,
}: ButtonProps) {
   const appliedClass = `${styles.button} ${className}`;
   return (
      <button
         className={appliedClass}
         onClick={onClick}
         style={style}
      >
         {' '}
         {children}{' '}
      </button>
   );
}
