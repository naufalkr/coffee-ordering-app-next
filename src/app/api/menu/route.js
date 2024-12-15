import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const menus = await prisma.menuItem.findMany({
      where: { is_available: true }, // Hanya menu yang tersedia
    });

    return new Response(JSON.stringify({
      success: true,
      data: menus,
    }), { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Failed to fetch menu items.",
    }), { status: 500 });
  }
}
