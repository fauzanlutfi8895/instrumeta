import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  participants?: number;
  startDate?: string;
  location?: string;
  isActive?: boolean;
  icon?: string;
  backgroundColor?: string;
  registrationLink?: string;
}

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: Product[] }>(
        "product/api/get-products"
      );
      return response.data.data;
    },
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<{ data: Product }>(
        "product/api/create-product",
        payload
      );
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, Partial<Product> & { id: string | number }>(
    {
      mutationFn: async (payload) => {
        const { id, ...rest } = payload as Partial<Product> & {
          id: string | number;
        };
        const { data } = await axiosInstance.put<{ data: Product }>(
          `product/api/update-product/${id}`,
          rest
        );
        return data.data;
      },
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["products"] });
      },
    }
  );
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await axiosInstance.delete(`product/api/delete-product/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
