import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true, // Menyertakan relasi dengan OrderItem
      },
    });
    
    if (!orders) {
      return NextResponse.json({
        success: false,
        message: "No orders found",
        data: []
      }, { status: 404 });
    }

    console.log("Fetched orders:", orders); // Debug log

    return NextResponse.json({
      success: true,
      message: "List Data orders",
      data: orders
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    }, { status: 500 });
  }
}

