import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { category?: string };
}

async function getData(categorySlug?: string) {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  let products;
  if (categorySlug) {
    const cat = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (cat) {
      products = await prisma.product.findMany({
        where: { categoryId: cat.id, isAvailable: true },
        orderBy: { sortOrder: "asc" },
        include: { category: true },
      });
    }
  }

  if (!products) {
    products = await prisma.product.findMany({
      where: { isAvailable: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
      include: { category: true },
    });
  }

  // Group products by category
  const grouped: Record<
    string,
    {
      category: { id: string; name: string; slug: string; colorPrimary: string | null; colorSecondary: string | null; image: string | null; description: string | null };
      products: typeof products;
    }
  > = {};

  products.forEach((p) => {
    if (!grouped[p.category.slug]) {
      grouped[p.category.slug] = {
        category: p.category,
        products: [],
      };
    }
    grouped[p.category.slug].products.push(p);
  });

  return { categories, grouped, activeCategory: categorySlug };
}

export default async function MenuPage({ searchParams }: Props) {
  const { categories, grouped, activeCategory } = await getData(
    searchParams.category
  );

  return (
    <div className="min-h-screen bg-brand-light-bg">
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-brand-dark-red">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
            alt="Menu background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Menu</h1>
          <p className="mt-2 text-lg text-gray-300">
            Fresh, delicious, and made with love
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-16 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 py-3">
            <Link
              href="/menu"
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-brand-red text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.slug}`}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  activeCategory === cat.slug
                    ? { backgroundColor: cat.colorPrimary || "#dc3545" }
                    : {}
                }
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {Object.entries(grouped).map(([slug, { category, products }]) => (
            <div key={slug} className="mb-12" id={slug}>
              <div className="mb-6 flex items-center gap-3">
                <h2
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: category.colorSecondary || "#8b0000" }}
                >
                  {category.name}
                </h2>
                <div
                  className="h-0.5 flex-1"
                  style={{
                    backgroundColor: category.colorPrimary || "#dc3545",
                    opacity: 0.3,
                  }}
                />
              </div>
              {category.description && (
                <p className="mb-6 text-gray-500">{category.description}</p>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}

          {Object.keys(grouped).length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">
                No products found in this category.
              </p>
              <Link href="/menu" className="btn-primary mt-4 inline-block">
                View All Items
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
