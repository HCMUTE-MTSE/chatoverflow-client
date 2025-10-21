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
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold text-orange-400">Chats</h2>

      <div className="flex items-center space-x-2">
        {/* New chat */}
        <button
          className="p-1.5 hover:bg-gray-700 rounded"
          onClick={() => handleUnselectAllConversations()}
        >
          <LuMessageSquarePlus size={16} className="text-sky-400" />
        </button>

        <button className="p-1.5 hover:bg-gray-700 rounded">
          <VscSettings size={16} className="text-sky-400" />
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
