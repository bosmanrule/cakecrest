import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

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

  const orderNumber = generateOrderNumber();

  // If Stripe payment, we'd create a payment intent here
  // For now, create the order directly
  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerFirstName: body.customerFirstName,
      customerLastName: body.customerLastName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      deliveryType: body.deliveryType,
      deliveryAddress: body.deliveryAddress || null,
      deliveryNotes: body.deliveryNotes || null,
      pickupTime: body.pickupTime || null,
      paymentMethod: body.paymentMethod,
      paymentStatus:
        body.paymentMethod === "card" ? "pending" : "pay_on_collection",
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

  // If using Stripe, create a payment intent
  if (body.paymentMethod === "card") {
    try {
      const { stripe } = await import("@/lib/stripe");
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.total * 100),
        currency: "aud",
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripePaymentId: paymentIntent.id },
      });

      return NextResponse.json({
        order,
        clientSecret: paymentIntent.client_secret,
      });
    } catch {
      // If Stripe is not configured, still return the order
      return NextResponse.json({ order, clientSecret: null });
    }
  }

  return NextResponse.json({ order });
}
