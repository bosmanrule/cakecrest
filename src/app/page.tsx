import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Truck, Clock, Award, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

async function getData() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  const featuredProducts = await prisma.product.findMany({
    where: { isAvailable: true },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return { categories, featuredProducts, settings: settingsMap };
}

export default async function HomePage() {
  const { categories, featuredProducts, settings } = await getData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              settings.hero_image ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
            }
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {settings.hero_title || "Delicious Food, Freshly Made"}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 sm:text-xl">
            {settings.hero_subtitle ||
              "Experience the best of Nigerian-Australian fusion cuisine, artisan breads, and custom cakes."}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/menu" className="btn-primary text-base px-8 py-4">
              View Our Menu
            </Link>
            <Link
              href="/menu?category=cakes"
              className="btn-secondary border-white text-white hover:bg-white hover:text-brand-dark-red text-base px-8 py-4"
            >
              Order Custom Cake
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-brand-dark-red sm:text-4xl">
              Explore Our Menu
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              From hearty meals to freshly baked goods, we have something for
              everyone
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.slug}`}
                className="group card overflow-hidden"
                style={{
                  borderTop: `4px solid ${category.colorPrimary || "#dc3545"}`,
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center"
                      style={{
                        backgroundColor: category.colorBg || "#fef5f4",
                      }}
                    >
                      <span className="text-4xl">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3
                    className="text-lg font-bold transition-colors group-hover:text-brand-red"
                    style={{ color: category.colorSecondary || "#8b0000" }}
                  >
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    {category._count.products} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-brand-dark-red sm:text-4xl">
              Popular Items
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Our customers&apos; favourites, made fresh daily
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="card group block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                      <span className="text-4xl">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                    {product.category.name}
                  </p>
                  <h3 className="mb-1 font-semibold text-gray-800 group-hover:text-brand-red transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-brand-red">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/menu" className="btn-primary text-base px-8 py-4">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick delivery to your door across Melbourne metro",
              },
              {
                icon: Clock,
                title: "Fresh Daily",
                desc: "Everything made fresh daily with quality ingredients",
              },
              {
                icon: Award,
                title: "Award Winning",
                desc: "Recognised for our unique Nigerian-Australian fusion flavours",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                desc: "Safe and secure online payments via Stripe",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center rounded-xl p-6 text-center transition-all hover:bg-brand-cream"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream text-brand-red">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-brand-dark-red">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section className="bg-brand-dark-red py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            About CrestFoods
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            {settings.about_text ||
              "At CrestFoods, we bring together the best of Nigerian and Australian culinary traditions."}
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white hover:text-brand-dark-red"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
