import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

import { getUser } from '~/services/api/user/user.service';

interface MessageInputFormProps {
  onSendMessage: (content: string, senderId: string) => void;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSendMessage,
}) => {
  const [senderId, setSenderId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    const fetchUserId = async () => {
      const userData = await getUser();
      setSenderId(userData.data?.userId || null);
    };
    fetchUserId();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && senderId) {
      onSendMessage(message.trim(), senderId);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="text-gray-500 w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            style={{
              minHeight: '40px',
              maxHeight: '120px',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <IoSend size={16} />
        </button>
      </form>
    </div>
  );
};

export default MessageInputForm;
