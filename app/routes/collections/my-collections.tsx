import React from 'react';

import MyQuestions from '~/components/page/collections/MyQuestions';
import MyBlogs from '~/components/page/collections/MyBlogs';

function MyCollections() {
  return (
    <div>
      <MyQuestions />
      <br />
      <MyBlogs />
    </div>
  );
}

export default MyCollections;
