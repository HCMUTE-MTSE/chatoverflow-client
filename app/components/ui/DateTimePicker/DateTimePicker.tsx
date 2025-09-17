import clsx from 'clsx';
import React from 'react';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'date' | 'datetime-local' | 'time';
}

export default function DateTimePicker({
  label,
  value,
  onChange,
  placeholder = 'Chọn ngày',
  hint,
  required = false,
  className,
  disabled = false,
  type = 'date',
}: DateTimePickerProps) {
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
        <div className="w-full bg-gray-800 border border-gray-700 rounded-md p-4 flex items-center gap-3 transition-colors focus-within:border-purple-500">
          {/* Calendar Icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>

          {/* Date Input */}
          <input
            type={type}
            value={value}
            onChange={(e) => {
              console.log(
                `DateTimePicker ${label} changed to:`,
                e.target.value
              );
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-white text-base font-semibold outline-none border-none placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
