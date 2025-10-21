import React from 'react';

import type { Conversation } from '../type';

import SidebarHeader from '../SidebarHeader';
import SidebarMain from '../SidebarMain';

interface SidebarProps {
  conversations: Conversation[];
  handleSelectConversation: (conversation: Conversation) => void;
  handleUnselectAllConversations: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  handleSelectConversation,
  handleUnselectAllConversations,
}) => {
  return (
    <div className="flex flex-col bg-gray-800 border-r border-gray-700 h-full rounded-tl-lg rounded-bl-lg">
      <SidebarHeader
        handleUnselectAllConversations={handleUnselectAllConversations}
      />
      <SidebarMain
        conversations={conversations}
        handleSelectConversation={handleSelectConversation}
      />
    </div>
  );
};

export default Sidebar;
