"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateProduct, Product } from "@/hooks/useProducts";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export const CreateProductModal = ({ onClose }: Props) => {
  const { mutate: createProduct } = useCreateProduct();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<
    Omit<Product, "id">
  >({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = (values: any) => {
    createProduct(values, {
      onSuccess: () => {
        toast.success("Produk berhasil dibuat");
        reset();
        onClose();
      },
      onError: (err: Error) => {
        toast.error(err.message || "Gagal membuat produk");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tambah Produk Baru</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Nama produk wajib diisi",
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama produk"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi produk (opsional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Harga wajib diisi",
                  valueAsNumber: true,
                  min: { value: 0, message: "Harga tidak boleh negatif" },
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
              />
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stok
              </label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stok wajib diisi",
                  valueAsNumber: true,
                  min: { value: 0, message: "Stok tidak boleh negatif" },
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-6">
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
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
