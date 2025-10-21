interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search for Questions Here..."
        className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-[#7B8EC8] focus:outline-none focus:border-gray-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
