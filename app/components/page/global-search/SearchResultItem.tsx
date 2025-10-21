import * as React from 'react';
import { extractText } from './helpers';
import type { SearchResult } from '../../../services/api/search/type';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  TagIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

interface SearchResultItemProps {
  result: SearchResult;
  onClick?: (result: SearchResult) => void;
}

export function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question':
        return <QuestionMarkCircleIcon className="h-5 w-5 text-blue-400" />;
      case 'answer':
        return <ChatBubbleLeftIcon className="h-5 w-5 text-green-400" />;
      case 'user':
        return <UserIcon className="h-5 w-5 text-purple-400" />;
      case 'tag':
        return <TagIcon className="h-5 w-5 text-orange-400" />;
      default:
        return null;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-500/20 text-blue-300';
      case 'answer':
        return 'bg-green-500/20 text-green-300';
      case 'user':
        return 'bg-purple-500/20 text-purple-300';
      case 'tag':
        return 'bg-orange-500/20 text-orange-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div
      className="p-2 mb-2 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg cursor-pointer transition-all duration-200 hover:border-gray-600"
      onClick={() => onClick?.(result)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{getTypeIcon(result.type)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                result.type
              )}`}
            >
              {result.type}
            </span>
            {result.metadata?.votes !== undefined && (
              <div className="flex items-center gap-1 text-gray-400">
                <ArrowUpIcon className="h-3 w-3" />
                <span className="text-xs">{result.metadata.votes}</span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-medium text-gray-200 mb-2 line-clamp-2">
            {result.title}
          </h3>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {extractText(result.description)}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              {result.metadata?.author && (
                <span>by {result.metadata.author}</span>
              )}
              {result.metadata?.createdAt && (
                <span>{result.metadata.createdAt}</span>
              )}
            </div>

            {result.metadata?.tags && result.metadata.tags.length > 0 && (
              <div className="flex gap-1">
                {result.metadata.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
