"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Printer, ShoppingBag, Clock, Mail, Phone } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  options: string | null;
}

interface Order {
  orderNumber: string;
  createdAt: string;
  deliveryType: string;
  deliveryAddress?: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: OrderItem[];
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  pickupTime?: string;
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("crestfoods_lastOrder");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          No Order Found
        </h2>
        <p className="mb-6 text-gray-500">
          We couldn&apos;t find your order details.
        </p>
        <Link href="/menu" className="btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-bg py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Success Banner */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-500">
            Your order <strong className="text-brand-red">#{order.orderNumber}</strong>{" "}
            has been placed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Order Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-semibold text-brand-red">#{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-semibold">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {order.deliveryType === "delivery" ? "Delivery" : "Pickup"}
              </p>
              <p className="font-semibold capitalize">
                {order.deliveryType === "delivery"
                  ? order.deliveryAddress
                  : "Store Pickup — 42 Collins St, Melbourne"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold capitalize">
                {order.paymentMethod === "card"
                  ? "Credit/Debit Card"
                  : order.paymentMethod === "paypal"
                  ? "PayPal"
                  : "Pay on Collection"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Order Items
          </h2>
          <div className="space-y-3">
            {order.items.map((item, i) => {
              const opts = item.options ? JSON.parse(item.options) : null;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}{" "}
                      <span className="text-gray-400">x{item.quantity}</span>
                    </p>
                    {opts && (
                      <p className="text-xs text-gray-400">
                        {[opts.size, opts.flavor, opts.customMessage]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span>
                {order.deliveryFee === 0
                  ? "Free"
                  : formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 text-xl font-bold">
              <span>Total</span>
              <span className="text-brand-red">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            What Happens Next?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Email Confirmation</p>
                <p className="text-sm text-gray-500">
                  A receipt will be sent to {order.customerEmail}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">
                  {order.deliveryType === "delivery"
                    ? "Estimated Delivery"
                    : "Pickup Ready"}
                </p>
                <p className="text-sm text-gray-500">
                  Within 45-60 minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Actions */}
        <div className="mb-6 rounded-xl bg-brand-cream p-6 text-center">
          <p className="mb-2 font-medium text-gray-700">Need Help?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" /> (03) 9123 4567
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> support@crestfoods.com.au
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/menu" className="btn-primary">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            <Printer className="mr-2 h-5 w-5" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
