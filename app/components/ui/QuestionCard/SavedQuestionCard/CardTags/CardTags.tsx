import React from "react";

interface CardTagsProps {
  tags: string[];
}

export default function CardTags({ tags }: CardTagsProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-800 text-indigo-200 rounded-md px-3 py-1 text-sm cursor-pointer
                     hover:bg-indigo-900 active:bg-indigo-950 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
