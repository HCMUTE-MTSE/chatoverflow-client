import * as React from 'react';

import Sidebar from '../Sidebar';
import Chatbox from '../Chatbox';

function Inbox() {
  /* const conversations = fetchConversations(); */
  const conversations = [
    {
      id: '1',
      targetName: 'John Doe',
      targetAvatar:
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: '2',
      targetName: 'Jane Clear',
      targetAvatar:
        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">
      <Sidebar conversations={conversations} />
      <Chatbox conversationId={'1'} onStartNewChat={() => {}} />
    </div>
  );
}

export default Inbox;
