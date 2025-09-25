import React, { useEffect, useState } from 'react';
import Header from '../Header';
import QuestionHeader from '../QuestionHeader';
import QuestionStats from '../QuestionStats';
import QuestionContent from '../QuestionContent';
import QuestionTags from '../QuestionTags';
import QuestionAnswer, { type Answer } from '../QuestionAnswer/QuestionAnswer';

interface QuestionDetailProps {
  questionData: {
    questionId: string;
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

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);
  return (
    <div className="max-w-3xl mx-auto bg-gray-950 p-6 rounded-xl shadow-md">
      <Header
        questionId={questionData.questionId}
        ownerAvatar={questionData.ownerAvatar || '/avatar.jpg'}
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

      <QuestionContent content={questionData.content} />

      <QuestionTags tags={questionData.tags} />

      <QuestionAnswer
        questionId={questionData.questionId}
        answers={answers}
        setAnswers={setAnswers}
        loading={loadingAnswers}
        totalAnswers={totalAnswers}
        setTotalAnswers={setTotalAnswers}
      />
    </div>
  );
}
