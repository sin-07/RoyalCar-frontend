import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/api/admin/bookings').then(res => setBookings(res.data)).catch(() => setBookings([]));
  }, []);
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col items-center">
  <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-12 border-2 border-purple-300 relative z-10">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center drop-shadow-lg">Booking Management</h2>
        <div className="rounded-xl w-full overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl shadow-lg table-fixed min-w-[600px] sm:min-w-full">
            <thead className="sticky top-0 z-20">
              <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">User</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">Car</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">Start Date</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">End Date</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">Status</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-purple-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-xl">No bookings found.</td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-purple-50 transition">
                    <td className="py-2 px-2 sm:py-3 sm:px-6">{booking.user}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">{booking.car}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm font-bold ${booking.status === 'confirmed' || booking.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>{booking.status || booking.paymentStatus}</span>
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 flex gap-2 flex-wrap">
                      <button className="bg-purple-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-purple-600 transition text-xs sm:text-base">View</button>
                      <button className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-600 transition text-xs sm:text-base">Cancel</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
