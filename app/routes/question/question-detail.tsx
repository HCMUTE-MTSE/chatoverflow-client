import { useParams } from 'react-router-dom';
import QuestionDetail from '~/components/page/question-pages/questtion-detail/QuestionDetail';

const questionData = {
   ownerAvatar: 'https://i.pravatar.cc/100?img=5',
   ownerName: 'Satheesh',
   totalUpvote: 12,
   totalDownvote: 4,
   header:
      'How to refresh all the data inside the Datatable and move the data into original place after closing the modal popup close button',
   askedTime: 'Asked 2 days ago',
   totalAnswer: 900,
   totalView: 5.2,
   content:
      'When the user clicks a button for the first time, a spinner is displayed, the close button is disabled\n ',
   snippet: `$(document).ready(function () {
  var enabledExportCount = 5000;
  $("#partsLibSearchModal").on("show.bs.modal", function (e) {
    $("#partsLibSearchFilter").val('');
  });
});`,
   image: '',
   tags: ['javascript', 'react.js', 'invalid fields', 'deployment'],
};

function QuestionDetailRoute() {
   const { id } = useParams();

   return <QuestionDetail questionData={questionData}></QuestionDetail>;
}

export default QuestionDetailRoute;
