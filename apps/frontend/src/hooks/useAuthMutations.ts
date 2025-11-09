import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload {
  username: string;
  password: string;
  role: "USER" | "ADMIN";
}

interface AuthResponse {
  message: string;
  user?: {
    username: string;
    role?: string;
  };
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async data => {
      const response = await axiosInstance.post<AuthResponse>("/api/login", data);
      return response.data;
    },
  });
};

export const useSignup = () => {
  return useMutation<AuthResponse, Error, SignupPayload>({
    mutationFn: async data => {
      const response = await axiosInstance.post<AuthResponse>("/api/register", data);
      return response.data;
    },
  });
};
