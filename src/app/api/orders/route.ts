import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const deliveryFeeSetting = await prisma.siteSetting.findUnique({
    where: { key: "delivery_fee" },
  });
  const deliveryFee =
    body.deliveryType === "delivery"
      ? parseFloat(deliveryFeeSetting?.value || "8.00")
      : 0;

  const subtotal = body.items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      orderNumber: body.orderNumber,
      customerFirstName: body.customerFirstName,
      customerLastName: body.customerLastName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      deliveryType: body.deliveryType,
      deliveryAddress: body.deliveryAddress || null,
      deliveryNotes: body.deliveryNotes || null,
      pickupTime: body.pickupTime || null,
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentStatus || "pending",
      stripePaymentId: body.stripePaymentId || null,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      specialNotes: body.specialNotes || null,
      items: {
        create: body.items.map(
          (item: {
            productId: string;
            name: string;
            quantity: number;
            price: number;
            options?: string;
          }) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            options: item.options || null,
          })
        ),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
