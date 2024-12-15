"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]); // State untuk menyimpan semua order
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setError("");
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data); // Simpan semua order ke state
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred while fetching orders");
    }
  };

  const createOrder = async () => {
    try {
      setMessage("");
      setError("");

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        fetchOrders(); // Refresh daftar order setelah membuat order baru
      } else {
        setError(data.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred while creating order");
    }
  };

  useEffect(() => {
    fetchOrders(); // Ambil semua order saat halaman dimuat
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="w-96 p-4 bg-white rounded shadow">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <button
          onClick={createOrder}
          className="w-full py-2 px-4 mb-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Create New Order
        </button>

        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        <div className="space-y-2">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.order_id} className="p-4 bg-gray-200 rounded shadow">
                <p>
                  <strong>Order ID:</strong> {order.order_id}
                </p>
                <p>
                  <strong>Status:</strong> {order.order_status}
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.total_price}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
