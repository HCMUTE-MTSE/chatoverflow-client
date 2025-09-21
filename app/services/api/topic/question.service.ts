import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';
import type { CreateQuestionRequest } from '~/models/req/createQuestion.request';

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

export async function createQuestion(
  data: CreateQuestionRequest,
  token: string
) {
  const response = await axios.post(`${API_BASE_URL}/question/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function getQuestionsByType(type: string): Promise<Question[]> {
  console.log(`Fetching questions (${type}): `);
  console.log(`API_BASE_URL: `, API_BASE_URL);
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

export const getUserQuestions = async (userId: string): Promise<Question[]> => {
  try {
    const response = await axios.get<ApiResponse<Question[]>>(
      `${API_BASE_URL}/question/user/${userId}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error(`Failed to fetch questions for user (${userId}):`, error);
    return [];
  }
};

export async function getQuestionDetail(
  id: string | undefined
): Promise<Question | null> {
  console.log(`Fetching question detail (id=${id})`);
  try {
    const response = await axios.get<ApiResponse<Question>>(
      `${API_BASE_URL}/question/detail/${id}`
    );
    return response.data.data || null;
  } catch (error) {
    console.error(
      `Faliure raised while fetching question detail, in question.service (id=${id}):`,
      error
    );
    return null;
  }
}

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'image_upload');

  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dzzzjkbj3/image/upload',
      formData
    );
    return res.data.secure_url;
  } catch (err) {
    console.error('Upload image failed:', err);
    return null;
  }
}

export async function updateQuestion(
  questionId: string,
  updateData: {
    title: string;
    content: string;
    tags: string[];
  },
  token: string
): Promise<Question> {
  console.log(`Updating question (id=${questionId})`);
  try {
    const response = await axios.put<ApiResponse<Question>>(
      `${API_BASE_URL}/question/${questionId}/edit`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Failure raised while updating question, in question.service (id=${questionId}):`,
      error
    );
    throw error;
  }
}
