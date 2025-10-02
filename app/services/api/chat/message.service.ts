import axios from 'axios';

const API_URL = 'http://localhost:3000/chat';

export interface MessageResponse {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date;
}
export interface GetMessageResponse {
  success: boolean;
  data: MessageResponse[];
}

export const getMessageByConversationId = async (conversationId: string) => {
  const response = await axios.get<GetMessageResponse>(
    `${API_URL}/messages/${conversationId}`
  );
  return response.data.data;
};
