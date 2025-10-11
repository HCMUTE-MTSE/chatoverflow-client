import type { Address } from '../constant/Address.dto';
export interface UserResponse {
  userId: string;
  avatar: string | null;
  name: string;
  nickName: string;
  email: string;
  bio: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  status: string;
  createdAt: string;
  updatedAt: string;
}
