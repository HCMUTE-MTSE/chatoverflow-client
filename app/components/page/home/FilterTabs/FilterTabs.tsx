interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
}

export default function FilterTabs({
  filters,
  activeFilter,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-1 mb-5">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-5 py-2 rounded transition-colors ${
            activeFilter === filter
              ? 'bg-gray-700 text-orange-400 border-orange-400'
              : 'bg-gray-800 text-[#7B8EC8] border-transparent hover:text-gray-200 hover:bg-gray-700'
          }`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
