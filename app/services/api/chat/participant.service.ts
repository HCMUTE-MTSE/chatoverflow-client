import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface UserData {
  _id: string;
  name: string;
  nickName: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  address: {
    province: string;
    ward: string;
    street: string;
  };
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questionsCount: number;
  answersCount: number;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: UserData[];
}

export const getAllUsers = async () => {
  const response = await axios.get<GetUsersResponse>(`${API_URL}/user`);
  return response.data.data;
};
