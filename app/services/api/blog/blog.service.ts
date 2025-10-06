import axios from 'axios';
import type {
  BlogListResponse,
  BlogDetailResponse,
  BlogVoteResponse,
  CommentListResponse,
  CreateCommentResponse,
  CommentVoteResponse,
  Comment,
} from '../../../models/res/blog.response';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/blog`;

export interface BlogListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  tags?: string[];
}

export const getBlogList = async (params: BlogListParams = {}) => {
  const { page = 1, limit = 4, sortBy, tags } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  if (sortBy) {
    queryParams.append('sortBy', sortBy);
  }

  if (tags && tags.length > 0) {
    tags.forEach((tag) => queryParams.append('tags', tag));
  }

  const response = await axios.get<BlogListResponse>(
    `${API_URL}?${queryParams.toString()}`
  );
  return response.data;
};

export const getBlogDetail = async (slug: string) => {
  const response = await axios.get<BlogDetailResponse>(`${API_URL}/${slug}`);
  return response.data;
};

export const createBlog = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBlog = async (slug: string, formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.put(`${API_URL}/${slug}/edit`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserBlogs = async (userId: string) => {
  const response = await axios.get<BlogListResponse>(
    `${API_URL}/user/${userId}`
  );
  return response.data;
};

export const voteBlog = async (
  blogSlug: string,
  voteType: 'upvote' | 'downvote'
) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.post<BlogVoteResponse>(
    `${API_URL}/${blogSlug}/vote`,
    { voteType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getBlogComments = async (blogSlug: string, page: number = 1) => {
  const response = await axios.get<CommentListResponse>(
    `${API_URL}/${blogSlug}/comments?page=${page}`
  );
  return response.data;
};

export const createBlogComment = async (blogSlug: string, content: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.post<CreateCommentResponse>(
    `${API_URL}/${blogSlug}/comments`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const voteComment = async (
  commentId: string,
  voteType: 'upvote' | 'downvote'
) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.post<CommentVoteResponse>(
    `${API_BASE_URL}/blog/comments/${commentId}/vote`,
    { voteType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
