interface Tag {
  name: string;
  count: string;
}

interface PopularTagsProps {
  tags: Tag[];
}

export default function PopularTags({ tags }: PopularTagsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
      <div className="flex flex-col gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-800 rounded text-xs cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <span className="text-blue-300 font-medium">{tag.name}</span>
            <span className="text-gray-400">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
