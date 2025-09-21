import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getQuestionDetail,
  type Question,
} from '~/services/api/topic/question.service';
import QuestionDetail from '~/components/page/question-pages/questtion-detail/QuestionDetail';

function QuestionDetailRoute() {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.log('missing id');
      return;
    }

    async function fetchData() {
      setLoading(true);
      const question = await getQuestionDetail(id);
      setQuestionData(question);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading question...</div>;
  }

  if (!questionData) {
    return (
      <div className="text-center py-10 text-red-500">Question not found</div>
    );
  }

  const mappedData = {
    ownerAvatar: questionData.user.avatar,
    ownerName: questionData.user.name,
    totalUpvote: questionData.upvotedBy?.length || 0,
    totalDownvote: questionData.downvotedBy?.length || 0,
    header: questionData.title,
    askedTime: new Date(questionData.askedTime).toLocaleString(),
    totalAnswer: questionData.answerCount || 0,
    totalView: questionData.views,
    content: questionData.content,
    snippet: '', // keep empty for now, impolement later :))))
    image: '', // keep empty for now, impolement later :))))
    tags: questionData.tags,
  };

  return <QuestionDetail questionData={mappedData}></QuestionDetail>;
}

export default QuestionDetailRoute;
