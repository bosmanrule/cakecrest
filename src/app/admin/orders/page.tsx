"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { formatPrice, formatDate, STATUS_COLORS, ORDER_STATUSES, OrderStatus } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: string;
  deliveryAddress: string | null;
  deliveryNotes: string | null;
  pickupTime: string | null;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  specialNotes: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    setOrders(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Order Detail Modal */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Order #{detailOrder.orderNumber}
              </h2>
              <button
                onClick={() => setDetailOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">
                  {detailOrder.customerFirstName}{" "}
                  {detailOrder.customerLastName}
                </p>
                <p className="text-sm text-gray-500">
                  {detailOrder.customerEmail}
                </p>
                <p className="text-sm text-gray-500">
                  {detailOrder.customerPhone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery</p>
                <p className="font-medium capitalize">
                  {detailOrder.deliveryType}
                </p>
                {detailOrder.deliveryAddress && (
                  <p className="text-sm text-gray-500">
                    {detailOrder.deliveryAddress}
                  </p>
                )}
                {detailOrder.pickupTime && (
                  <p className="text-sm text-gray-500">
                    Pickup: {detailOrder.pickupTime}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2">
                {ORDER_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateStatus(detailOrder.id, s);
                      setDetailOrder({ ...detailOrder, status: s });
                    }}
                    className={`badge cursor-pointer ${
                      detailOrder.status === s
                        ? STATUS_COLORS[s as OrderStatus]
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-3 text-sm font-medium text-gray-700">Items</h3>
              <div className="space-y-2">
                {detailOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x{item.quantity}
                      {item.options && (
                        <span className="ml-1 text-gray-400">
                          (
                          {Object.values(JSON.parse(item.options))
                            .filter(Boolean)
                            .join(", ")}
                          )
                        </span>
                      )}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 border-t pt-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(detailOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span>{formatPrice(detailOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-red">
                    {formatPrice(detailOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            {detailOrder.specialNotes && (
              <div className="mt-4 rounded-lg bg-yellow-50 p-3">
                <p className="text-sm font-medium text-yellow-800">
                  Special Notes:
                </p>
                <p className="text-sm text-yellow-700">
                  {detailOrder.specialNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="admin-card">
        {filteredOrders.length === 0 ? (
          <p className="py-8 text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-2">
            {filteredOrders.map((order) => (
              <div key={order.id} className="rounded-lg border border-gray-100">
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-brand-red">
                      #{order.orderNumber}
                    </span>
                    <span className="text-sm text-gray-500">
                      {order.customerFirstName} {order.customerLastName}
                    </span>
                    <span
                      className={`badge ${
                        STATUS_COLORS[order.status as OrderStatus] ||
                        "bg-gray-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(order.total)}
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
                {expandedOrder === order.id && (
                  <div className="border-t bg-gray-50 px-4 py-3">
                    <div className="mb-3 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <span className="text-gray-500">Email:</span>{" "}
                        {order.customerEmail}
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>{" "}
                        {order.customerPhone}
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>{" "}
                        <span className="capitalize">
                          {order.deliveryType}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3 space-y-1 text-sm">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailOrder(order);
                        }}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        View Details
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(order.id, e.target.value);
                        }}
                        className="input-field max-w-xs text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
