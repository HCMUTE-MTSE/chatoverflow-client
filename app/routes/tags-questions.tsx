import * as React from 'react';
import { useParams } from 'react-router-dom';
import { TagsPage } from '~/components/page/tags';
import { TagsWithQuestionPage } from '~/components/page/tags/TagsWithQuestionPage';

export default function Tags() {
  const { name } = useParams();

  return <TagsWithQuestionPage tagName={name!} />;
}
