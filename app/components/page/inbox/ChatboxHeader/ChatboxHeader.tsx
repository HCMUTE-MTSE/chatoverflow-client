import React from 'react';

import { AiOutlineExpand } from 'react-icons/ai';
import { LuChevronDown } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { IsOpenChatContext } from '~/routes/layout';

const ChatboxHeader: React.FC = () => {
  const [isOpenChat, setIsOpenChat] = React.useContext(IsOpenChatContext);
  return (
    <div className="flex items-center justify-end p-4 border-b border-gray-700 bg-gray-900">
      <div className="flex items-center space-x-2">
        {/* Expand */}
        <button className="p-1.5 hover:bg-gray-700 rounded">
          <LuChevronDown size={16} className="text-sky-400" />
        </button>

        {/* Minimize */}
        <button className="p-1.5 hover:bg-gray-700 rounded">
          <AiOutlineExpand size={16} className="text-sky-400" />
        </button>

        {/* Close */}
        <button
          className="p-1.5 hover:bg-gray-700 rounded"
          onClick={() => setIsOpenChat(false)}
        >
          <IoMdClose size={16} className="text-sky-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatboxHeader;
