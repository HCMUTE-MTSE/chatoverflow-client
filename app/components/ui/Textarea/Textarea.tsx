import clsx from 'clsx';
import React from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required = false,
  className,
  disabled = false,
  rows = 3,
}: TextareaProps) {
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
        <div className="w-full bg-gray-800 border border-gray-700 rounded-md p-4 transition-colors focus-within:border-purple-500">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className="w-full bg-transparent text-white text-base font-semibold outline-none border-none placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed resize-none"
          />
        </div>
      </div>
    </div>
  );
}
