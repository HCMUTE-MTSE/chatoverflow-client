import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionDetail from '~/components/page/question-pages/questtion-detail/QuestionDetail';
import type { Answer } from '~/components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import {
  getQuestionDetail,
  type Question,
} from '~/services/api/topic/question.service';
import {
  getAnswersByQuestionId,
  getTotalAnswersByQuestionId,
} from '~/services/api/topic/answer.service';

function QuestionDetailRoute() {
  const { id } = useParams<{ id: string }>();

  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalAnswers, setTotalAnswers] = useState<number>(0);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [loadingAnswers, setLoadingAnswers] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoadingQuestion(true);
      setLoadingAnswers(true);

      try {
        const question = await getQuestionDetail(id);
        setQuestionData(question);
      } catch (err) {
        console.error('Failed to fetch question detail:', err);
        setQuestionData(null);
      } finally {
        setLoadingQuestion(false);
      }

      try {
        const answersRes = await getAnswersByQuestionId(id);
        setAnswers(answersRes.data || []);

        const totalRes = await getTotalAnswersByQuestionId(id);
        setTotalAnswers(totalRes.data?.total || 0);
      } catch (err) {
        console.error('Failed to fetch answers or total:', err);
        setAnswers([]);
        setTotalAnswers(0);
      } finally {
        setLoadingAnswers(false);
      }
    };

    fetchData();
  }, [id]);

  if (loadingQuestion) {
    return <div className="text-center py-10">Loading question...</div>;
  }

  if (!questionData) {
    return (
      <div className="text-center py-10 text-red-500">Question not found</div>
    );
  }

  const mappedQuestion = {
    questionId: questionData._id,
    ownerId: questionData.user._id,
    ownerAvatar: questionData.user.avatar || '/assets/images/defaultavatar.png',
    ownerName: questionData.user.name,
    totalUpvote: questionData.upvotedBy?.length || 0,
    totalDownvote: questionData.downvotedBy?.length || 0,
    header: questionData.title,
    askedTime: new Date(questionData.createdAt).toLocaleString(),
    totalAnswer: totalAnswers,
    totalView: questionData.views || 0,
    content: questionData.content,
    tags: questionData.tags || [],
  };

  return (
    <QuestionDetail
      questionData={mappedQuestion}
      initialAnswers={answers}
      loadingAnswers={loadingAnswers}
      totalAnswers={totalAnswers}
      setTotalAnswers={setTotalAnswers}
    />
  );
}

export default QuestionDetailRoute;
