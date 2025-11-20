import { fetcher } from "@/lib/configs/fetcher";
import { ENDPOINTS } from "@/lib/configs/endpoints";
import { ApiResponse } from "@/lib/types/response.type";
import {
  AuthResponse,
  LoginRequest,
  LogoutResponse,
  RegisterRequest,
} from "@/modules/auth/types";

export const authService = {
  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return fetcher.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
  },

  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return fetcher.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  async logout(refreshToken: string): Promise<ApiResponse<LogoutResponse>> {
    return fetcher.post<LogoutResponse>(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
  },
};

