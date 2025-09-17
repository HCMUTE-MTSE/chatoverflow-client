import clsx from 'clsx';
import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'date' | 'password';
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  required = false,
  className,
  disabled = false,
}: InputProps) {
  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <label className="text-gray-200 font-semibold text-base flex items-center gap-2">
        <span>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
        {hint && (
          <span className="text-blue-300 text-sm font-normal leading-relaxed">
            ({hint})
          </span>
        )}
      </label>
      <div className="flex flex-col gap-2">
        <div className="w-full bg-gray-800 border border-gray-700 rounded-md p-4 flex items-center transition-colors focus-within:border-purple-500">
          <input
            type={type}
            value={value}
            onChange={(e) => {
              console.log(`Input ${label} changed:`, e.target.value);
              onChange(e.target.value);
            }}
            onClick={() => console.log(`Input ${label} clicked`)}
            onFocus={() => console.log(`Input ${label} focused`)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent text-white text-base font-semibold outline-none border-none placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
