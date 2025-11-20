export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  fullName?: string | null;
  gender: "male" | "female";
  email: string;
  dateOfBirth?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export interface LogoutResponse {
  message: string;
}

