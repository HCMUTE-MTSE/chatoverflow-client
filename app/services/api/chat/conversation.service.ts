import axios from 'axios';

const API_URL = 'http://localhost:3000/chat';

export interface ConversationResponse {
  id: string;
  targetName: string;
  targetAvatar?: string;
}
export interface GetConversationsResponse {
  success: boolean;
  data: ConversationResponse[];
}
export interface CreateConversationResponse {
  success: boolean;
  data: {
    id: string;
    targetName: string;
    targetAvatar?: string;
    isNew: boolean;
  };
}

export const getConversationsByUserId = async (userId: string) => {
  const response = await axios.get<GetConversationsResponse>(
    `${API_URL}/conversations/${userId}`
  );
  return response.data.data;
};

export const createConversation = async (userId1: string, userId2: string) => {
  const response = await axios.post<CreateConversationResponse>(
    `${API_URL}/conversations`,
    { userId1, userId2 }
  );
  return response.data.data;
};
