"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Toast } from "@/components/Toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fullDesc: string | null;
  price: number;
  image: string | null;
  ingredients: string | null;
  allergens: string | null;
  sizes: string | null;
  flavors: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
    colorPrimary: string | null;
  };
}

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  description: string | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) {
        window.location.href = "/menu";
        return;
      }
      const data = await res.json();
      setProduct(data);

      if (data.sizes) {
        const sizes = JSON.parse(data.sizes);
        if (sizes.length > 0) setSelectedSize(sizes[0]);
      }
      if (data.flavors) {
        const flavors = JSON.parse(data.flavors);
        if (flavors.length > 0) setSelectedFlavor(flavors[0]);
      }

      // Load related products
      const relRes = await fetch(`/api/products?category=${data.category.slug}`);
      const allProducts = await relRes.json();
      setRelated(
        allProducts.filter((p: RelatedProduct) => p.id !== data.id).slice(0, 3)
      );

      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  if (!product) return null;

  const sizes = product.sizes ? JSON.parse(product.sizes) : [];
  const flavors = product.flavors ? JSON.parse(product.flavors) : [];
  const ingredients = product.ingredients
    ? JSON.parse(product.ingredients)
    : [];
  const allergens = product.allergens ? JSON.parse(product.allergens) : [];

  const handleAddToCart = () => {
    const options: Record<string, string> = {};
    if (selectedSize) options.size = selectedSize;
    if (selectedFlavor) options.flavor = selectedFlavor;
    if (customMessage) options.customMessage = customMessage;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity,
      options: Object.keys(options).length > 0 ? options : undefined,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-light-bg">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/menu" className="hover:text-brand-red">
            Menu
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/menu?category=${product.category.slug}`}
            className="hover:text-brand-red"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <span className="text-6xl">🍽️</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p
              className="mb-2 text-sm font-medium uppercase tracking-wider"
              style={{ color: product.category.colorPrimary || "#dc3545" }}
            >
              {product.category.name}
            </p>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mb-6 text-3xl font-bold text-brand-red">
              {formatPrice(product.price)}
            </p>
            <p className="mb-6 text-gray-600 leading-relaxed">
              {product.fullDesc || product.description}
            </p>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-gray-300 text-gray-600 hover:border-brand-red"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Selector */}
            {flavors.length > 0 && (
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Flavour
                </label>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((flavor: string) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                        selectedFlavor === flavor
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-gray-300 text-gray-600 hover:border-brand-red"
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Message */}
            {sizes.length > 0 && (
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Custom Message (optional)
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g., Happy Birthday John!"
                  className="input-field"
                  maxLength={100}
                />
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center overflow-hidden rounded-full border-2 border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(50, quantity + 1))}
                  className="px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1 py-4 text-base">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart — {formatPrice(product.price * quantity)}
              </button>
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {ingredients.map((ing: string) => (
                    <span
                      key={ing}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {allergens.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                  Allergens
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {allergens.map((a: string) => (
                    <span
                      key={a}
                      className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark-red">
              You Might Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="card group block overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <span className="text-4xl">🍽️</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-brand-red transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-lg font-bold text-brand-red">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {showToast && (
        <Toast
          message={`${product.name} added to cart!`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
