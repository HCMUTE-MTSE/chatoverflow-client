import React from 'react';

import type { Conversation } from '../type';

import SidebarHeader from '../SidebarHeader';
import SidebarMain from '../SidebarMain';

interface SidebarProps {
  conversations: Conversation[];
  handleSelectConversation: (conversation: Conversation) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  handleSelectConversation,
}) => {
  return (
    <div className="flex flex-col bg-white border-r border-gray-200 h-full rounded-tl-lg rounded-bl-lg">
      <SidebarHeader />
      <SidebarMain
        conversations={conversations}
        handleSelectConversation={handleSelectConversation}
      />
    </div>
  );
};

export default Sidebar;
