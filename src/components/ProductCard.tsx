"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Toast } from "./Toast";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  isAvailable: boolean;
  category?: {
    slug: string;
    colorPrimary: string | null;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity: 1,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Link href={`/product/${product.slug}`} className="card group block overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <span className="text-4xl">🍽️</span>
            </div>
          )}
          {!product.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-lg font-semibold text-gray-800 group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="mb-3 line-clamp-2 text-sm text-gray-500">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span
              className="text-xl font-bold"
              style={{ color: product.category?.colorPrimary || "#dc3545" }}
            >
              {formatPrice(product.price)}
            </span>
            {product.isAvailable && (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-brand-dark-red active:scale-95"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </button>
            )}
          </div>
        </div>
      </Link>
      {showToast && (
        <Toast
          message={`${product.name} added to cart!`}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
