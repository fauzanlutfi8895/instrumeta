"use client";

import React from "react";
import { Product, useUpdateProduct } from "@/hooks/useProducts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  product: Product | null;
  onClose: () => void;
  isAdmin?: boolean;
}

export const ProductModal = ({ product, onClose, isAdmin = false }: Props) => {
  const updateMutation = useUpdateProduct();
  const { register, handleSubmit, reset } = useForm<Partial<Product & { id: string | number }>>({
    defaultValues: product || {},
  });

  React.useEffect(() => {
    reset(product || {});
  }, [product, reset]);

  if (!product) return null;

  const onSubmit = (values: any) => {
    updateMutation.mutate(
      { id: product.id, ...values },
      {
        onSuccess: () => {
          toast.success("Produk berhasil diperbarui");
          onClose();
        },
        onError: (err: Error) => {
          toast.error(err.message || "Gagal memperbarui produk");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Rp{product.price.toLocaleString()}</p>
          </div>
          <div className="text-sm text-gray-500">
            Stock: <span className="font-semibold text-gray-900">{product.stock}</span>
          </div>
        </header>

        <div className="mt-4">
          <p className="text-sm text-gray-600">{product.description || "Tidak ada deskripsi."}</p>
        </div>

        {isAdmin && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1">
              <label className="block text-sm text-gray-700 mb-1">Nama</label>
              <input {...register("name")} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Harga</label>
              <input type="number" {...register("price", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Stock</label>
              <input type="number" {...register("stock", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Deskripsi</label>
              <textarea {...register("description")} className="w-full px-3 py-2 border rounded-lg" rows={3} />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100">
                Batal
              </button>
              <button type="submit" disabled={(updateMutation as any).isLoading} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                {(updateMutation as any).isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        )}

        {!isAdmin && (
          <div className="mt-6 text-right">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
