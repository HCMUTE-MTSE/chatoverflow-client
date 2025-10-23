import React from 'react';

import type { Conversation } from '../type';

import ConversationOverview from '../ConversationOverview';

interface SidebarMainProps {
  conversations: Conversation[];
  handleSelectConversation: (conversation: Conversation) => void;
}

const SidebarMain: React.FC<SidebarMainProps> = ({
  conversations,
  handleSelectConversation,
}) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-gray-800">
      {conversations.map((conversation) => (
        <ConversationOverview
          key={conversation.id}
          conversation={conversation}
          handleSelectConversation={handleSelectConversation}
        />
      ))}
    </div>
  );
};

export default SidebarMain;
