"use client";

import React from "react";
import { Product } from "@/hooks/useProducts";

interface Props {
  product: Product;
  onClick?: (p: Product) => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
  return (
    <article onClick={() => onClick && onClick(product)} className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description || "-"}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-sm text-gray-500">Harga</div>
          <div className="text-lg font-semibold text-gray-900">Rp{product.price.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {product.stock > 0 ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 block" />
              <span>In stock</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 block" />
              <span>Out of stock</span>
            </>
          )}
        </span>

        <span className="text-xs text-gray-400">Click for details</span>
      </div>
    </article>
  );
};
