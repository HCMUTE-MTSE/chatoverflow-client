import React from 'react';
import ConversationOverview from '../ConversationOverview';

interface Conversation {
  id: string;
  targetName: string;
  targetAvatar?: string;
}

interface SidebarMainProps {
  conversations: Conversation[];
}

const SidebarMain: React.FC<SidebarMainProps> = ({ conversations }) => {
  /* 
  Get userId and fetch conversations data, draft:
  const userId = getUserId();
  const { data: conversations } = getConversationsWith(userId); 
  function handleConversationClick(conversationId: string) {
    
  }
  */
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {conversations.map((conversation) => (
        <ConversationOverview
          key={conversation.id}
          targetName={conversation.targetName}
          targetAvatar={conversation.targetAvatar}
          /* onClick={() => handleConversationClick(conversation.id)} */
        />
      ))}
    </div>
  );
};

export default SidebarMain;
