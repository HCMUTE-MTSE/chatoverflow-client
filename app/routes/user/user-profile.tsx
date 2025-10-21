import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import UserProfilePage from '~/components/page/profile/UserProfilePage';
import { getCurrentUserId } from '~/utils/userUtils';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const currentUserId = await getCurrentUserId();
      if (currentUserId === userId) {
        navigate('/profile-view', { replace: true });
      }
    };
    checkCurrentUser();
  }, [userId, navigate]);

  return <UserProfilePage userId={userId!} />;
}
