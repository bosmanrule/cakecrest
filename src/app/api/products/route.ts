import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const includeHidden = searchParams.get("includeHidden") === "true";

  const where: Record<string, unknown> = {};
  if (!includeHidden) where.isAvailable = true;
  if (categorySlug) {
    const cat = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (cat) where.categoryId = cat.id;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    include: { category: true },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = slugify(body.name);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description || null,
      fullDesc: body.fullDesc || null,
      price: parseFloat(body.price),
      image: body.image || null,
      categoryId: body.categoryId,
      isAvailable: body.isAvailable ?? true,
      ingredients: body.ingredients || null,
      allergens: body.allergens || null,
      sizes: body.sizes || null,
      flavors: body.flavors || null,
      sortOrder: body.sortOrder || 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
