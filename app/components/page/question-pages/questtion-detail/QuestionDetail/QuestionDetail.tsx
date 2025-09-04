import Header from '../Header';
import QuestionHeader from '../QuestionHeader';
import QuestionStats from '../QuestionStats';
import QuestionContent from '../QuestionContent';
import QuestionTags from '../QuestionTags';

interface QuestionDetailProps {
   questionData: {
      ownerAvatar: string;
      ownerName: string;
      totalUpvote: number;
      totalDownvote: number;
      header: string;
      askedTime: string;
      totalAnswer: number;
      totalView: number;
      content: string;
      snippet?: string;
      image?: string;
      tags: string[];
   };
}

export default function QuestionDetail({ questionData }: QuestionDetailProps) {
   return (
      <div className="max-w-3xl mx-auto bg-gray-950 p-6 rounded-xl shadow-md">
         <Header
            ownerAvatar={questionData.ownerAvatar}
            ownerName={questionData.ownerName}
            totalUpvote={questionData.totalUpvote}
            totalDownvote={questionData.totalDownvote}
         />
         <QuestionHeader header={questionData.header} />
         <QuestionStats
            askedTime={questionData.askedTime}
            totalAnswer={questionData.totalAnswer}
            totalView={questionData.totalView}
         />
         <QuestionContent
            content={questionData.content}
            snippet={questionData.snippet}
            image={questionData.image}
         />
         <QuestionTags tags={questionData.tags} />
      </div>
   );
}
