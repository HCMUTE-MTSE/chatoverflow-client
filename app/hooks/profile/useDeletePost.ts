import { useCallback } from 'react';
import { deleteQuestion } from '~/services/api/topic/question.service';
import type { ProfileApiResponse } from './useProfileData';

export function useDeletePost(
  token: string | null,
  setProfileData: React.Dispatch<
    React.SetStateAction<ProfileApiResponse | null>
  >,
  setModal: (modal: {
    type: 'confirm' | 'success' | null;
    open: boolean;
    postId?: string;
    message?: string;
  }) => void
) {
  const handleDelete = useCallback(
    (postId: string) => {
      setModal({
        open: true,
        type: 'confirm',
        postId,
        message: 'Are you sure you want to delete this post?',
      });
    },
    [setModal]
  );

  const confirmDelete = useCallback(
    async (postId?: string) => {
      if (!postId || !token) return;

      try {
        const res = await deleteQuestion(postId, token);
        if (res.success) {
          setProfileData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              posts: prev.posts.filter((post) => post._id !== postId),
              statistics: {
                ...prev.statistics,
                totalPosts: prev.statistics.totalPosts - 1,
              },
            };
          });
          setModal({
            open: true,
            type: 'success',
            message: 'Deleted post successfully',
          });
        } else {
          setModal({
            open: true,
            type: 'success',
            message: res.message || 'Failed to delete post',
          });
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        setModal({
          open: true,
          type: 'success',
          message: 'Failed to delete post',
        });
      }
    },
    [token, setProfileData, setModal]
  );

  return { handleDelete, confirmDelete };
}
