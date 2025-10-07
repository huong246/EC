export interface RegisterRequest
{
  username:string;
  password:string;
  phoneNumber:string;
  fullName:string;
  email:string;
}
export interface LoginRequest
{
  username:string;
  password:string;
}

export interface LoginResponse
{
  accessToken:string;
  refreshToken:string;
}
export interface ForgotPasswordRequest
{
  email:string;
}
export interface ResetPasswordRequest
{
  email:string;
  newPassword:string;
  token:string;
}

export interface SimpleApiResponse {
  message: string;
}

export interface RefreshTokenRequest
{
  accessToken:string;
  refreshToken:string;
}
