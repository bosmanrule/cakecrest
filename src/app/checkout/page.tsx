"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Truck,
  Store,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryType: "pickup",
    deliveryAddress: "",
    deliveryNotes: "",
    pickupTime: "",
    paymentMethod: "card",
    specialNotes: "",
  });

  useEffect(() => {
    setMounted(true);
    // Fetch delivery fee from settings
    fetch("/api/settings")
      .then((r) => r.json())
      .then((settings) => {
        if (settings.delivery_fee) {
          setDeliveryFee(parseFloat(settings.delivery_fee));
        }
      })
      .catch(() => {});
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
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>
        <p className="mb-6 text-gray-500">
          Add some items before checking out.
        </p>
        <Link href="/menu" className="btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const currentDeliveryFee = form.deliveryType === "delivery" ? deliveryFee : 0;
  const total = subtotal + currentDeliveryFee;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: item.options ? JSON.stringify(item.options) : null,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerFirstName: form.firstName,
          customerLastName: form.lastName,
          customerEmail: form.email,
          customerPhone: form.phone,
          deliveryType: form.deliveryType,
          deliveryAddress:
            form.deliveryType === "delivery" ? form.deliveryAddress : null,
          deliveryNotes:
            form.deliveryType === "delivery" ? form.deliveryNotes : null,
          pickupTime:
            form.deliveryType === "pickup" ? form.pickupTime : null,
          paymentMethod: form.paymentMethod,
          specialNotes: form.specialNotes || null,
          items: orderItems,
        }),
      });

      const data = await res.json();

      if (data.order) {
        // Store order info for confirmation page
        localStorage.setItem(
          "crestfoods_lastOrder",
          JSON.stringify(data.order)
        );
        clearCart();
        router.push(`/confirmation?order=${data.order.orderNumber}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-bg py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold text-brand-dark-red">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Contact Info */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                  Contact Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                  Delivery Options
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      form.deliveryType === "pickup"
                        ? "border-brand-red bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      checked={form.deliveryType === "pickup"}
                      onChange={handleChange}
                      className="accent-brand-red"
                    />
                    <Store className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Store Pickup</div>
                      <div className="text-sm text-green-600">Free</div>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      form.deliveryType === "delivery"
                        ? "border-brand-red bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="delivery"
                      checked={form.deliveryType === "delivery"}
                      onChange={handleChange}
                      className="accent-brand-red"
                    />
                    <Truck className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Home Delivery</div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(deliveryFee)}
                      </div>
                    </div>
                  </label>
                </div>

                {form.deliveryType === "delivery" && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Delivery Address *
                      </label>
                      <textarea
                        name="deliveryAddress"
                        value={form.deliveryAddress}
                        onChange={handleChange}
                        required
                        rows={2}
                        className="input-field"
                        placeholder="Enter your full delivery address"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Delivery Notes
                      </label>
                      <input
                        type="text"
                        name="deliveryNotes"
                        value={form.deliveryNotes}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., Leave at front door"
                      />
                    </div>
                  </div>
                )}

                {form.deliveryType === "pickup" && (
                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Preferred Pickup Time
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={form.pickupTime}
                      onChange={handleChange}
                      className="input-field max-w-xs"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      42 Collins Street, Melbourne VIC 3000
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                  Payment Method
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      form.paymentMethod === "card"
                        ? "border-brand-red bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === "card"}
                      onChange={handleChange}
                      className="accent-brand-red"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      form.paymentMethod === "paypal"
                        ? "border-brand-red bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={form.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="accent-brand-red"
                    />
                    <span className="text-lg">🅿️</span>
                    <span className="font-medium">PayPal</span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      form.paymentMethod === "pay_on_collection"
                        ? "border-brand-red bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_on_collection"
                      checked={form.paymentMethod === "pay_on_collection"}
                      onChange={handleChange}
                      className="accent-brand-red"
                    />
                    <span className="text-lg">💵</span>
                    <span className="font-medium">Pay on Collection</span>
                  </label>
                </div>
                {form.paymentMethod === "card" && (
                  <p className="mt-3 text-sm text-gray-500">
                    You will be redirected to Stripe for secure payment after
                    placing your order.
                  </p>
                )}
              </div>

              {/* Special Notes */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                  Special Instructions
                </h2>
                <textarea
                  name="specialNotes"
                  value={form.specialNotes}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                  Order Summary
                </h2>
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gray-100 text-sm">
                            🍽️
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      {currentDeliveryFee === 0
                        ? "Free"
                        : formatPrice(currentDeliveryFee)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-4 mt-2 text-xl font-bold">
                  <span>Total</span>
                  <span className="text-brand-red">{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-6 w-full justify-center py-3.5 text-base disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatPrice(total)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
