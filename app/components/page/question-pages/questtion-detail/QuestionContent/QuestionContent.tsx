interface QuestionContentProps {
   content: string;
   snippet?: string;
   image?: string;
}

// Todo: intergrate shiki for syntax highlighting
export default function QuestionContent({
   content,
   snippet,
   image,
}: QuestionContentProps) {
   return (
      <div className="mb-4">
         <p className="text-gray-100 mb-3 text-sm">{content}</p>

         {snippet && (
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm mb-3">
               <code>{snippet}</code>
            </pre>
         )}

         {image && (
            <img
               src={image}
               alt="question-attachment"
               className="rounded-lg shadow-md mb-3"
            />
         )}
      </div>
   );
}
