import React from 'react';

import styles from './Card.module.css';

interface CardProps {
   className?: string;
   imgClassName?: string;
   imgSrc: string;
   imgAlt: string;
   children: React.ReactNode;
}
export default function Card({
   className,
   imgClassName,
   imgSrc,
   imgAlt,
   children,
}: CardProps) {
   return (
      <figure className={`${styles.card} ${className}`}>
         <img src={imgSrc} alt={imgAlt} className={imgClassName} />
         {children}
      </figure>
   );
}
