import { useMutation } from "@tanstack/react-query";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async data => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
  });
};

export const useSignup = () => {
  return useMutation<AuthResponse, Error, SignupPayload>({
    mutationFn: async data => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }

      return response.json();
    },
  });
};
