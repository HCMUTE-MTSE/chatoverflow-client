import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getUserVotedQuestions,
  type Question,
} from '~/services/api/topic/question.service';
import { parseJwt } from '~/utils/jwt';

import type { User } from '~/components/ui/QuestionCard/DefaultQuestionCard/type';

import EditQuestionCard from '~/components/ui/QuestionCard/EditQuestionCard/QuestionCard';
import DefaultQuestionCard from '~/components/ui/QuestionCard/DefaultQuestionCard/QuestionCard';

function MyQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const decoded = parseJwt(token);
      const parsedUserId = decoded?.sub;
      const questions = await getUserVotedQuestions(parsedUserId);

      setCurrentUserId(parsedUserId);
      setQuestions(questions);
      setLoading(false);
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading Question...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white">Voted Questions</h2>
      <div className="p-x-8 grid grid-cols-2 items-center gap-x-4">
        {questions.map((q) =>
          q.user._id === currentUserId ? (
            <EditQuestionCard
              key={q._id}
              title={q.title}
              tags={q.tags}
              user={
                {
                  name: q.user.name,
                  avatar: q.user.avatar || '/assets/images/defaultavatar.png',
                } as User
              }
              time={new Date(q.askedTime).toLocaleString()}
              votes={q.upvotedBy.length}
              answers={q.answerCount ?? 0}
              views={q.views}
              onClick={() => navigate(`/question/${q._id}`)}
              onEdit={() => navigate(`/question/${q._id}/edit`)}
            />
          ) : (
            <DefaultQuestionCard
              key={q._id}
              title={q.title}
              tags={q.tags}
              user={
                {
                  name: q.user.name,
                  avatar: q.user.avatar || '/assets/images/defaultavatar.png',
                } as User
              }
              time={new Date(q.askedTime).toLocaleString()}
              votes={q.upvotedBy.length}
              answers={q.answerCount ?? 0}
              views={q.views}
              onClick={() => navigate(`/question/${q._id}`)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default MyQuestions;
