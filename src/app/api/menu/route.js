import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Get all menu items
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items.' }, { status: 500 });
  }
}

export async function POST(req) {
  // Create a new menu item
  try {
    const body = await req.json();
    const { name, description, price, image_url, is_available } = body;

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image_url,
        is_available: is_available ?? true,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item.' }, { status: 500 });
  }
}
