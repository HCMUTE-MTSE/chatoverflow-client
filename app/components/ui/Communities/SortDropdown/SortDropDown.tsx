import React, { useState } from 'react';

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  sort: string;
  onChange: (val: string) => void;
  options: SortOption[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sort,
  onChange,
  options,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between bg-[#181A20] text-white px-4 py-3 rounded-lg min-w-[180px] hover:bg-[#23262F] transition"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Icon trái */}
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        {/* Label */}
        <span className="flex-1 text-left">
          {options.find((o) => o.value === sort)?.label}
        </span>

        {/* Icon phải */}
        <svg
          className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-[#181A20] rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 flex items-center justify-between
                ${
                  option.value === sort
                    ? 'bg-[#23262F] text-[#FFB800] font-semibold'
                    : 'text-[#6e7fb2] hover:bg-[#23262F]'
                }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
