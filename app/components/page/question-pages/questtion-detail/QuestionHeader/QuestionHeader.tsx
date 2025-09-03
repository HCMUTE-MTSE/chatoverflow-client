interface QuestionHeaderProps {
   header: string;
}

export default function QuestionHeader({ header }: QuestionHeaderProps) {
   return <h1 className="text-xl font-bold text-gray-200 mb-2">{header}</h1>;
}
