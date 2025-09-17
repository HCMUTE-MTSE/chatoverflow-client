import React from 'react';

import MyQuestions from '~/components/page/collections/MyQuestions';
import MyBlogs from '~/components/page/collections/MyBlogs';
function AllCollections() {
  return (
    <div>
      <h1>Collections</h1>
      <MyQuestions />
      <MyBlogs />
    </div>
  );
}

export default AllCollections;
