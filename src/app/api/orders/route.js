import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // Get session data
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const userId = parseInt(session.user.id);

    // 1. Cari order yang belum selesai (status bukan COMPLETED atau CANCELLED)
    const existingOrders = await prisma.order.findMany({
      where: {
        user_id: userId,
        NOT: {
          order_status: {
            in: ["COMPLETED", "CANCELLED"],
          },
        },
      },
      orderBy: {
        created_at: "desc", // Order terbaru ada di atas
      },
    });

    // 2. Jika ada lebih dari satu order, hapus order terbaru
    if (existingOrders.length > 1) {
      const latestOrder = existingOrders[0]; // Order terbaru
      await prisma.order.delete({
        where: { order_id: latestOrder.order_id },
      });

      console.log(`Deleted latest order with ID: ${latestOrder.order_id}`);
    }

    // 3. Jika ada satu order yang belum selesai, tolak permintaan pembuatan order baru
    if (existingOrders.length === 1) {
      return new Response(
        JSON.stringify({
          message: "You already have an active order. Complete or cancel it before creating a new one.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Buat order baru
    const newOrder = await prisma.order.create({
      data: {
        user_id: userId,
        order_status: "CART", // Status default
        total_price: 0, // Default total price
      },
    });

    return new Response(
      JSON.stringify({
        message: "Order created successfully",
        order: newOrder,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { created_at: "desc" },
    });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
