export interface SignupRequest {
  name: string;
  nickName: string;
  email: string;
  password: string;
}
export interface VerifyRequest {
  email: string;
  otp: string;
}
