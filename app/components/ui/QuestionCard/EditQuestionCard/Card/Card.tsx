import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({ children, onClick, className }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-xl p-6 my-4 w-full max-w-3xl cursor-pointer
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-700
                  active:translate-y-0 active:shadow-md border-1 border-indigo-100
                  ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
