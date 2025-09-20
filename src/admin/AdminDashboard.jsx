import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    cars: 0,
    bookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, carsRes, bookingsRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/cars'),
          axios.get('/api/admin/bookings')
        ]);
        setStats({
          users: usersRes.data.length,
          cars: carsRes.data.length,
          bookings: bookingsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-purple-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-6xl border-2 border-purple-200">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage your Royal Cars platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center cursor-pointer hover:scale-105 transform transition duration-300 hover:shadow-3xl"
            onClick={() => navigate('/admin/users')}
          >
            <div className="text-4xl font-bold mb-2">{stats.users}</div>
            <h2 className="text-2xl font-bold mb-2">Users</h2>
            <p className="text-lg opacity-90">Manage all users and roles</p>
            <div className="mt-4 bg-white/20 rounded-full px-4 py-1 inline-block">
              <span className="text-sm font-semibold">View Details →</span>
            </div>
          </div>
          
          <div
            className="bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl p-8 shadow-2xl text-white text-center cursor-pointer hover:scale-105 transform transition duration-300 hover:shadow-3xl"
            onClick={() => navigate('/admin/cars')}
          >
            <div className="text-4xl font-bold mb-2">{stats.cars}</div>
            <h2 className="text-2xl font-bold mb-2">Cars</h2>
            <p className="text-lg opacity-90">Add, edit, or remove cars</p>
            <div className="mt-4 bg-white/20 rounded-full px-4 py-1 inline-block">
              <span className="text-sm font-semibold">Manage Fleet →</span>
            </div>
          </div>
          
          <div
            className="bg-gradient-to-br from-green-500 to-purple-600 rounded-2xl p-8 shadow-2xl text-white text-center cursor-pointer hover:scale-105 transform transition duration-300 hover:shadow-3xl"
            onClick={() => navigate('/admin/bookings')}
          >
            <div className="text-4xl font-bold mb-2">{stats.bookings}</div>
            <h2 className="text-2xl font-bold mb-2">Bookings</h2>
            <p className="text-lg opacity-90">View and manage bookings</p>
            <div className="mt-4 bg-white/20 rounded-full px-4 py-1 inline-block">
              <span className="text-sm font-semibold">Track Orders →</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-center transition shadow-sm hover:shadow-md">
              <div className="text-blue-600 font-semibold">Add New Car</div>
            </button>
            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-center transition shadow-sm hover:shadow-md">
              <div className="text-green-600 font-semibold">View Reports</div>
            </button>
            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-center transition shadow-sm hover:shadow-md">
              <div className="text-purple-600 font-semibold">Settings</div>
            </button>
            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-center transition shadow-sm hover:shadow-md">
              <div className="text-red-600 font-semibold">Maintenance</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
