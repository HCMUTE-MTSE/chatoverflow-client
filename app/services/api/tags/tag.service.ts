import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';
import type { Question } from '../topic/question.service';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface TagResponse {
  id: string;
  name: string;
  description: string;
  questionCount: number;
}

export interface TagWithQuestions {
  tag: TagResponse;
  questions: Question[]; // Replace 'any' with the actual Question type if available
}

export const getTagList = async (
  page: number = 1,
  limit: number = 12
): Promise<ApiResponse<TagResponse[]>> => {
  const response = await axios.get(
    `${API_BASE_URL}/tags?page=${page}&limit=${limit}`
  );
  return response.data as ApiResponse<TagResponse[]>;
};

export const getTagListByName = async (
  name: string,
  page: number = 1,
  limit: number = 12
): Promise<ApiResponse<TagResponse[]>> => {
  const response = await axios.get(
    `${API_BASE_URL}/tags?name=${name}&page=${page}&limit=${limit}`
  );
  return response.data as ApiResponse<TagResponse[]>;
};

export const getQuestionsByTag = async (
  tagName: string,
  page: number = 1,
  limit: number = 12
): Promise<ApiResponse<TagWithQuestions>> => {
  const response = await axios.get(
    `${API_BASE_URL}/tags/${tagName}/questions?page=${page}&limit=${limit}`
  );
  return response.data as ApiResponse<TagWithQuestions>;
};
