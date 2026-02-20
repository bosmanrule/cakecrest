import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Try by id first, then by slug
  let product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!product) {
    product = await prisma.product.findUnique({
      where: { slug: params.id },
      include: { category: true },
    });
  }

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.name !== undefined) {
    data.name = body.name;
    data.slug = slugify(body.name);
  }
  if (body.description !== undefined) data.description = body.description;
  if (body.fullDesc !== undefined) data.fullDesc = body.fullDesc;
  if (body.price !== undefined) data.price = parseFloat(body.price);
  if (body.image !== undefined) data.image = body.image;
  if (body.categoryId !== undefined) data.categoryId = body.categoryId;
  if (body.isAvailable !== undefined) data.isAvailable = body.isAvailable;
  if (body.ingredients !== undefined) data.ingredients = body.ingredients;
  if (body.allergens !== undefined) data.allergens = body.allergens;
  if (body.sizes !== undefined) data.sizes = body.sizes;
  if (body.flavors !== undefined) data.flavors = body.flavors;
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

  const product = await prisma.product.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
