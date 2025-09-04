import React, { useEffect, useState } from "react";
import DefaultQuestionCard from "../components/ui/QuestionCard/DefaultQuestionCard/QuestionCard";
import type { User } from "../components/ui/QuestionCard/DefaultQuestionCard/type";
import {
  getQuestionsByType,
  type Question,
} from "../services/api/topic/question.service";

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const type = "newest";

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const data = await getQuestionsByType(type);
      setQuestions(data);
      setLoading(false);
    }
    fetchQuestions();
  }, [type]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      {questions.map((q) => (
        <DefaultQuestionCard
          key={q._id}
          title={q.title}
          tags={q.tags}
          user={
            {
              name: q.user.name,
              avatar: q.user.avatar || "/avatar.jpg",
            } as User
          }
          time={new Date(q.askedTime).toLocaleString()}
          votes={q.upvotedBy.length}
          answers={q.answerCount ?? 0}
          views={q.views}
          onClick={() => alert(`Clicked: ${q.title}`)}
        />
      ))}
    </div>
  );
}
