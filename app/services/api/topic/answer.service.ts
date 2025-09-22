import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';
import type { Answer } from '~/components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAnswersByQuestionId = async (
  questionId: string,
  sortBy?: string,
  page?: number,
  limit?: number
): Promise<ApiResponse<Answer[]>> => {
  try {
    const params = new URLSearchParams();
    if (sortBy) params.append('sortBy', sortBy);
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());

    const url = `${API_BASE_URL}/question/${questionId}/answers${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const res = await axios.get(url);
    // res.data.data là mảng answers
    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
      pagination: res.data.pagination,
    };
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: [],
      pagination: { page: 1, limit: 10, nextUrl: undefined },
    } as ApiResponse<Answer[]>;
  }
};

export const getTotalAnswersByQuestionId = async (
  questionId: string
): Promise<ApiResponse<{ total: number }>> => {
  try {
    const res = await axios.get<ApiResponse<{ total: number }>>(
      `${API_BASE_URL}/question/${questionId}/answers/total`
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

export const postAnswer = async (
  questionId: string,
  content: string,
  token: string
): Promise<ApiResponse<Answer>> => {
  try {
    const res = await axios.post<ApiResponse<Answer>>(
      `${API_BASE_URL}/question/${questionId}/answers`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Upvote Answer */
export const upvoteAnswer = async (
  answerId: string,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await axios.post<ApiResponse<any>>(
      `${API_BASE_URL}/answer/${answerId}/upvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Downvote Answer */
export const downvoteAnswer = async (
  answerId: string,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await axios.post<ApiResponse<any>>(
      `${API_BASE_URL}/answer/${answerId}/downvote`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Get vote status for Answer */
export const getAnswerVoteStatus = async (
  answerId: string,
  token: string
): Promise<ApiResponse<{ upvoted: boolean; downvoted: boolean }>> => {
  try {
    const res = await axios.get<
      ApiResponse<{ upvoted: boolean; downvoted: boolean }>
    >(`${API_BASE_URL}/answer/${answerId}/vote-status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Edit Answer */
export const editAnswer = async (
  answerId: string,
  content: string,
  token: string
): Promise<ApiResponse<Answer>> => {
  try {
    const res = await axios.put<ApiResponse<Answer>>(
      `${API_BASE_URL}/answer/${answerId}/edit`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Delete Answer */
export const deleteAnswer = async (
  answerId: string,
  token: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await axios.delete<ApiResponse<null>>(
      `${API_BASE_URL}/answer/${answerId}/delete`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};

/** Check if the user is the owner of the answer */
export const checkAnswerOwner = async (
  answerId: string,
  token: string
): Promise<ApiResponse<{ isOwner: boolean }>> => {
  try {
    const res = await axios.get<ApiResponse<{ isOwner: boolean }>>(
      `${API_BASE_URL}/answer/${answerId}/is-owner`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    } as ApiResponse<null>;
  }
};
