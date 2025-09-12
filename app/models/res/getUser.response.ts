import type { User } from '../constant/GetUser.dto';
export interface GetUsersResponse {
  data: User[];
  page: number;
  limit: number;
  nextUrl?: string;
}
