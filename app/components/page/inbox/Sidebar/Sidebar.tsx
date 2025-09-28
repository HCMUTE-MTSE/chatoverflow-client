import React from 'react';
import SidebarHeader from '../SidebarHeader';
import SidebarMain from '../SidebarMain';

interface Conversation {
  id: string;
  targetName: string;
  targetAvatar?: string;
}

interface SidebarProps {
  conversations: Conversation[];
}

const Sidebar: React.FC<SidebarProps> = ({ conversations }) => {
  return (
    <div className="flex flex-col bg-white border-r border-gray-200 h-full">
      <SidebarHeader />
      <SidebarMain conversations={conversations} />
    </div>
  );
};

export default Sidebar;
