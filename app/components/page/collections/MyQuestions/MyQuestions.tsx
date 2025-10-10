import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getUserQuestions,
  type Question,
} from '~/services/api/topic/question.service';
import { getUser } from '~/services/api/user/user.service';

import type { User } from '~/components/ui/QuestionCard/DefaultQuestionCard/type';

import DefaultQuestionCard from '~/components/ui/QuestionCard/DefaultQuestionCard/QuestionCard';

function MyQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);

      const userData = await getUser();
      const questions = await getUserQuestions(userData.data.user.userId);

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
      <h2>My Questions</h2>
      <div className="p-8 grid grid-cols-2 items-center gap-4">
        {questions.map((q) => (
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
            // onClick={() => navigate(`/question/${q._id}`)}
            onClick={() => navigate(`/question/${q._id}/edit`)}
          />
        ))}
      </div>
    </div>
  );
}

export default MyQuestions;
