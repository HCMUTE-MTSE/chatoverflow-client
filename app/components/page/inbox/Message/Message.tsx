import React from 'react';

interface MessageProps {
  senderId: string;
  senderName: string;
  isSentByUser: boolean;
  content: string;
  createdAt: Date;
}

const Message: React.FC<MessageProps> = ({
  senderId,
  senderName,
  isSentByUser,
  content,
  createdAt,
}) => {
  return (
    <div
      className={`mb-4 ${
        isSentByUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isSentByUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {!isSentByUser && (
          <p className="text-xs font-medium mb-1 text-gray-600">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isSentByUser ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
export default Message;
