'use client';

import { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrashAlt, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For smooth animations

interface MenuItem {
  item_id: number;
  name: string;
  price: number | string;
  description?: string;
}

interface OrderItem {
  order_item_id: number;
  quantity: number;
  price_at_time: number | string;
  subtotal: number | string;
  customizations?: string;
  menuItem: MenuItem;
}

interface CartData {
  orderItems: OrderItem[];
  total: number | string;
  orderId: number;
  status: string;
}

// Utility function to safely format currency
const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return numPrice.toFixed(2);
};

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData>({
    orderItems: [],
    total: 0,
    orderId: 0,
    status: '',
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false); // For checkout animation

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setCartData(data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  // Fetch menu items to allow item selection
  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  // Initialize order (automatically create or check for active order)
  const initializeOrder = async () => {
    try {
      const res = await fetch('/api/orders'); // Call /api/orders to create/check order
      const data = await res.json();

      if (res.status === 200) {
        alert(data.message); // Show message if order already exists
        setCartData((prev) => ({
          ...prev,
          orderId: data.order.order_id,
          status: data.order.order_status,
        }));
      } else if (res.status === 201) {
        console.log('Order baru berhasil dibuat:', data.order);
        setCartData((prev) => ({
          ...prev,
          orderId: data.order.order_id,
          status: data.order.order_status,
        }));
      }
    } catch (error) {
      console.error('Error initializing order:', error);
    }
  };

  useEffect(() => {
    initializeOrder(); // Ensure an active order exists when accessing /cart
    fetchCartItems(); // Fetch cart data
    fetchMenuItems(); // Fetch menu data
  }, []);

  // Add item to cart
  const addToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || quantity <= 0) {
      alert('Please select an item and enter a valid quantity.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: parseInt(selectedItem),
          quantity,
          customizations,
        }),
      });

      if (res.ok) {
        await fetchCartItems();
        setSelectedItem('');
        setQuantity(1);
        setCustomizations('');
        alert('Item added to cart!');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to add item to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (order_item_id: number) => {
    const confirmDelete = confirm('Are you sure you want to remove this item from the cart?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_item_id }),
      });

      if (res.ok) {
        alert('Item removed from cart!');
        await fetchCartItems(); // Refresh cart data
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to remove item from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  // Checkout (Change status to PENDING)
  const checkout = async () => {
    if (cartData.orderId === 0) {
      alert('No active cart to checkout.');
      return;
    }

    const confirmCheckout = confirm('Are you sure you want to checkout and confirm your order?');
    if (!confirmCheckout) return;

    setIsCheckingOut(true); // Start animation
    try {
      const res = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: cartData.orderId, newStatus: 'PENDING' }),
      });

      if (res.ok) {
        alert('Order status updated to PENDING!');
        await fetchCartItems(); // Refresh cart data
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setIsCheckingOut(false); // End animation
    }
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-gradient-to-b from-yellow-50 to-amber-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-700 flex items-center justify-center">
        <FaShoppingCart className="mr-2" /> Your Cart
      </h1>

      {/* Cart Status */}
      {cartData.orderId > 0 && (
        <div className="mb-4 p-4 bg-amber-200 text-amber-900 rounded-lg shadow-md">
          <p className="text-sm">
            Order <span className="font-bold">#{cartData.orderId}</span> - Status: <span className="uppercase">{cartData.status}</span>
          </p>
        </div>
      )}

      {/* Cart Items Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-amber-800">Cart Items</h2>
        {cartData.orderItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartData.orderItems.map((item) => (
                <motion.div
                  key={item.order_item_id}
                  className="bg-white shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-lg font-semibold text-amber-900">{item.menuItem.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.customizations || 'No customizations'}
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} x ${formatPrice(item.price_at_time)}
                    </p>
                    <p className="text-amber-800 font-bold mt-1">
                      Subtotal: ${formatPrice(item.subtotal)}
                    </p>
                    <button
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                      onClick={() => removeFromCart(item.order_item_id)}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-amber-100 rounded-lg shadow-md">
              <p className="text-2xl font-bold text-right text-amber-800">
                Total: ${formatPrice(cartData.total)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Add Item Form */}
      <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-amber-800">Add Item to Cart</h2>
        <form onSubmit={addToCart} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Select Item</label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-amber-300"
              required
            >
              <option value="">-- Select an Item --</option>
              {menuItems.map((menuItem) => (
                <option key={menuItem.item_id} value={menuItem.item_id}>
                  {menuItem.name} (${formatPrice(menuItem.price)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-amber-300"
              min="1"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Customizations</label>
            <textarea
              value={customizations}
              onChange={(e) => setCustomizations(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-amber-300"
              placeholder="E.g., No sugar, extra ice"
            ></textarea>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className={`w-full px-6 py-2 rounded font-semibold text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800'
              } flex items-center justify-center gap-2`}
              disabled={loading}
            >
              {loading ? <FaPlus className="animate-spin" /> : <FaCheckCircle />}
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </form>
      </div>

      {/* Checkout Button */}
      {cartData.status === 'CART' && (
        <motion.div
          className="mt-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg shadow-lg ${
              isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={checkout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
