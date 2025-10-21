import * as React from 'react';

import { VscSettings } from 'react-icons/vsc';
import { LuMessageSquarePlus } from 'react-icons/lu';

type SidebarHeaderProps = {
  handleUnselectAllConversations: () => void;
};

const SidebarHeader = ({
  handleUnselectAllConversations,
}: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">Chats</h2>

      <div className="flex items-center space-x-2">
        {/* New chat */}
        <button
          className="p-1.5 hover:bg-gray-100 rounded"
          onClick={() => handleUnselectAllConversations()}
        >
          <LuMessageSquarePlus size={16} className="text-gray-600" />
        </button>

        <button className="p-1.5 hover:bg-gray-100 rounded">
          <VscSettings size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
