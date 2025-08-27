export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}