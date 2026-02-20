"use client";

import { useEffect, useState } from "react";
import { Package, FolderOpen, ShoppingCart, DollarSign } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
    customerFirstName: string;
    customerLastName: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const [catRes, prodRes, orderRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products?includeHidden=true"),
        fetch("/api/orders"),
      ]);
      const categories = await catRes.json();
      const products = await prodRes.json();
      const orders = await orderRes.json();

      setStats({
        totalCategories: categories.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce(
          (sum: number, o: { total: number }) => sum + o.total,
          0
        ),
        recentOrders: orders.slice(0, 10),
      });
    }
    load();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="admin-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-2xl font-bold">{stats.totalCategories}</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Products</p>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Recent Orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Order #</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-brand-red">
                      #{order.orderNumber}
                    </td>
                    <td className="py-3">
                      {order.customerFirstName} {order.customerLastName}
                    </td>
                    <td className="py-3">
                      <span
                        className={`badge ${
                          statusColors[order.status] || "bg-gray-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-AU")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
