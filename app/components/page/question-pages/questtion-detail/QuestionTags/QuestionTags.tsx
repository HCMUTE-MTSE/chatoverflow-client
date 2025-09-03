interface QuestionTagsProps {
   tags: string[];
}

export default function QuestionTags({ tags }: QuestionTagsProps) {
   return (
      <div className="flex flex-wrap gap-2 mt-3">
         {tags.map((tag, i) => (
            <span
               key={i}
               className="bg-[#151821] text-[#7B8EC8] text-xs font-medium px-2 py-1 rounded-md"
            >
               {tag}
            </span>
         ))}
      </div>
   );
}
