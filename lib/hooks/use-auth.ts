"use client";

import { QUERY_KEYS } from "@/lib/constants";
import { authService } from "@/lib/services";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/modules/auth/types";
import { ApiResponse } from "@/lib/types/response.type";
import { User } from "@/modules/account/types";
import { authCookies } from "@/lib/utils/cookies.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function mapApiUserToUser(apiUser: AuthResponse["user"]): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    password: "",
    userName: apiUser.userName,
    fullName: apiUser.fullName || "",
    role: apiUser.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: [QUERY_KEYS.AUTH_USER],
    queryFn: () => {
      const token = authCookies.getAccessToken();
      if (!token) {
        authCookies.remove();
        return null;
      }

      const savedUser = authCookies.getUser();
      if (savedUser) {
        return savedUser as User;
      }

      return null;
    },
    staleTime: Infinity,
  });

  const loginMutation = useMutation<ApiResponse<AuthResponse>, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      if (response.data) {
        authCookies.setTokens(response.data.accessToken, response.data.refreshToken);

        const mappedUser = mapApiUserToUser(response.data.user);
        authCookies.setUser(mappedUser);

        queryClient.setQueryData([QUERY_KEYS.AUTH_USER], mappedUser);
      }
    },
  });

  const registerMutation = useMutation<ApiResponse<AuthResponse>, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      if (response.data) {
        authCookies.setTokens(response.data.accessToken, response.data.refreshToken);

        const mappedUser = mapApiUserToUser(response.data.user);
        authCookies.setUser(mappedUser);

        queryClient.setQueryData([QUERY_KEYS.AUTH_USER], mappedUser);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = authCookies.getAccessToken();
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      return authService.logout(refreshToken);
    },
    onSettled: () => {
      authCookies.remove();
      queryClient.setQueryData([QUERY_KEYS.AUTH_USER], null);
      queryClient.clear();
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

