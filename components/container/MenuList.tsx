'use client';

import { useState, useEffect } from 'react';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '../../components/ui/card';

interface MenuItem {
  item_id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image_url: string;
  quantity: number; // Added quantity to interface
}

export function MenuList() {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();

        // Pastikan data berbentuk array, jika tidak ada data, fallback ke array kosong
        const menusWithQuantity = (Array.isArray(data) ? data : []).map((menu: MenuItem) => ({
          ...menu,
          quantity: 0,
        }));
        setMenus(menusWithQuantity);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };
    fetchMenus();
  }, []);

  const updateQuantity = (menuId: number, change: number) => {
    setMenus((currentMenus) =>
      currentMenus.map((menu) =>
        menu.item_id === menuId
          ? { ...menu, quantity: Math.max(0, menu.quantity + change) }
          : menu
      )
    );
  };

  return (
    <section className="mt-10">
      <h1 className="font-semibold text-2xl">Popular Menus</h1>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {menus.map((menu) => (
          <Card key={menu.item_id} className={'p0'}> 
            <CardContent className="p-0">
              <img
                src={menu.image_url} 
                alt={menu.name} 
                width={280} 
                height={280} 
                className="rounded-sm object-cover h-[280px] w-full" 
              />
            </CardContent>
            <CardFooter className="py-4 px-6 flex flex-col items-start relative">
              <p className="flex gap-1 items-center">
                <span className="text-sm text-gray-600">{menu.rating}</span>
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(menu.rating) ? 
                    <StarFilledIcon key={i} className="text-yellow-500" /> : 
                    <StarIcon key={i} />
                ))}
                <span className="text-sm text-gray-600">({menu.reviews})</span>
              </p>
              <h2 className="text-xl font-semibold mt-2">{menu.name}</h2>
              <span className="text-gray-500 text-md font-light mt-1">
                {menu.description}
              </span>
              <div className="flex justify-between items-center mt-2">
                <p className="text-md font-medium text-black">
                  Rp {menu.price.toLocaleString()}
                </p>
                <div className="absolute right-4 flex items-center gap-2">
                  {/* <button
                    onClick={() => updateQuantity(menu.item_id, -1)}
                    className="text-red-500 hover:text-red-600 text-2xl"
                  >
                    -
                  </button>
                  <span className="text-lg">{menu.quantity}</span>
                  <button
                    onClick={() => updateQuantity(menu.item_id, 1)}
                    className="text-green-500 hover:text-green-600 text-2xl"
                  >
                    +
                  </button> */}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
