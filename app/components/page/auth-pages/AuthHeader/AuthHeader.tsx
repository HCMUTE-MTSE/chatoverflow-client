import * as React from 'react';

export default function AuthHeader({ content }: { content: string }) {
   return (
      <div className="text-center space-y-2">
         <h1 className="text-3xl font-bold">
            <span className="text-orange-500">Chat</span>
            <span className="text-white">Overflow</span>
         </h1>
         <p className="text-gray-400 text-sm">{content}</p>
      </div>
   );
}
