import { useCallback, useEffect, useState, useRef } from 'react';
import { getUserPosts } from '~/services/api/user/user.service';

export interface PostsResponse {
  data: Array<{
    _id: string;
    title: string;
    content: string;
    tags: string[];
    views: number;
    upvotedBy: string[];
    downvotedBy: string[];
    user: {
      _id: string;
      name: string;
      nickName: string;
      avatar: string | null;
    };
    askedTime: string;
    upvotes: number;
    downvotes: number;
    score: number;
    answerCount?: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  };
}

export function usePosts(userId: string | undefined) {
  const [posts, setPosts] = useState<PostsResponse['data']>([]);
  const [pagination, setPagination] = useState<
    PostsResponse['pagination'] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Track fetched userId to prevent double fetch
  const fetchedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      if (!userId) {
        return;
      }

      // ✅ Skip if already fetched for this specific userId
      if (fetchedUserIdRef.current === userId) {
        console.log('⏭️ [SKIP] Already fetched posts for userId:', userId);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('📥 [INITIAL] Fetching posts for user:', userId);

        const postData: PostsResponse = await getUserPosts(userId, 1);

        console.log('✅ [INITIAL] Loaded:', {
          received: postData.data.length,
          page: postData.pagination.page,
          limit: postData.pagination.limit,
          nextUrl: postData.pagination.nextUrl,
        });

        if (isMounted) {
          setPosts(postData.data);
          setPagination(postData.pagination);
          fetchedUserIdRef.current = userId; // ✅ Mark this userId as fetched
          console.log('💾 [STATE] Posts in state:', postData.data.length);
        }
      } catch (err) {
        if (isMounted) {
          console.error('❌ [ERROR] Fetching posts:', err);
          setError('Failed to load posts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // ✅ Reset when userId changes
  useEffect(() => {
    if (userId !== fetchedUserIdRef.current) {
      fetchedUserIdRef.current = null;
      setPosts([]);
      setPagination(null);
    }
  }, [userId]);

  // Load more posts
  const loadMore = useCallback(async () => {
    if (!pagination?.nextUrl || loadingMore) {
      return;
    }

    try {
      setLoadingMore(true);
      setError(null);

      const nextPageNum = pagination.page + 1;
      console.log('📥 [LOAD MORE] Requesting page:', nextPageNum);

      const postData: PostsResponse = await getUserPosts(userId!, nextPageNum);

      console.log('✅ [LOAD MORE] Received:', {
        received: postData.data.length,
        page: postData.pagination.page,
        nextUrl: postData.pagination.nextUrl,
      });

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newPosts = postData.data.filter((p) => !existingIds.has(p._id));

        const duplicateCount = postData.data.length - newPosts.length;

        if (duplicateCount > 0) {
          console.warn('🔴 [DUPLICATE] Found', duplicateCount, 'duplicates');
        }

        const merged = [...prev, ...newPosts];
        console.log('💾 [STATE] Total posts after merge:', merged.length);

        return merged;
      });

      setPagination(postData.pagination);
    } catch (err) {
      console.error('❌ [ERROR] Loading more posts:', err);
      setError('Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  }, [pagination, userId, loadingMore]);

  return {
    posts,
    pagination,
    loading,
    loadingMore,
    error,
    setPosts,
    loadMore,
    hasMore: !!pagination?.nextUrl,
  };
}
