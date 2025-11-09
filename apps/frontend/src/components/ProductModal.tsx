"use client";

import React, { useState } from "react";
import { Product, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Trash2, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: Props) => {
  const { data: user } = useUser();
  const isAdmin = user?.role === "ADMIN";
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Product & { id: string | number }>>({
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

  const handleDelete = () => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success("Produk berhasil dihapus");
        onClose();
      },
      onError: (err: Error) => {
        toast.error(err.message || "Gagal menghapus produk");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Rp{product.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-gray-500">Stok: </span>
            <span className="font-semibold text-gray-900">{product.stock}</span>
          </div>
          {isAdmin && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Mode Edit
            </span>
          )}
        </div>

        <div className="mt-4 mb-6">
          <p className="text-sm text-gray-600">
            {product.description || "Tidak ada deskripsi."}
          </p>
        </div>

        {isAdmin && !isDeleteConfirm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="text-xs text-red-600 mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stok
              </label>
              <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.stock && (
                <p className="text-xs text-red-600 mt-1">{errors.stock.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsDeleteConfirm(true)}
                className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center gap-2"
              >
                <Trash2 size={16} />
                Hapus
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        )}

        {isAdmin && isDeleteConfirm && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 mb-4">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Batalkan
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Hapus Produk
              </button>
            </div>
          </div>
        )}

        {!isAdmin && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
