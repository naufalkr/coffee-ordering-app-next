'use client';

import { useState, useEffect } from 'react';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '../ui/card';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface QuantityState {
  [key: number]: number;
}

export default function MenuList() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState<QuantityState>({});
  const [orderId, setOrderId] = useState<number | null>(null);

  // Fetch menus and create an order when the page loads
  useEffect(() => {
    const fetchMenusAndCreateOrder = async () => {
      try {
        // Fetch menus
        const menuResponse = await fetch('/api/menu');
        if (!menuResponse.ok) throw new Error('Failed to fetch menus.');
        const menuData = await menuResponse.json();
        setMenus(menuData.data);

        // Initialize quantities for menus
        const initialQuantities: QuantityState = {};
        menuData.data.forEach((menu: MenuItem) => {
          initialQuantities[menu.id] = 0;
        });
        setQuantities(initialQuantities);

        // Create an order
        const orderResponse = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 1 }), // Replace with dynamic user ID
        });
        if (!orderResponse.ok) throw new Error('Failed to create order.');
        const orderData = await orderResponse.json();
        setOrderId(orderData.data.order_id);
      } catch (error) {
        console.error('Error initializing menus and order:', error);
      }
    };

    fetchMenusAndCreateOrder();
  }, []);

  // Add item to order in the database
  const addItemToOrder = async (menuId: number) => {
    if (!orderId) {
      console.error('Order not found. Unable to add item.');
      return;
    }

    try {
      const response = await fetch('/api/order-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // Replace with dynamic user ID
          item_id: menuId,
          quantity: 1,
          customizations: '', // Add customization data if needed
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to add item to order:', data.message);
      }
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
  };

  // Update quantity in state and add item to database
  const updateQuantity = (menuId: number, change: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, (prev[menuId] || 0) + change);
      if (change > 0) {
        addItemToOrder(menuId);
      }
      return { ...prev, [menuId]: newQuantity };
    });
  };

  return (
    <section className="mt-10">
      <h1 className="font-semibold text-2xl">Popular Menus</h1>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menus.map((menu) => (
          <Card key={menu.id} className="p0">
            <CardContent className="p-0">
              <Image
                src={menu.imageUrl}
                alt={menu.name}
                width={280}
                height={280}
                className="rounded-sm object-cover h-[280px] w-full"
              />
            </CardContent>
            <CardFooter className="py-4 px-6 flex flex-col items-start relative">
              <p className="flex gap-1 items-center">
                <span className="text-sm text-gray-600">{menu.rating}</span>
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(menu.rating) ? (
                    <StarFilledIcon key={i} className="text-yellow-500" />
                  ) : (
                    <StarIcon key={i} />
                  )
                )}
                <span className="text-sm text-gray-600">({menu.reviews})</span>
              </p>
              <h2 className="text-xl font-semibold mt-2">{menu.name}</h2>
              <span className="text-gray-500 text-md font-light mt-1">
                {menu.description}
              </span>
              <div className="flex justify-between items-center mt-2 w-full">
                <p className="text-md font-medium text-black">
                  Rp {menu.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(menu.id, -1)}
                    className="text-red-500 hover:text-red-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                    disabled={quantities[menu.id] === 0}
                  >
                    -
                  </button>
                  <span className="text-lg w-8 text-center">
                    {quantities[menu.id] || 0}
                  </span>
                  <button
                    onClick={() => updateQuantity(menu.id, 1)}
                    className="text-green-500 hover:text-green-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
