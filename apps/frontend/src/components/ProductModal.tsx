"use client";

import React, { useState } from "react";
import { Product, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Trash2, X, MapPin, Users, Calendar, ExternalLink, Edit2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import * as Icons from "lucide-react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const getIconComponent = (iconName: string) => {
  return (Icons as any)[iconName] || Icons.BookOpen;
};

export const ProductModal = ({ product, onClose }: Props) => {
  const { data: user } = useUser();
  const isAdmin = user?.role === "ADMIN";
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Partial<Product & { id: string | number }>>({
    defaultValues: product || {},
  });

  React.useEffect(() => {
    reset(product || {});
  }, [product, reset]);

  if (!product) return null;

  const IconComponent = getIconComponent(product.icon || "BookOpen");
  const bgClass = product.backgroundColor || "from-blue-500 via-blue-600 to-blue-700";

  const onSubmit = (values: any) => {
    updateMutation.mutate(
      { id: product.id, ...values },
      {
        onSuccess: () => {
          toast.success("Kelas berhasil diperbarui");
          setIsEditMode(false);
          onClose();
        },
        onError: (err: Error) => {
          toast.error(err.message || "Gagal memperbarui kelas");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success("Kelas berhasil dihapus");
        onClose();
      },
      onError: (err: Error) => {
        toast.error(err.message || "Gagal menghapus kelas");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Hero Section */}
        <div className={`relative h-40 bg-gradient-to-br ${bgClass} flex items-center justify-center`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-1/4 translate-y-1/3" />
          </div>
          <IconComponent size={56} className="text-white relative z-10" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition z-20"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {!isEditMode ? (
            <>
              {/* Header Info */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-lg font-semibold text-blue-600">Rp{product.price.toLocaleString()}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Users size={20} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{product.participants || 0}</p>
                  <p className="text-xs text-gray-600 mt-1">Peserta</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <span className="text-2xl font-bold text-green-600">{product.stock}</span>
                  <p className="text-xs text-gray-600 mt-2">Kuota</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Calendar size={20} className="text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-900">{product.startDate || "TBD"}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <span className={`text-sm font-bold ${product.isActive ? "text-green-600" : "text-gray-600"}`}>
                    {product.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>

              {/* Location */}
              {product.location && (
                <div className="mb-6 flex items-start gap-3">
                  <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Lokasi</p>
                    <p className="font-semibold text-gray-900">{product.location}</p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "Tidak ada deskripsi untuk kelas ini."}
                </p>
              </div>

              {/* Registration Link */}
              {product.registrationLink && (
                <div className="mb-6">
                  <a
                    href={product.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
                  >
                    <span>Daftar Sekarang</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              )}

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex-1 px-4 py-3 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Kelas
                  </button>
                  <button
                    onClick={() => setIsDeleteConfirm(true)}
                    className="flex-1 px-4 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Hapus
                  </button>
                </div>
              )}

              {!isAdmin && !product.registrationLink && (
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Tutup
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900">Edit Kelas</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nama Kelas
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deskripsi
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Kuota
                  </label>
                  <input
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* Delete Confirmation */}
          {isDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setIsDeleteConfirm(false)} />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Hapus Kelas?</h3>
                <p className="text-gray-600 mb-6">
                  Apakah Anda yakin ingin menghapus kelas "{product.name}"? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
