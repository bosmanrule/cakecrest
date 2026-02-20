import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
    include: {
      products: {
        orderBy: { sortOrder: "asc" },
        where: { isAvailable: true },
      },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
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
  if (body.image !== undefined) data.image = body.image;
  if (body.colorPrimary !== undefined) data.colorPrimary = body.colorPrimary;
  if (body.colorSecondary !== undefined)
    data.colorSecondary = body.colorSecondary;
  if (body.colorBg !== undefined) data.colorBg = body.colorBg;
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  const category = await prisma.category.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(category);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productCount = await prisma.product.count({
    where: { categoryId: params.id },
  });

  if (productCount > 0) {
    return NextResponse.json(
      { error: "Cannot delete category with existing products. Move or delete products first." },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
