import React from 'react';
import TagInput from './TagInput';

type QuestionTagsProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
  maxTags?: number;
};

const QuestionTags: React.FC<QuestionTagsProps> = ({
  tags,
  onChange,
  suggestions,
  maxTags = 5,
}) => (
  <div className="mb-8">
    <label className="block text-white font-semibold mb-2">
      Tags <span className="text-red-500">*</span>
    </label>
    <div className="relative mb-2">
      <TagInput
        value={tags}
        onChange={onChange}
        suggestions={suggestions}
        maxTags={maxTags}
      />
    </div>
    <p className="text-sm text-gray-400">
      Add up to {maxTags} tags to describe what your question is about.
    </p>
  </div>
);

export default QuestionTags;
