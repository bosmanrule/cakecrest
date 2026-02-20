"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  colorPrimary: string | null;
  colorSecondary: string | null;
  colorBg: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    colorPrimary: "#dc3545",
    colorSecondary: "#8b0000",
    colorBg: "#fef5f4",
    sortOrder: 0,
    isActive: true,
  });

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      image: "",
      colorPrimary: "#dc3545",
      colorSecondary: "#8b0000",
      colorBg: "#fef5f4",
      sortOrder: 0,
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openEdit = (cat: Category) => {
    setForm({
      name: cat.name,
      description: cat.description || "",
      image: cat.image || "",
      colorPrimary: cat.colorPrimary || "#dc3545",
      colorSecondary: cat.colorSecondary || "#8b0000",
      colorBg: cat.colorBg || "#fef5f4",
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = editingId
      ? `/api/categories/${editingId}`
      : "/api/categories";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    resetForm();
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete category");
      return;
    }
    loadCategories();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="btn-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Category" : "New Category"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="input-field"
                  rows={2}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input-field"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={form.colorPrimary}
                    onChange={(e) =>
                      setForm({ ...form, colorPrimary: e.target.value })
                    }
                    className="h-10 w-full cursor-pointer rounded-lg"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={form.colorSecondary}
                    onChange={(e) =>
                      setForm({ ...form, colorSecondary: e.target.value })
                    }
                    className="h-10 w-full cursor-pointer rounded-lg"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Background
                  </label>
                  <input
                    type="color"
                    value={form.colorBg}
                    onChange={(e) =>
                      setForm({ ...form, colorBg: e.target.value })
                    }
                    className="h-10 w-full cursor-pointer rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
                    }
                    className="input-field"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="accent-brand-red h-4 w-4"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Slug</th>
              <th className="pb-3 font-medium">Products</th>
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: cat.colorPrimary || "#dc3545" }}
                    />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{cat.slug}</td>
                <td className="py-3">{cat._count?.products || 0}</td>
                <td className="py-3">{cat.sortOrder}</td>
                <td className="py-3">
                  <span
                    className={`badge ${
                      cat.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            No categories yet. Click &quot;Add Category&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}
