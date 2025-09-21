import * as React from 'react';
import { useParams } from 'react-router-dom';

import { EditQuestion } from '../../components/page/ask-edit-question/EditQuestion';

export default function EditQuestionPage() {
  const { id } = useParams();
  return (
    <div className="h-full">
      <EditQuestion questionId={id} />
    </div>
  );
}
