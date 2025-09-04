import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getQuestionDetail,
  type Question,
} from '~/services/api/topic/question.service';
import QuestionDetail from '~/components/page/question-pages/questtion-detail/QuestionDetail';
import type { Q } from 'node_modules/react-router/dist/development/context-jKip1TFB.mjs';

// const questionData = {
//    ownerAvatar: 'https://i.pravatar.cc/100?img=5',
//    ownerName: 'Satheesh',
//    totalUpvote: 12,
//    totalDownvote: 4,
//    header:
//       'How to refresh all the data inside the Datatable and move the data into original place after closing the modal popup close button',
//    askedTime: 'Asked 2 days ago',
//    totalAnswer: 900,
//    totalView: 5.2,
//    content:
//       'When the user clicks a button for the first time, a spinner is displayed, the close button is disabled\n ',
//    snippet: `$(document).ready(function () {
//   var enabledExportCount = 5000;
//   $("#partsLibSearchModal").on("show.bs.modal", function (e) {
//     $("#partsLibSearchFilter").val('');
//   });
// });`,
//    image: '',
//    tags: ['javascript', 'react.js', 'invalid fields', 'deployment'],
// };

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
