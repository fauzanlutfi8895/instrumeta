"use client";

import React, { useState } from "react";
import { useGetProducts } from "@/hooks/useProducts";
import { useUser } from "@/hooks/useUser";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { CreateProductModal } from "@/components/CreateProductModal";
import { Plus } from "lucide-react";

export default function IndexPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();
  const { data: user } = useUser();
  const [selected, setSelected] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar with Role */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Instrumeta</h1>
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Login sebagai</p>
                <p className="font-semibold text-gray-900">{user.username}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg text-sm font-bold ${
                isAdmin
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {isAdmin ? "👤 ADMIN" : "👥 USER"}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Produk</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola stok dan harga — klik produk untuk detail</p>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 font-medium"
              >
                <Plus size={18} />
                Tambah Produk
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <p className="mt-3 text-gray-500">Memuat produk...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error?.message || "Gagal memuat produk"}</p>
          </div>
        )}

        {/* Product Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => setSelected(product)} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {products && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-500">Tidak ada produk tersedia</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      {showCreateModal && <CreateProductModal onClose={() => setShowCreateModal(false)} />}
    </main>
  );
}
