import * as React from 'react';

interface ConversationErrorProps {
  error: string;
  retryHandler: () => void;
}

function ConversationError({ error, retryHandler }: ConversationErrorProps) {
  return (
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-gray-50">
      <div className="flex items-center justify-center border-r border-gray-200">
        <div className="text-red-500">{error}</div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={retryHandler}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ConversationError;
