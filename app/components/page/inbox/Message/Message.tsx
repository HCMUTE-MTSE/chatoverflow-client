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
          isSentByUser
            ? 'bg-orange-500 text-white'
            : 'bg-gray-700 text-gray-100'
        }`}
      >
        {!isSentByUser && (
          <p className="text-xs font-medium mb-1 text-sky-400">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isSentByUser ? 'text-orange-100' : 'text-gray-400'
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
