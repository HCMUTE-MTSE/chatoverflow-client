import { useCallback } from 'react';
import { deleteAnswer } from '~/services/api/topic/answer.service';
import type { ProfileApiResponse } from './useProfileData';
import type { AnswerApiResponse } from './useAnswer';

interface ModalState {
  type: 'confirm' | 'success' | null;
  open: boolean;
  answerId?: string;
  message?: string;
}

export function useDeleteAnswer(
  token: string | null,
  setProfileData: React.Dispatch<
    React.SetStateAction<ProfileApiResponse | null>
  >,
  setAnswersData: React.Dispatch<
    React.SetStateAction<AnswerApiResponse['data']>
  >,
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
) {
  const handleDelete = useCallback(
    (answerId: string) => {
      setModal({
        open: true,
        type: 'confirm',
        answerId,
        message: 'Are you sure you want to delete this answer?',
      });
    },
    [setModal]
  );

  const confirmDelete = useCallback(
    async (answerId: string | undefined) => {
      if (!answerId || !token) return;

      try {
        const res = await deleteAnswer(answerId, token);
        if (res.success) {
          setProfileData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              statistics: {
                ...prev.statistics,
                totalAnswers: prev.statistics.totalAnswers - 1,
              },
            };
          });
          setAnswersData((prev) => prev.filter((ans) => ans._id !== answerId));
          setModal({
            open: true,
            type: 'success',
            message: 'Deleted answer successfully',
          });
        } else {
          setModal({
            open: true,
            type: 'success',
            message: res.message || 'Failed to delete answer',
          });
        }
      } catch (err) {
        console.error('Error deleting answer:', err);
        setModal({
          open: true,
          type: 'success',
          message: 'Failed to delete answer',
        });
      }
    },
    [token, setProfileData, setModal]
  );

  return { handleDelete, confirmDelete };
}
