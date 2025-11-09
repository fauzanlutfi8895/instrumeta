"use client";

import React, { useState } from "react";
import { useGetProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

export default function IndexPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();
  const [selected, setSelected] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Produk</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola stok dan harga — klik produk untuk detail</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">Mode Admin</label>
            <button onClick={() => setIsAdmin(s => !s)} className={`px-4 py-2 rounded-lg font-medium transition-all ${isAdmin ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {isAdmin ? "👤 ADMIN" : "👥 USER"}
            </button>
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
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} isAdmin={isAdmin} />}
    </main>
  );
}
