import { useState, useEffect } from 'react';
import { getUser, getUserById } from '~/services/api/user/user.service';
import type { UserResponse } from '~/models/res/user.response';
import type { Answer } from '../../components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';

export interface ProfileApiResponse {
  user: UserResponse;
  statistics: {
    totalPosts: number;
    totalAnswers: number;
    totalContributions: number;
  };
}
export function useProfileDataById(userId: string) {
  const [data, setData] = useState<ProfileApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        if (response.success && response.data && isMounted) {
          setData(response.data);
        } else if (isMounted) {
          setError('Failed to load profile data');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading user data:', err);
          setError('Failed to load profile data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, setData };
}
export function useProfileData() {
  const [data, setData] = useState<ProfileApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        if (response.success && response.data && isMounted) {
          setData(response.data);
        } else if (isMounted) {
          setError('Failed to load profile data');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading user data:', err);
          setError('Failed to load profile data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, setData };
}
