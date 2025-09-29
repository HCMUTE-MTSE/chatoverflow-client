In `app\components\page\inbox\Inbox\Inbox.tsx`, we will fetch conversations from the API and pass them to it decendents.

```tsx
function Inbox() {
  /* const conversations = fetchConversations(); */

  return (
    <div className="grid grid-cols-[2fr_3fr] w-196 h-96 bg-red-500">
      <Sidebar conversations={conversations} />
      <Chatbox conversationId={'1'} onStartNewChat={() => {}} />
    </div>
  );
}
```

Note that `fetchConversations()` is a sample name, any clearer name is welcomed.

My client have anixous, any logic are implemented in `app\services\api\chat\chat.service.ts`:

```ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/chat';

export interface SampleResponse1 {
  properties1: string;
  properties2: string;
}

export interface SampleResponse2 {
  properties1: string;
  properties2: string;
}

export const getSampleData1 = async () => {
  const response = await axios.get<SampleResponse1>(`${API_URL}/sample1`);
  return response.data;
};

export const getSampleData2 = async () => {
  const response = await axios.get<SampleResponse2>(`${API_URL}/sample2`);
  return response.data;
};
```

Our task is to implement axious fetching logic, fetch and fill conversations data into `Inbox` component.
