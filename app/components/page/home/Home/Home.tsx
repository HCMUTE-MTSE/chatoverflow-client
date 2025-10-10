import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../Header';
import SearchBar from '../SearchBar';
import FilterTabs from '../FilterTabs';
import QuestionList from '../QuestionList';
import PopularTags from '../PopularTags';
import { useNavigate } from 'react-router';
import {
  getQuestionsByType,
  type Question,
} from '~/services/api/topic/question.service';
import {
  getPopularTags,
  type PopularTag,
} from '~/services/api/search/search.service';

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [popularTags, setPopularTags] = useState<
    { name: string; count: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagLoading, setTagLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const askQuestion = () => {
    if (localStorage.getItem('token')) {
      navigate('/ask');
    } else {
      navigate('/login');
    }
  };

  const filters = ['Newest', 'Trending', 'Unanswered'];

  // 🧠 Fetch questions (lazy load)
  const fetchQuestions = useCallback(
    async (pageNumber = 1, isNewFilter = false) => {
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
            if (isNewFilter) {
              return res.data;
            } else {
              // Merge new data with existing, avoiding duplicates
              const existingIds = new Set(prev.map((q) => q._id));
              const newQuestions = res.data.filter(
                (q) => !existingIds.has(q._id)
              );
              return [...prev, ...newQuestions];
            }
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
      }
    },
    [activeFilter]
  );

  useEffect(() => {
    setQuestions([]);
    setPage(1);
    setHasMore(true);
    fetchQuestions(1, true);
  }, [activeFilter, fetchQuestions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          fetchQuestions(page + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchQuestions, hasMore, loading, page]);

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        setTagLoading(true);
        const data = await getPopularTags(20);

        // map dữ liệu API về format của UI
        const formatted = data.map((t: PopularTag) => ({
          name: t.tag.toUpperCase(),
          count: `${t.count}+`,
        }));

        setPopularTags(formatted);
      } catch (err) {
        console.error('Failed to load popular tags:', err);
      } finally {
        setTagLoading(false);
      }
    }

    fetchPopularTags();
  }, []);

  return (
    <div className="flex justify-center bg-black min-h-screen text-white font-sans">
      <div className="flex max-w-8xl w-full">
        {/* Main Content */}
        <div className="flex-1 p-5 max-w-4xl mx-auto">
          <Header title="All Questions" onAskQuestion={askQuestion} />
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />

          {/* Questions */}
          {questions.length > 0 && <QuestionList questions={questions} />}

          {/* Loading & Error */}
          {loading && (
            <p className="text-gray-400 text-center py-5">
              Loading questions...
            </p>
          )}
          {error && <p className="text-red-500 text-center py-5">{error}</p>}

          {/* Lazy load trigger */}
          <div ref={observerRef} className="h-10"></div>

          {!hasMore && !loading && (
            <p className="text-gray-500 text-center py-5">No more questions</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-75 p-5 bg-gray-950 border-l border-gray-700">
          {tagLoading ? (
            <p className="text-gray-400 text-center">Loading tags...</p>
          ) : (
            <PopularTags tags={popularTags} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
