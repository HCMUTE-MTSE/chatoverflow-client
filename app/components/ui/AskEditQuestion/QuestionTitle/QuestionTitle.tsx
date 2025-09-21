import React from 'react';

type QuestionTitleProps = {
  title: string;
  onChange: (value: string) => void;
};

const QuestionTitle: React.FC<QuestionTitleProps> = ({ title, onChange }) => (
  <div className="mb-6">
    <label className="block text-white font-semibold mb-2">
      Question Title <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      value={title}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#23272F] text-white rounded-md px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <p className="text-sm text-gray-400">
      Be specific and imagine you’re asking a question to another person.
    </p>
  </div>
);

export default QuestionTitle;
