import axios from "axios";
import type { LoginRequest } from "~/models/req/login.request";
import type { ApiResponse } from "~/models/res/api.response";
import type { LoginResponse } from "~/models/res/login.response";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PREFIX_AUTH = import.meta.env.VITE_PREFIX_AUTH;
export async function login(
  payload: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${API_BASE_URL}/${PREFIX_AUTH}/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
