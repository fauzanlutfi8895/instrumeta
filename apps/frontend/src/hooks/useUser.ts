import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface User {
  username: string;
  role: "USER" | "ADMIN";
}

export const useUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<User>("/api/logged-in-user");
        return response.data;
      } catch (error) {
        // If not authenticated, return null instead of throwing
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
