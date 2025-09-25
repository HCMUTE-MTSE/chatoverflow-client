import type { Address } from '../constant/Address.dto';
export interface UserRequest {
  name: string;
  nickName: string;
  bio: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
}
