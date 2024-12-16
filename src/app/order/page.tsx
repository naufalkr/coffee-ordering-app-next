'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const OrderStatus = {
  CART: 'CART',
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

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
  menuItem: MenuItem | null; // Allow null for safety
}

interface Order {
  order_id: number;
  user_id: number;
  order_status: string;
  total_price: number | string;
  orderItems: OrderItem[];
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user_id: '',
    order_status: OrderStatus.CART,
    total_price: 0,
  });
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Order[]>('/api/order'); // Define the response type
      setOrders(response.data); // TypeScript now knows `response.data` is of type `Order[]`
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create or update an order
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingOrder) {
        // Update order
        await axios.patch('/api/order', {
          order_id: editingOrder.order_id,
          new_status: form.order_status,
          new_total_price: parseFloat(form.total_price.toString()),
        });
        alert('Order updated successfully!');
      } else {
        // Create new order
        await axios.post('/api/order', {
          user_id: parseInt(form.user_id),
          order_status: form.order_status,
          total_price: parseFloat(form.total_price.toString()),
        });
        alert('Order created successfully!');
      }
      resetForm();
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  // Delete an order
  const deleteOrder = async (order_id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/order?order_id=${order_id}`);
      alert('Order deleted successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  // Set form data for editing
  const editOrder = (order: Order) => {
    setEditingOrder(order);
    setForm({
      user_id: order.user_id.toString(),
      order_status: order.order_status,
      total_price: Number(order.total_price),
    });
  };

  // Reset form
  const resetForm = () => {
    setForm({ user_id: '', order_status: OrderStatus.CART, total_price: 0 });
    setEditingOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Order Management</h1>

      {/* Order Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingOrder ? 'Edit Order' : 'Create New Order'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="number"
              name="user_id"
              value={form.user_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order Status</label>
            <select
              name="order_status"
              value={form.order_status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              {Object.values(OrderStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Price</label>
            <input
              type="number"
              name="total_price"
              value={form.total_price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {editingOrder ? 'Update Order' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>

      {/* Order List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.order_id}
                className="border border-gray-300 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Order ID:</strong> {order.order_id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {order.user_id}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.order_status}
                  </p>
                  <p>
                    <strong>Total Price:</strong> Rp {Number(order.total_price).toFixed(2)}
                  </p>
                  <p>
                    <strong>Order Items:</strong>
                  </p>
                  <ul className="ml-4 list-disc">
                    {order.orderItems.map((item) => (
                      <li key={item.order_item_id}>
                        {item.menuItem?.name || 'Unknown Item'} - {item.quantity} x Rp {Number(item.price_at_time).toFixed(2)} = Rp {Number(item.subtotal).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => editOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteOrder(order.order_id)}
                    className="text-red-600 hover:underline"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}