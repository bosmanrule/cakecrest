"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-1 text-2xl font-bold">
          <span className="text-3xl">🎂</span>
          <span className="text-brand-dark-red">Crest</span>
          <span className="text-brand-red">Foods</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Menu
          </Link>
          <Link
            href="/menu?category=food"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Food
          </Link>
          <Link
            href="/menu?category=bread"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Bread
          </Link>
          <Link
            href="/menu?category=cakes"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Cakes
          </Link>
          <Link
            href="/menu?category=drinks"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-red"
          >
            Drinks
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 transition-colors hover:text-brand-red" />
            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Full Menu
            </Link>
            <Link
              href="/menu?category=food"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Food
            </Link>
            <Link
              href="/menu?category=bread"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Bread & Pastries
            </Link>
            <Link
              href="/menu?category=cakes"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Cakes & Confections
            </Link>
            <Link
              href="/menu?category=drinks"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-700"
            >
              Drinks
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
