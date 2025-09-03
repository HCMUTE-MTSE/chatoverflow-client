import {
   BiUpvote,
   BiSolidUpvote,
   BiDownvote,
   BiSolidDownvote,
} from 'react-icons/bi';

interface HeaderProps {
   ownerAvatar: string;
   ownerName: string;
   totalUpvote: number;
   totalDownvote: number;
}
export default function Header({
   ownerAvatar,
   ownerName,
   totalUpvote,
   totalDownvote,
}: HeaderProps) {
   return (
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-3">
            <img
               src={ownerAvatar}
               alt={ownerName}
               className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{ownerName}</span>
         </div>
         <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-[#6DFF8D]">
               <BiSolidUpvote size={16} />
               <span className="px-1 bg-[#212734] rounded-sm">
                  {totalUpvote}
               </span>
            </div>
            <div className="flex items-center gap-1 text-[#FF6D6D]">
               <BiDownvote size={16} />{' '}
               <span className="px-1 bg-[#212734] rounded-sm">
                  -{totalDownvote}
               </span>
            </div>
         </div>
      </div>
   );
}
