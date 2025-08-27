import axios from "axios";
import type { ApiResponse } from "~/models/res/api.response";
import type { ForgetPasswordRequest } from "~/models/req/forgetPassword.request";
import type { ResetPasswordRequest } from "~/models/req/resetPassword.request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PREFIX_AUTH = import.meta.env.VITE_PREFIX_AUTH;


export async function requestOTP(
  payload: ForgetPasswordRequest
): Promise<ApiResponse<ForgetPasswordRequest>> {
  const response = await axios.post<ApiResponse<ForgetPasswordRequest>>(
    `${API_BASE_URL}/${PREFIX_AUTH}/forgot-password`,
    payload
  );
  return response.data;
}


export async function resetPasswordWithOTP(
  payload: ResetPasswordRequest
): Promise<ApiResponse<null>> {
  const response = await axios.post<ApiResponse<null>>(
    `${API_BASE_URL}/${PREFIX_AUTH}/forgot-password/reset-password`,
    payload
  );
  return response.data;
}