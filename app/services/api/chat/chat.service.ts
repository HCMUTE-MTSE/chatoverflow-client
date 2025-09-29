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

export const getConversationsByUserId = async (userId: string) => {
  const response = await axios.get<GetConversationsResponse>(
    `${API_URL}/conversations/${userId}`
  );
  return response.data.data;
};
