import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../Header';
import FilterTabs from '../FilterTabs';
import QuestionList from '../QuestionList';
import PopularTags from '../PopularTags';
import { useNavigate, useLocation } from 'react-router';
import {
  getQuestionsByType,
  type Question,
} from '~/services/api/topic/question.service';
import {
  getPopularTags,
  type PopularTag,
} from '~/services/api/search/search.service';
import { usePopularTags } from '~/hooks/usePopularTags';

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const lastRequestedPageRef = useRef<number>(0);
  const isLoadingRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    tags: popularTags,
    loading: tagLoading,
    error: tagError,
  } = usePopularTags(20);
  const filters = ['Newest', 'Trending', 'Unanswered'];

  const askQuestion = () => {
    if (localStorage.getItem('token')) navigate('/ask');
    else navigate('/login');
  };

  // 🧠 Fetch questions
  const fetchQuestions = useCallback(
    async (pageNumber = 1, isNewFilter = false) => {
      // Ngăn gọi API trùng
      if (
        isLoadingRef.current ||
        (!isNewFilter && pageNumber <= lastRequestedPageRef.current)
      ) {
        return;
      }

      lastRequestedPageRef.current = pageNumber;
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const res = await getQuestionsByType(
          activeFilter.toLowerCase(),
          pageNumber,
          10
        );

        if (res.success) {
          setQuestions((prev) => {
            if (isNewFilter) return res.data;
            const existingIds = new Set(prev.map((q) => q._id));
            const newQuestions = res.data.filter(
              (q) => !existingIds.has(q._id)
            );
            return [...prev, ...newQuestions];
          });
          setHasMore(!!res.pagination?.nextUrl);
          setPage(res.pagination?.page ?? pageNumber);
        } else {
          setError(res.message || 'Failed to load questions');
        }
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    },
    [activeFilter]
  );

  // ✅ Reset khi đổi filter hoặc back về trang
  useEffect(() => {
    setQuestions([]);
    setPage(1);
    setHasMore(true);
    lastRequestedPageRef.current = 0;
    fetchQuestions(1, true);
  }, [activeFilter, fetchQuestions, location.key]);

  // ✅ Lazy loading với IntersectionObserver
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingRef.current) {
          const nextPage = page + 1;
          if (nextPage > lastRequestedPageRef.current) {
            fetchQuestions(nextPage);
          }
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, hasMore, fetchQuestions]);

  return (
    <div className="min-h-screen relative text-white font-sans">
      <div className="relative z-0 flex justify-center">
        <div className="flex max-w-8xl w-full">
          <div className="flex-1 p-5 max-w-4xl mx-auto">
            <Header title="All Questions" onAskQuestion={askQuestion} />
            <FilterTabs
              filters={filters}
              activeFilter={activeFilter}
              onChange={setActiveFilter}
            />

            {questions.length > 0 && <QuestionList questions={questions} />}

            {loading && (
              <p className="text-gray-400 text-center py-5">
                Loading questions...
              </p>
            )}
            {error && <p className="text-red-500 text-center py-5">{error}</p>}

            {/* Trigger lazy load */}
            <div ref={observerRef} className="h-10"></div>

            {!hasMore && !loading && (
              <p className="text-gray-500 text-center py-5">
                No more questions
              </p>
            )}
          </div>

          <div className="w-75 p-5 bg-gray-950 border-l border-gray-700">
            {tagLoading ? (
              <p className="text-gray-400 text-center">Loading tags...</p>
            ) : tagError ? (
              <p className="text-red-500 text-center">{tagError}</p>
            ) : (
              <PopularTags tags={popularTags} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
