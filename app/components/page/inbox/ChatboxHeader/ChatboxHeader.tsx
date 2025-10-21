import React from 'react';

import { AiOutlineExpand } from 'react-icons/ai';
import { LuChevronDown } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';

const ChatboxHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-end p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center space-x-2">
        {/* Expand */}
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <LuChevronDown size={16} className="text-gray-600" />
        </button>

        {/* Minimize */}
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <AiOutlineExpand size={16} className="text-gray-600" />
        </button>

        {/* Close */}
        <button className="p-1.5 hover:bg-gray-200 rounded">
          <IoMdClose size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatboxHeader;
