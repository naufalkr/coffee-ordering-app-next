import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { item_id: parseInt(id) },
    });

    if (!menuItem) return NextResponse.json({ error: 'Menu item not found.' }, { status: 404 });

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu item.' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const { name, description, price, image_url, is_available } = body;

    const updatedItem = await prisma.menuItem.update({
      where: { item_id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        image_url,
        is_available,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item.' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.menuItem.delete({
      where: { item_id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Menu item deleted successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item.' }, { status: 500 });
  }
}
