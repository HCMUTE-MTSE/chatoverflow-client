import type { Address } from "../constant/Address.dto";
export interface UserRequest {
  name: string;
  nickName: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
}
