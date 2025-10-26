import React from 'react';

import MyQuestions from '~/components/page/collections/MyQuestions';
import MyBlogs from '~/components/page/collections/MyBlogs';
import { useNavigate } from 'react-router';

function MyCollections() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  return (
    <div>
      <MyQuestions />
      <br />
      <MyBlogs />
    </div>
  );
}

export default MyCollections;
