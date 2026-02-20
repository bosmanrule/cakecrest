"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="mb-6 text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/menu" className="btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();

  return (
    <div className="min-h-screen bg-brand-light-bg py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold text-brand-dark-red">
          Your Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.options)}`}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <span className="text-2xl">🍽️</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      {item.options && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.options.size && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {item.options.size}
                            </span>
                          )}
                          {item.options.flavor && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {item.options.flavor}
                            </span>
                          )}
                          {item.options.customMessage && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              &quot;{item.options.customMessage}&quot;
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                          <button
                            onClick={() =>
                              updateQuantity(index, item.quantity - 1)
                            }
                            className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(index, item.quantity + 1)
                            }
                            className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-bold text-brand-red">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-gray-400">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Subtotal</span>
                <span className="text-brand-red">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="btn-primary w-full justify-center py-3.5 text-base"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/menu"
                className="mt-3 block text-center text-sm text-gray-500 hover:text-brand-red"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
