import type { Address } from "../constant/Address.dto";
export interface UserResponse {
  userId: string;
  name: string;
  nickName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  status: string;
}
