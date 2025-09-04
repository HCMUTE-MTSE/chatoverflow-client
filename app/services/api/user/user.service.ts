import axios from "axios";
import type { UserRequest } from "~/models/req/user.request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function để lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
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

export const updateUser = async (payload: UserRequest) => {
  const response = await axios.put(`${API_BASE_URL}/user/edit`, payload, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};
