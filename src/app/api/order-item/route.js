import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { user_id, item_id, quantity, customizations } = body;

  if (!user_id || !item_id || !quantity) {
    return new Response(JSON.stringify({
      success: false,
      message: "User ID, item ID, and quantity are required.",
    }), { status: 400 });
  }

  try {
    // Cari order aktif dengan status CART untuk user ini
    const activeOrder = await prisma.order.findFirst({
      where: {
        user_id,
        order_status: "CART",
      },
    });

    if (!activeOrder) {
      return new Response(JSON.stringify({
        success: false,
        message: "No active order found. Create an order first.",
      }), { status: 400 });
    }

    // Ambil harga menu saat ini
    const menuItem = await prisma.menuItem.findUnique({
      where: { item_id },
    });

    if (!menuItem) {
      return new Response(JSON.stringify({
        success: false,
        message: "Menu item not found.",
      }), { status: 404 });
    }

    const price_at_time = menuItem.price;
    const subtotal = price_at_time * quantity;

    // Tambahkan item ke order aktif
    const orderItem = await prisma.orderItem.create({
      data: {
        order_id: activeOrder.order_id,
        item_id,
        quantity,
        price_at_time,
        subtotal,
        customizations,
      },
    });

    // Perbarui total harga pada order
    const updatedOrder = await prisma.order.update({
      where: { order_id: activeOrder.order_id },
      data: {
        total_price: {
          increment: subtotal, // Tambahkan subtotal ke total harga
        },
      },
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Item added to order.",
      data: {
        orderItem,
        updatedOrder,
      },
    }), { status: 201 });
  } catch (error) {
    console.error("Error adding order item:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Failed to add order item.",
    }), { status: 500 });
  }
}
