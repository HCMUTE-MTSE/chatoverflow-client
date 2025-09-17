import React, { useState } from 'react';

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
  maxTags?: number;
};

const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  suggestions,
  maxTags = 5,
}) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = suggestions
    .filter(
      (tag) =>
        tag.toLowerCase().includes(input.toLowerCase()) && !value.includes(tag)
    )
    .slice(0, 5);

  const handleAdd = (tag: string) => {
    if (value.length < maxTags && !value.includes(tag)) {
      onChange([...value, tag]);
      setInput('');
      setShowDropdown(false);
    }
  };

  const handleRemove = (tag: string) =>
    onChange(value.filter((t) => t !== tag));

  return (
    <div className="relative">
      <div className="w-full bg-[#181A20] rounded-md px-3 py-2 flex items-center gap-2 border border-[#23272F] focus-within:border-orange-400 transition-all">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          className="flex-1 bg-transparent text-white outline-none border-none min-w-[80px]"
          placeholder={value.length >= maxTags ? '' : 'Add tag...'}
          disabled={value.length >= maxTags}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered[0]) {
              e.preventDefault();
              handleAdd(filtered[0]);
            }
            if (e.key === 'Backspace' && !input && value.length > 0) {
              handleRemove(value[value.length - 1]);
            }
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-[#23272F] text-white px-3 py-1 rounded-full flex items-center text-xs font-semibold border border-[#23272F] hover:border-orange-400 transition-all"
          >
            {tag.toUpperCase()}
            <button
              type="button"
              className="ml-2 text-xs text-gray-400 hover:text-orange-400"
              onClick={() => handleRemove(tag)}
              tabIndex={-1}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {showDropdown && input && filtered.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-[#23272F] border border-gray-700 rounded shadow">
          {filtered.map((tag) => (
            <div
              key={tag}
              className="px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer rounded"
              onMouseDown={() => handleAdd(tag)}
            >
              {tag.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
