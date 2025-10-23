import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';
import type { CreateQuestionRequest } from '~/models/req/createQuestion.request';
import type { VoteQuestionResponse } from '~/models/res/voteQuestion.response';

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

export interface VoteStatus {
  upvoted: boolean;
  downvoted: boolean;
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
export async function deleteQuestion(questionId: string, token: string) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/question/${questionId}/delete`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to delete question (id=${questionId}):`, error);
    return false;
  }
}

export async function getQuestionsByType(
  type: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<Question[]>> {
  try {
    const response = await axios.get<ApiResponse<Question[]>>(
      `${API_BASE_URL}/question/${type}?page=${page}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.error(` Failed to fetch questions (${type}):`, error);

    return {
      success: false,
      message: 'Failed to fetch questions',
      data: [],
      pagination: { page, limit, nextUrl: undefined },
    };
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

export async function upvoteQuestion(
  questionId: string,
  token: string
): Promise<VoteQuestionResponse | null> {
  try {
    const response = await axios.post<ApiResponse<VoteQuestionResponse>>(
      `${API_BASE_URL}/question/${questionId}/upvote`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data || null;
  } catch (err) {
    console.error(`Failed to upvote question (id=${questionId}):`, err);
    return null;
  }
}

export async function downvoteQuestion(
  questionId: string,
  token: string
): Promise<VoteQuestionResponse | null> {
  try {
    const response = await axios.post<ApiResponse<VoteQuestionResponse>>(
      `${API_BASE_URL}/question/${questionId}/downvote`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data || null;
  } catch (err) {
    console.error(`Failed to downvote question (id=${questionId}):`, err);
    return null;
  }
}

export async function voteStatus(
  questionId: string,
  token: string
): Promise<VoteStatus | null> {
  try {
    const response = await axios.get<ApiResponse<VoteStatus>>(
      `${API_BASE_URL}/question/${questionId}/vote-status`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data || null;
  } catch (error) {
    console.error(`Failed to fetch vote status (id=${questionId}):`, error);
    return null;
  }
}

export const increaseQuestionView = async (
  questionId: string
): Promise<void> => {
  const url = `${API_BASE_URL}/question/${questionId}/view`;
  try {
    await axios.post(url);
    console.log(`Successfully increased view count for question ${questionId}`);
  } catch (error) {
    console.error(
      `Failed to increase view count for question (${questionId}):`,
      error
    );
    throw error; // Re-throw để component có thể handle error
  }
};

export const getUserVotedQuestions = async (
  userId: string
): Promise<Question[]> => {
  try {
    const response = await axios.get<ApiResponse<Question[]>>(
      `${API_BASE_URL}/question/voted/${userId}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error(
      `Failed to fetch voted questions for user (${userId}):`,
      error
    );
    return [];
  }
};
