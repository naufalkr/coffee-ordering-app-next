import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const menus = await prisma.menuItem.findMany();
    
    if (!menus) {
      return NextResponse.json({
        success: false,
        message: "No menus found",
        data: []
      }, { status: 404 });
    }

    console.log("Fetched menus:", menus); // Debug log

    return NextResponse.json({
      success: true,
      message: "List Data Menus",
      data: menus
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch menus",
      error: error.message
    }, { status: 500 });
  }
}