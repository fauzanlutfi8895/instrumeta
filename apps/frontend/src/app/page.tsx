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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar with Role */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Instrumeta</h1>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Login sebagai</p>
                <p className="font-semibold text-gray-900">{user.username}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Kelas Instrumen Musik</h1>
              <p className="text-gray-600">Pelajari berbagai instrumen dari para ahli. Klik kartu untuk melihat detail lengkap.</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                Tambah Kelas
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
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
