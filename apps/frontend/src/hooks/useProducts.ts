import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  description?: string;
}

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product[]>("/products");
      return data;
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, Partial<Product> & { id: string | number }>({
    mutationFn: async payload => {
      const { id, ...rest } = payload as Partial<Product> & { id: string | number };
      const { data } = await axiosInstance.put<Product>(`/products/${id}`, rest);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
