import { FaRegClock, FaRegEye } from 'react-icons/fa';
import { LuMessageSquareCode } from 'react-icons/lu';

interface QuestionStatsProps {
   askedTime: string;
   totalAnswer: number;
   totalView: number;
}

export default function QuestionStats({
   askedTime,
   totalAnswer,
   totalView,
}: QuestionStatsProps) {
   return (
      <div className="flex items-center gap-6 text-sm text-gray-400 mb-6 mt-4">
         <div className="flex items-center gap-1">
            <FaRegClock size={14} className="text-blue-500" /> {askedTime}
         </div>
         <div className="flex items-center gap-1">
            <LuMessageSquareCode size={14} className="text-blue-500" />{' '}
            {totalAnswer} Answers
         </div>
         <div className="flex items-center gap-1">
            <FaRegEye size={14} className="text-blue-500" /> {totalView}k Views
         </div>
      </div>
   );
}
