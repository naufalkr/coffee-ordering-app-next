import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const orderItems = await prisma.orderItem.findMany();
    
    if (!orderItems) {
      return NextResponse.json({
        success: false,
        message: "No orderItems found",
        data: []
      }, { status: 404 });
    }

    console.log("Fetched orderItems:", orderItems); // Debug log

    return NextResponse.json({
      success: true,
      message: "List Data orderItems",
      data: orderItems
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching orderItems:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch orderItems",
      error: error.message
    }, { status: 500 });
  }
}

