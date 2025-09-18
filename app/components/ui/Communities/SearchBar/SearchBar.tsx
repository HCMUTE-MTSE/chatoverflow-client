import React from 'react';
import { SearchIcon } from '~/libs/icons';

interface SearchBarProps {
  search: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onChange }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <input
        className="w-full bg-[#181A20] text-white rounded-lg px-4 py-3 pl-10 focus:outline-none placeholder-[#6e7fb2]"
        placeholder="Search by username..."
        value={search}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F767E]">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
