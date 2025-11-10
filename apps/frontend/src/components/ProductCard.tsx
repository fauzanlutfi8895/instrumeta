"use client";

import React from "react";
import { Product } from "@/hooks/useProducts";
import { Users, Clock, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

interface Props {
  product: Product;
  onClick?: (p: Product) => void;
}

// Get icon by name
const getIconComponent = (iconName: string) => {
  return (Icons as any)[iconName] || Icons.BookOpen;
};

// Format date to Indonesian format (e.g., "Rabu, 8 Nov 2025")
const formatDateToIndonesian = (dateString: string | undefined) => {
  if (!dateString) return "TBD";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
};

export const ProductCard = ({ product, onClick }: Props) => {
  const IconComponent = getIconComponent(product.icon || "BookOpen");
  const bgClass = product.backgroundColor || "from-blue-500 via-blue-600 to-blue-700";

  return (
    <article 
      onClick={() => onClick && onClick(product)} 
      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Header dengan gradient custom */}
      <div className={`relative h-32 bg-gradient-to-br ${bgClass} overflow-hidden`}>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-1/4 translate-y-1/3" />
        
        {/* Icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
            <IconComponent size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Title dan Description */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description || "Kelas yang informatif dan interaktif"}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 py-3 border-y border-gray-100 flex-wrap">
          <div className="flex items-center gap-1 text-sm text-gray-600 min-w-max">
            <Users size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">{product.participants || 0} peserta</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 min-w-max">
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">{formatDateToIndonesian(product.startDate)}</span>
          </div>
          <div className="flex-1" />
          {product.isActive ? (
            product.stock > 0 ? (
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                Tersedia
              </span>
            ) : (
              <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-full whitespace-nowrap">
                Habis
              </span>
            )
          ) : (
            <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full whitespace-nowrap">
              Ditutup
            </span>
          )}
        </div>

        {/* Footer dengan Price dan CTA */}
        <div className="flex items-center justify-between pt-2 gap-2">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Harga Kelas</p>
            <p className="text-xl font-bold text-blue-600 truncate">
              Rp{product.price.toLocaleString()}
            </p>
          </div>
          <button className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </article>
  );
};
