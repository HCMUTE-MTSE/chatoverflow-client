import type { Address } from '../constant/Address.dto';
export interface UserResponse {
  userId: string;
<<<<<<< HEAD
  avatar?: string;
=======
  avatar: string | null;
>>>>>>> upstream/week08
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
