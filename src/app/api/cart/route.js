import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../auth/[...nextauth]/route";

// Enum for order statuses
const OrderStatus = {
  CART: 'CART',          // Masih dalam keranjang
  PENDING: 'PENDING',    // Menunggu konfirmasi
  CONFIRMED: 'CONFIRMED',// Pesanan dikonfirmasi
  PREPARING: 'PREPARING',// Sedang disiapkan
  READY: 'READY',        // Siap diambil/diantar
  COMPLETED: 'COMPLETED',// Selesai
  CANCELLED: 'CANCELLED' // Dibatalkan
};

// GET: Fetch active cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Find active order (cart) with its items
    const activeOrder = await prisma.order.findFirst({
      where: {
        user_id: userId,
        order_status: {
          notIn: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
        },
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!activeOrder) {
      return NextResponse.json({
        message: 'No active order found. Your cart is empty.',
        orderItems: [],
        total: 0,
        orderId: null,
        status: OrderStatus.CART,
      });
    }

    return NextResponse.json({
      orderItems: activeOrder.orderItems,
      total: activeOrder.total_price,
      orderId: activeOrder.order_id,
      status: activeOrder.order_status,
    });
  } catch (error) {
    console.error('[DEBUG] Error in GET /api/cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST: Add item to cart
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Parse request body
    const body = await req.json();
    const { item_id, quantity, customizations } = body;

    if (!item_id || !quantity || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid item_id or quantity' }, { status: 400 });
    }

    // Find active order
    const activeOrder = await prisma.order.findFirst({
      where: {
        user_id: userId,
        order_status: OrderStatus.CART,
      },
    });

    if (!activeOrder) {
      return NextResponse.json({ error: 'Cannot add items. No active CART found.' }, { status: 403 });
    }

    // Find menu item and check availability
    const menuItem = await prisma.menuItem.findUnique({
      where: { item_id: parseInt(item_id) },
    });

    if (!menuItem || !menuItem.is_available) {
      return NextResponse.json({ error: 'Menu item not available or does not exist' }, { status: 404 });
    }

    const price_at_time = menuItem.price;
    const subtotal = price_at_time * quantity;

    // Create order item and update order total in a transaction
    const orderItem = await prisma.$transaction(async (prisma) => {
      const newOrderItem = await prisma.orderItem.create({
        data: {
          order_id: activeOrder.order_id,
          item_id: parseInt(item_id),
          quantity,
          price_at_time,
          subtotal,
          customizations: customizations || null,
        },
      });

      await prisma.order.update({
        where: { order_id: activeOrder.order_id },
        data: {
          total_price: {
            increment: subtotal,
          },
        },
      });

      return newOrderItem;
    });

    return NextResponse.json(orderItem, { status: 201 });
  } catch (error) {
    console.error('[DEBUG] Error in POST /api/cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

// DELETE: Remove item from cart
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();
    const { order_item_id } = body;

    if (!order_item_id) {
      return NextResponse.json({ error: 'Invalid order_item_id' }, { status: 400 });
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: { order_item_id: parseInt(order_item_id) },
      include: { order: true },
    });

    if (!orderItem || orderItem.order.user_id !== userId) {
      return NextResponse.json({ error: 'Order item not found or unauthorized' }, { status: 404 });
    }

    if (orderItem.order.order_status !== OrderStatus.CART) {
      return NextResponse.json({ error: 'Cannot remove items from a non-CART order' }, { status: 403 });
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { order_id: orderItem.order_id },
        data: {
          total_price: {
            decrement: orderItem.subtotal,
          },
        },
      });

      await prisma.orderItem.delete({
        where: { order_item_id: parseInt(order_item_id) },
      });
    });

    return NextResponse.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('[DEBUG] Error in DELETE /api/cart:', error);
    return NextResponse.json({ error: 'Failed to delete item from cart' }, { status: 500 });
  }
}

// PATCH: Update order status
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();
    const { orderId, newStatus } = body;

    if (!Object.values(OrderStatus).includes(newStatus)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        order_id: orderId,
        user_id: userId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    if (order.order_status !== OrderStatus.CART && newStatus === OrderStatus.CART) {
      return NextResponse.json({ error: 'Cannot revert to CART from current status' }, { status: 403 });
    }

    if (newStatus === OrderStatus.PENDING && order.orderItems.length === 0) {
      return NextResponse.json({
        error: 'Cannot checkout. Your cart is empty.',
      }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { order_id: orderId },
      data: { order_status: newStatus },
    });

    return NextResponse.json({ message: 'Order status updated successfully', updatedOrder });
  } catch (error) {
    console.error('[DEBUG] Error in PATCH /api/cart:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
