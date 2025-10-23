import { useCallback, useEffect, useState, useRef } from 'react';
import type { Answer } from '~/components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import { getUserAnswers } from '~/services/api/user/user.service';

export interface AnswerApiResponse {
  data: Answer[];
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  };
}

export function useAnswer(userId: string | undefined) {
  const [answers, setAnswers] = useState<AnswerApiResponse['data']>([]);
  const [pagination, setPagination] = useState<
    AnswerApiResponse['pagination'] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Track fetched userId to prevent double fetch
  const fetchedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAnswers = async () => {
      if (!userId) {
        return;
      }

      // ✅ Skip if already fetched for this specific userId
      if (fetchedUserIdRef.current === userId) {
        console.log('⏭️ [SKIP] Already fetched answers for userId:', userId);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('📥 [INITIAL] Fetching answers for user:', userId);

        const answerData: AnswerApiResponse = await getUserAnswers(userId, 1);

        console.log('✅ [INITIAL] Raw API response:', answerData);
        console.log('✅ [INITIAL] Loaded answers:', {
          received: answerData.data?.length || 0,
          page: answerData.pagination?.page,
          limit: answerData.pagination?.limit,
          nextUrl: answerData.pagination?.nextUrl,
        });

        if (isMounted) {
          setAnswers(answerData.data || []);
          setPagination(answerData.pagination || null);
          fetchedUserIdRef.current = userId; // ✅ Mark this userId as fetched
          console.log('💾 [STATE] Answers in state:', answerData.data.length);
        }
      } catch (err) {
        if (isMounted) {
          console.error('❌ [ERROR] Fetching answers:', err);
          setError('Failed to load answers');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnswers();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // ✅ Reset when userId changes
  useEffect(() => {
    if (userId !== fetchedUserIdRef.current) {
      fetchedUserIdRef.current = null;
      setAnswers([]);
      setPagination(null);
    }
  }, [userId]);

  // Load more answers
  const loadMore = useCallback(async () => {
    if (!pagination?.nextUrl || loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);
      setError(null);

      const nextPageNum = pagination.page + 1;
      console.log('📥 [LOAD MORE] Requesting answers page:', nextPageNum);

      const answerData: AnswerApiResponse = await getUserAnswers(
        userId!,
        nextPageNum
      );

      console.log('✅ [LOAD MORE] Received answers:', {
        received: answerData.data.length,
        page: answerData.pagination.page,
        nextUrl: answerData.pagination.nextUrl,
      });

      setAnswers((prev) => {
        const existingIds = new Set(prev.map((a) => a._id));
        const newAnswers = answerData.data.filter(
          (a) => !existingIds.has(a._id)
        );

        const duplicateCount = answerData.data.length - newAnswers.length;

        if (duplicateCount > 0) {
          console.warn(
            '🔴 [DUPLICATE] Found',
            duplicateCount,
            'duplicate answers'
          );
        }

        const merged = [...prev, ...newAnswers];
        console.log('💾 [STATE] Total answers after merge:', merged.length);

        return merged;
      });

      setPagination(answerData.pagination);
    } catch (err) {
      console.error('❌ [ERROR] Loading more answers:', err);
      setError('Failed to load more answers');
    } finally {
      setLoadingMore(false);
    }
  }, [pagination, userId, loadingMore]);

  return {
    answers,
    pagination,
    loading,
    loadingMore,
    error,
    setAnswers,
    loadMore,
    hasMore: !!pagination?.nextUrl,
  };
}
