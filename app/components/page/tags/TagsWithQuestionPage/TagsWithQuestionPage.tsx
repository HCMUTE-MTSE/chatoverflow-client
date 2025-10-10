import React, { useEffect, useState, useCallback } from 'react';
import TagCard from '~/components/ui/TagCard';
import Select from '~/components/ui/Select/Select';
import Input from '~/components/ui/Input/Input';
import LoadMoreButton from '~/components/ui/LoadMoreButton';
import {
  getQuestionsByTag,
  getTagList,
  getTagListByName,
} from '~/services/api/tags/tag.service';
import type {
  TagResponse,
  TagWithQuestions,
} from '~/services/api/tags/tag.service';
import tagsLang from '~/lang/en/tags';
import type { Question } from '~/services/api/topic/question.service';
import QuestionDetail from '../../question-pages/questtion-detail/QuestionDetail';
import DefaultQuestionCard from '~/components/ui/QuestionCard/DefaultQuestionCard/QuestionCard/DefaultQuestionCard';
import { useNavigate } from 'react-router-dom';

interface TagsWithQuestionPageProps {
  tagName: string;
}

export default function TagsWithQuestionPage({
  tagName,
}: TagsWithQuestionPageProps) {
  const navigate = useNavigate();
  const [tags, setTags] = useState<TagResponse | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch initial tags function
  const fetchInitialTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getQuestionsByTag(tagName, 1, 12);
      setTags(response.data.tag);
      setQuestions(response.data.questions ?? []);
      setNextUrl(response.pagination?.nextUrl ?? null);
      setCurrentPage(1);
    } catch (error) {
      console.error(tagsLang.errorLoadingTags, error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchInitialTags();
  }, [fetchInitialTags]);

  // Load more function
  const handleLoadMore = async () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    try {
      const response = await getQuestionsByTag(tagName, currentPage + 1, 12);
      if (response.data && questions) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...response.data.questions,
        ]);
      }
      setNextUrl(response.pagination?.nextUrl ?? null);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error(tagsLang.errorLoadingMore, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - giống Figma */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-64 w-160 h-230 bg-indigo-900/50 rounded-full blur-[357px]"></div>
        <div className="absolute -bottom-28 -right-36 w-138 h-110 bg-indigo-900/50 rounded-full blur-[357px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-white text-3xl font-bold mb-16 tracking-tight">
            {tagsLang.title}
          </h1>

          {/* Tags Grid - spacing giống Figma */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tags && (
              <TagCard
                key={tags.id}
                name={tags.name}
                description={tags.description}
                questionCount={tags.questionCount}
              />
            )}
          </div>

          {/* Questions List */}
          <div className="mt-12">
            {questions.map((question) => (
              <DefaultQuestionCard
                title={question.title}
                key={question._id}
                tags={question.tags}
                user={question.user}
                time={new Date(question.askedTime).toLocaleString()}
                votes={question.upvotedBy.length + question.downvotedBy.length}
                answers={question.answerCount || 0}
                views={question.views}
                onClick={() => navigate(`/question/${question._id}`)}
              />
            ))}
          </div>

          {/* Load More Button - show when there's more data and not currently searching */}
          {questions.length > 0 && (
            <LoadMoreButton
              onClick={handleLoadMore}
              disabled={!nextUrl}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
