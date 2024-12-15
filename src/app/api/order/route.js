import prisma from "@/lib/prisma"; // Prisma Client
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const OrderStatus = {
  CART: "CART",
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY: "READY",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

// GET: Fetch all orders or a specific order
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId"); // Optional query param

    if (orderId) {
      // Fetch a specific order
      const order = await prisma.order.findUnique({
        where: { order_id: parseInt(orderId) },
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
        },
      });

      if (!order) {
        return new Response(
          JSON.stringify({ message: "Order not found." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify(order),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch all orders
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
      },
      orderBy: { created_at: "desc" },
    });

    return new Response(
      JSON.stringify(orders),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[ERROR] GET /api/order:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST: Create a new order
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { user_id, order_status, total_price } = body;

    if (!user_id || !order_status || typeof total_price !== "number") {
      return new Response(
        JSON.stringify({ message: "Invalid input data." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        user_id,
        order_status,
        total_price,
      },
    });

    return new Response(
      JSON.stringify({ message: "Order created successfully.", order: newOrder }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[ERROR] POST /api/order:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PATCH: Update an order
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { order_id, new_status, new_total_price } = body;

    if (!order_id || (!new_status && typeof new_total_price === "undefined")) {
      return new Response(
        JSON.stringify({ message: "Invalid input data." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updateData = {};
    if (new_status) updateData.order_status = new_status;
    if (typeof new_total_price === "number") updateData.total_price = new_total_price;

    const updatedOrder = await prisma.order.update({
      where: { order_id: parseInt(order_id) },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ message: "Order updated successfully.", order: updatedOrder }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[ERROR] PATCH /api/order:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE: Delete an order and its related order items
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const orderId = url.searchParams.get("order_id");

    if (!orderId) {
      return new Response(
        JSON.stringify({ message: "Order ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete all related order items first
    await prisma.orderItem.deleteMany({
      where: { order_id: parseInt(orderId) },
    });

    // Delete the order
    await prisma.order.delete({
      where: { order_id: parseInt(orderId) },
    });

    return new Response(
      JSON.stringify({ message: "Order and related items deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[ERROR] DELETE /api/order:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
