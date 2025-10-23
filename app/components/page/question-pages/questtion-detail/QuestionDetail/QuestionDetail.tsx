import React, { useEffect, useState } from 'react';
import Header from '../Header';
import QuestionHeader from '../QuestionHeader';
import QuestionStats from '../QuestionStats';
import QuestionContent from '../QuestionContent';
import QuestionTags from '../QuestionTags';
import QuestionAnswer, { type Answer } from '../QuestionAnswer/QuestionAnswer';
import { increaseQuestionView } from '~/services/api/topic/question.service';

interface QuestionDetailProps {
  questionData: {
    questionId: string;
    ownerId: string;
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
  initialAnswers: Answer[];
  loadingAnswers?: boolean;
}

export default function QuestionDetail({
  questionData,
  initialAnswers,
  loadingAnswers = false,
  totalAnswers,
  setTotalAnswers,
}: QuestionDetailProps & {
  totalAnswers: number;
  setTotalAnswers: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [question, setQuestionData] = useState(questionData);
  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);
  useEffect(() => {
    if (!questionData?.questionId) return;

    const timeoutId = setTimeout(async () => {
      try {
        await increaseQuestionView(questionData.questionId);

        setQuestionData((prev) => ({
          ...prev,
          totalView: prev.totalView + 1,
        }));
      } catch (error) {
        console.error('Failed to increase view count:', error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [questionData?.questionId]);

  return (
    <div className="max-w-3xl mx-auto bg-gray-950 p-6 rounded-xl shadow-md">
      <Header
        questionId={question.questionId}
        ownerId={question.ownerId}
        ownerAvatar={question.ownerAvatar || '/assets/images/defaultavatar.png'}
        ownerName={question.ownerName}
        totalUpvote={question.totalUpvote}
        totalDownvote={question.totalDownvote}
      />

      <QuestionHeader header={question.header} />

      <QuestionStats
        askedTime={question.askedTime}
        totalAnswer={totalAnswers}
        totalView={question.totalView}
      />

      <QuestionContent content={question.content} />

      <QuestionTags tags={question.tags} />

      <QuestionAnswer
        questionId={question.questionId}
        answers={answers}
        setAnswers={setAnswers}
        loading={loadingAnswers}
        totalAnswers={totalAnswers}
        setTotalAnswers={setTotalAnswers}
      />
    </div>
  );
}
