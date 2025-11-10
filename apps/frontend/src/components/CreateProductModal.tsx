"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useCreateProduct } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import * as Icons from "lucide-react";

interface CreateProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  participants: number;
  startDate: string;
  location: string;
  registrationLink: string;
  icon: string;
  backgroundColor: string;
}

const ICON_OPTIONS = [
  "BookOpen", "Music", "Zap", "Palette", "Code", "Briefcase",
  "Globe", "Cpu", "Smartphone", "Camera", "Pencil", "Award",
  "TrendingUp", "Users", "Star", "Heart"
];

const BG_COLOR_OPTIONS = [
  { name: "Blue", value: "from-blue-500 via-blue-600 to-blue-700" },
  { name: "Purple", value: "from-purple-500 via-purple-600 to-purple-700" },
  { name: "Pink", value: "from-pink-500 via-pink-600 to-pink-700" },
  { name: "Red", value: "from-red-500 via-red-600 to-red-700" },
  { name: "Green", value: "from-green-500 via-green-600 to-green-700" },
  { name: "Indigo", value: "from-indigo-500 via-indigo-600 to-indigo-700" },
  { name: "Cyan", value: "from-cyan-500 via-cyan-600 to-cyan-700" },
  { name: "Orange", value: "from-orange-500 via-orange-600 to-orange-700" },
];

interface Props {
  onClose: () => void;
}

export const CreateProductModal = ({ onClose }: Props) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<CreateProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      participants: 0,
      startDate: "",
      location: "",
      registrationLink: "",
      icon: "BookOpen",
      backgroundColor: "from-blue-500 via-blue-600 to-blue-700",
    },
  });

  const { mutate: createProduct, isPending } = useCreateProduct();
  
  const previewData = watch();

  const onSubmit = (data: CreateProductFormData) => {
    if (!data.name.trim()) {
      toast.error("Nama kelas harus diisi");
      return;
    }

    createProduct(
      {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        participants: Number(data.participants),
        isActive: true,
      } as any,
      {
        onSuccess: () => {
          toast.success("Kelas berhasil dibuat!");
          onClose();
        },
        onError: (err) => {
          toast.error(err.message || "Gagal membuat kelas");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Buat Kelas Baru</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-5">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nama Kelas *
                </label>
                <input
                  {...register("name", { required: "Nama kelas wajib diisi" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Contoh: Belajar Piano Dasar"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Deskripsi
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Jelaskan tentang kelas ini..."
                />
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Kapasitas (Kuota)
                  </label>
                  <input
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Jumlah Peserta Saat Ini
                  </label>
                  <input
                    type="number"
                    {...register("participants", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    type="date"
                    {...register("startDate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Location and Registration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Lokasi
                </label>
                <input
                  {...register("location")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Contoh: Jakarta, Zoom, Hybrid"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Link Pendaftaran
                </label>
                <input
                  {...register("registrationLink")}
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="https://form.link/..."
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Pilih Icon
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map((iconName) => {
                    const IconComp = (Icons as any)[iconName];
                    const isSelected = previewData.icon === iconName;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setValue("icon", iconName)}
                        className={`p-3 rounded-lg border-2 flex items-center justify-center transition ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <IconComp size={20} className={isSelected ? "text-blue-600" : "text-gray-600"} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Pilih Warna Latar
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {BG_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setValue("backgroundColor", color.value)}
                      className={`p-3 rounded-lg border-2 transition ${
                        previewData.backgroundColor === color.value
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className={`w-full h-8 rounded bg-gradient-to-r ${color.value}`} />
                      <p className="text-xs text-center mt-1 font-medium">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {isPending ? "Menyimpan..." : "Buat Kelas"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            {/* Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <p className="text-sm font-semibold text-gray-900 mb-3">Preview Kartu Kelas</p>
                <ProductCard
                  product={{
                    id: "preview",
                    ...previewData,
                    isActive: true,
                  } as any}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
