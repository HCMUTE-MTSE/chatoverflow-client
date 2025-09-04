interface CardTagsProps {
   tags: string[];
}

export default function CardTags({ tags }: CardTagsProps) {
   return (
      <div className="mb-4 flex flex-wrap gap-2">
         {tags.map((tag) => (
            <span
               key={tag}
               className="bg-[#23234a] text-[#b3b3ff] rounded-lg px-3 py-1 text-sm
                     cursor-pointer transition-colors duration-200
                     hover:bg-[#2e2e6a] active:bg-[#1a1a3a]"
            >
               {tag}
            </span>
         ))}
      </div>
   );
}
