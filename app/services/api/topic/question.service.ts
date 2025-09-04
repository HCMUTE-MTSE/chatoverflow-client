import axios from "axios";
import type { ApiResponse } from "~/models/res/api.response";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  views: number;
  upvotedBy: string[];
  downvotedBy: string[];
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  askedTime: string;
  createdAt: string;
  updatedAt: string;
  answerCount?: number;
}

export async function getQuestionsByType(type: string): Promise<Question[]> {
  try {
    const response = await axios.get<ApiResponse<Question[]>>(
      `${API_BASE_URL}/question/${type}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error(`Failed to fetch questions (${type}):`, error);
    return [];
  }
}
