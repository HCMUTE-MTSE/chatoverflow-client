import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  hint,
  required = false,
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  // Debug: Log để kiểm tra giá trị và options
  console.log(`Select ${label}:`, {
    value,
    options: options.map((opt) => ({ value: opt.value, label: opt.label })),
    selectedOption,
    found: !!selectedOption,
  });

  const displayText = selectedOption
    ? selectedOption.label
    : placeholder || 'Chọn...';

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

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
        <div className="relative" ref={dropdownRef}>
          {/* Custom Dropdown Button */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={clsx(
              'inline-flex w-full justify-between gap-x-1.5 rounded-md px-6 py-4 text-base font-semibold transition-colors',
              disabled
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-gray-800 text-white hover:bg-gray-700 focus:border-purple-500',
              'border border-gray-700 focus:outline-none focus:ring-0',
              !selectedOption && !disabled && 'text-gray-400'
            )}
          >
            <span className="truncate">{displayText}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className={clsx(
                'size-5 text-gray-400 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            >
              <path
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && !disabled && (
            <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-gray-800 border border-gray-700 shadow-lg transition-all duration-100 ease-out">
              <div className="py-1 max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionClick(option.value)}
                    className={clsx(
                      'block w-full px-4 py-2 text-left text-sm transition-colors',
                      option.value === value
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
