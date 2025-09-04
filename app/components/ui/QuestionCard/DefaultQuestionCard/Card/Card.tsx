import React from 'react';

interface CardProps {
   className?: string;
   children: React.ReactNode;
   onClick?: () => void;
}

export default function Card({ className, children, onClick }: CardProps) {
   return (
      <button
         onClick={onClick}
         className={`bg-black rounded-xl p-6 my-4 w-full max-w-3xl cursor-pointer
            transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg hover:bg-neutral-900
            active:translate-y-0 active:shadow-md
            ${className ?? ''}`}
      >
         {children}
      </button>
   );
}
