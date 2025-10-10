import { getUser } from '~/services/api/user/user.service';

let currentUserCache: { id: string; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

const normalizeUserId = (userObj: any): string | null => {
  return userObj?.userId || userObj?._id || null;
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return null;
  }

  if (
    currentUserCache &&
    Date.now() - currentUserCache.timestamp < CACHE_DURATION
  ) {
    return currentUserCache.id;
  }

  try {
    const response = await getUser();

    if (response.success && response.data?.user) {
      const userId = normalizeUserId(response.data.user);
      if (userId) {
        currentUserCache = { id: userId, timestamp: Date.now() };
        return userId;
      }
    }
  } catch (error) {}

  return null;
};

export const getUserProfileLink = async (userId: string): Promise<string> => {
  const currentUserId = await getCurrentUserId();
  return currentUserId === userId ? '/profile-view' : `/user/${userId}`;
};

export const clearCurrentUserCache = () => {
  currentUserCache = null;
};
