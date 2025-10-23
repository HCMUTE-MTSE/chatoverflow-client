import * as React from 'react';
import { extractText } from './helpers';
import type { SearchResult } from '../../../services/api/search/type';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  ArrowUpIcon,
  EyeIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/solid';

interface SearchResultItemProps {
  result: SearchResult;
  onClick?: (result: SearchResult) => void;
}

export function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  const isQuestion = result.type === 'question';
  const isBlog = result.type === 'blog';

  const getTypeIcon = () => {
    if (isQuestion) {
      return <QuestionMarkCircleIcon className="h-5 w-5 text-blue-400" />;
    }
    if (isBlog) {
      return <DocumentTextIcon className="h-5 w-5 text-purple-400" />;
    }
    return null;
  };

  const getTypeBadge = () => {
    if (isQuestion) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
          Question
        </span>
      );
    }
    if (isBlog) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Blog
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className="group px-4 py-2 mb-2 bg-g  ray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-lg cursor-pointer transition-all duration-200"
      onClick={() => onClick?.(result)}
    >
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className="flex-shrink-0 mt-1">{getTypeIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Badge + Stats */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {getTypeBadge()}

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              {/* Votes */}
              {result.metadata?.votes !== undefined && (
                <div
                  className={`flex items-center gap-1 ${
                    result.metadata.votes > 0
                      ? 'text-green-400'
                      : result.metadata.votes < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                  <span className="font-medium">{result.metadata.votes}</span>
                </div>
              )}

              {/* Views (Questions only) */}
              {isQuestion && result.metadata?.views !== undefined && (
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-3.5 w-3.5" />
                  <span>{result.metadata.views}</span>
                </div>
              )}

              {/* Answer Count (Questions only) */}
              {isQuestion && result.metadata?.answers !== undefined && (
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftIcon className="h-3.5 w-3.5" />
                  <span>
                    {result.metadata.answers}{' '}
                    {result.metadata.answers === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
            {result.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
            {extractText(result.description)}
          </p>

          {/* Footer: Author, Date, Tags */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Author & Date */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {result.metadata?.author && (
                <div className="flex items-center gap-1.5">
                  {result.metadata.authorAvatar ? (
                    <img
                      src={result.metadata.authorAvatar}
                      alt={result.metadata.author}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-5 h-5" />
                  )}
                  <span className="font-medium text-gray-400">
                    {result.metadata.author}
                  </span>
                  {result.metadata.authorReputation !== undefined && (
                    <span className="text-gray-600">
                      ({result.metadata.authorReputation})
                    </span>
                  )}
                </div>
              )}

              {result.metadata?.formattedDate && (
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>{result.metadata.formattedDate}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {result.metadata?.tags && result.metadata.tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {result.metadata.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700/70 hover:bg-gray-600 text-gray-300 rounded text-xs font-medium transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {result.metadata.tags.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{result.metadata.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
