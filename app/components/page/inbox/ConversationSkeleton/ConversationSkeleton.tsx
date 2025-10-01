import * as React from 'react';

function ConversationSkeleton() {
  return (
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-gray-50">
      <div className="flex items-center justify-center border-r border-gray-200">
        <div className="text-gray-500">Loading conversations...</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    </div>
  );
}

export default ConversationSkeleton;
