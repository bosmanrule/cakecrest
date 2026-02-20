import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = slugify(body.name);

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      description: body.description || null,
      image: body.image || null,
      colorPrimary: body.colorPrimary || "#dc3545",
      colorSecondary: body.colorSecondary || "#8b0000",
      colorBg: body.colorBg || "#fef5f4",
      sortOrder: body.sortOrder || 0,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
