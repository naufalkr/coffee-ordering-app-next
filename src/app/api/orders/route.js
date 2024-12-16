import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // Ambil data session user
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const userId = parseInt(session.user.id);

    // Cek apakah user sudah memiliki order aktif dengan status CART
    const activeOrder = await prisma.order.findFirst({
      where: {
        user_id: userId,
        order_status: "CART", // Hanya periksa status CART
      },
      include: {
        orderItems: true, // Sertakan item di dalam order
      },
      orderBy: { created_at: "desc" },
    });

    // Jika ada order aktif dengan barang di dalamnya
    if (activeOrder && activeOrder.orderItems.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Harap selesaikan pesanan di keranjang anda.",
          order: activeOrder,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Jika ada order aktif tapi tanpa barang, hanya kembalikan order tanpa pesan
    if (activeOrder && activeOrder.orderItems.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Keranjang anda kosong.",
          order: activeOrder,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Jika tidak ada order aktif, buat order baru
    const newOrder = await prisma.order.create({
      data: {
        user_id: userId,
        order_status: "CART", // Status default untuk order baru
        total_price: 0, // Harga awal default
      },
    });

    return new Response(
      JSON.stringify({
        message: "Order baru berhasil dibuat.",
        order: newOrder,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating/fetching order:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
