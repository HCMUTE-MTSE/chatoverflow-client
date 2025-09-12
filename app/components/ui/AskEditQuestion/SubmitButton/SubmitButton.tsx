import React from 'react';

type SubmitButtonProps = {
  label?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = 'Ask a Question',
}) => (
  <button
    type="submit"
    className="mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md block ml-auto transition-colors duration-200"
  >
    {label}
  </button>
);

export default SubmitButton;
