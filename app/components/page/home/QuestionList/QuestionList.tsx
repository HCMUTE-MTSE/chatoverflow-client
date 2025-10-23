import DefaultQuestionCard from '../../../ui/QuestionCard/DefaultQuestionCard/QuestionCard';
import { type Question } from '~/services/api/topic/question.service';
import { useNavigate } from 'react-router-dom';

interface QuestionListProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {questions
        ?.filter((q) => q && q.user) // loại bỏ question hoặc user null
        .map((q) => {
          const rawTime = q.askedTime || q.createdAt;
          const formattedTime = rawTime
            ? new Date(rawTime).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : '';

          return (
            <DefaultQuestionCard
              key={q._id}
              title={q.title}
              tags={q.tags || []}
              user={{
                _id: q.user._id,
                name: q.user.name || 'Unknown',
                avatar: q.user.avatar || '/assets/images/defaultavatar.png',
              }}
              time={formattedTime}
              votes={(q.upvotedBy?.length || 0) - (q.downvotedBy?.length || 0)}
              answers={q.answerCount || 0}
              views={q.views || 0}
              onClick={() => navigate(`/question/${q._id}`)}
            />
          );
        })}
    </div>
  );
}
