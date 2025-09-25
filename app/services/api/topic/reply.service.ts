import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';
import type {
  Reply,
  CreateReplyRequest,
  GetRepliesResponse,
  ReplyVoteStatus,
  ReplyOwnership,
} from '~/models/reply.types';

// Re-export types for convenience
export type {
  Reply,
  CreateReplyRequest,
  GetRepliesResponse,
  ReplyVoteStatus,
  ReplyOwnership,
} from '~/models/reply.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRepliesByAnswerId = async (
  answerId: string,
  page = 1,
  limit = 10,
  parentId?: string
): Promise<ApiResponse<GetRepliesResponse>> => {
  try {
    const res = await axios.get<ApiResponse<GetRepliesResponse>>(
      `${API_BASE_URL}/answer/${answerId}/replies`,
      {
        params: { page, limit, parentId },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error('Error fetching replies:', error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Something went wrong',
      data: {
        replies: [],
        totalCount: 0,
        hasMore: false,
      },
    };
  }
};

/** Create a reply to an answer */
export const createReplyToAnswer = async (
  request: CreateReplyRequest,
  token: string
): Promise<ApiResponse<Reply>> => {
  try {
    const res = await axios.post<ApiResponse<Reply>>(
      `${API_BASE_URL}/answer/${request.answerId}/replies`,
      {
        content: request.content,
        parentId: request.parentId,
      },
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

/** Upvote a reply */
export const upvoteReply = async (
  replyId: string,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await axios.post<ApiResponse<any>>(
      `${API_BASE_URL}/reply/${replyId}/upvote`,
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

/** Downvote a reply */
export const downvoteReply = async (
  replyId: string,
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await axios.post<ApiResponse<any>>(
      `${API_BASE_URL}/reply/${replyId}/downvote`,
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

/** Get vote status for a reply */
export const getReplyVoteStatus = async (
  replyId: string,
  token: string
): Promise<ApiResponse<ReplyVoteStatus>> => {
  try {
    const res = await axios.get<ApiResponse<ReplyVoteStatus>>(
      `${API_BASE_URL}/reply/${replyId}/vote-status`,
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

/** Edit a reply */
export const editReply = async (
  replyId: string,
  content: string,
  token: string
): Promise<ApiResponse<Reply>> => {
  try {
    const res = await axios.put<ApiResponse<Reply>>(
      `${API_BASE_URL}/reply/${replyId}/edit`,
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

/** Delete a reply */
export const deleteReply = async (
  replyId: string,
  token: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await axios.delete<ApiResponse<null>>(
      `${API_BASE_URL}/reply/${replyId}/delete`,
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

/** Check if the user is the owner of the reply */
export const checkReplyOwner = async (
  replyId: string,
  token: string
): Promise<ApiResponse<ReplyOwnership>> => {
  try {
    const res = await axios.get<ApiResponse<ReplyOwnership>>(
      `${API_BASE_URL}/reply/${replyId}/is-owner`,
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
