'use client';

import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    is_available: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all menu items on component load
  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission for Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/menu/${editingId}` : '/api/menu';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price), // Ensure price is a number
          is_available: form.is_available,
        }),
      });

      if (res.ok) {
        fetchMenuItems();
        setForm({ name: '', description: '', price: '', image_url: '', is_available: true });
        setEditingId(null);
      } else {
        console.error('Failed to save menu item:', await res.text());
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete menu item
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMenuItems();
      } else {
        console.error('Failed to delete menu item:', await res.text());
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  // Load data into form for editing
  const handleEdit = (item: any) => {
    setForm({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      image_url: item.image_url || '',
      is_available: item.is_available,
    });
    setEditingId(item.item_id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available</label>
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
              className="h-5 w-5"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Menu Items Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item: any) => (
          <div
            key={item.item_id}
            className="bg-white shadow-md rounded p-4 flex flex-col items-start"
          >
            <img
              src={item.image_url || 'https://via.placeholder.com/150'}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description || 'No description provided.'}</p>
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.item_id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
