import axios from "axios";
import type { SignupRequest } from "~/models/req/signup.request";
import type { ApiResponse } from "~/models/res/api.response";
import type { SignupInitiateResponse } from "~/models/res/signup.response";
import type { VerifyRequest } from "~/models/req/signup.request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PREFIX_AUTH = import.meta.env.VITE_PREFIX_AUTH;

export const signup = async (
  payload: SignupRequest
): Promise<ApiResponse<SignupInitiateResponse>> => {
  const response = await axios.post<ApiResponse<SignupInitiateResponse>>(
    `${API_BASE_URL}/${PREFIX_AUTH}/signup`,
    payload
  );
  return response.data;
};

export const verifyOTP = async (
  payload: VerifyRequest
): Promise<ApiResponse<SignupInitiateResponse>> => {
  const response = await axios.post<ApiResponse<SignupInitiateResponse>>(
    `${API_BASE_URL}/${PREFIX_AUTH}/signup/verify-otp`,
    payload
  );
  return response.data;
};
