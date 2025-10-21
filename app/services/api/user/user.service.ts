import axios from 'axios';
import type { User } from '~/models/constant/GetUser.dto';
import type { UserRequest } from '~/models/req/user.request';
import type { GetUsersResponse } from '~/models/res/getUser.response';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function để lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/get-my-info`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/user/profile/${userId}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const updateUser = async (payload: UserRequest) => {
  const response = await axios.put(`${API_BASE_URL}/user/edit`, payload, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const getUsers = async (
  page: number = 1,
  filter: string = '',
  search: string = ''
): Promise<GetUsersResponse> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/user`, {
      params: { page, filter, search },
      headers: getAuthHeaders(),
    });

    const users: User[] = res.data.data.map((u: any) => ({
      id: u._id,
      name: u.name,
      username: u.nickName,
      avatarUrl: u.avatar || '',
      questionsCount: u.questionsCount,
      answersCount: u.answersCount,
      email: u.email,
      status: u.status,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    const pagination = res.data.pagination || {};

    return {
      data: users,
      page: pagination.page || 1,
      limit: pagination.limit || users.length,
      nextUrl: pagination.nextUrl,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
