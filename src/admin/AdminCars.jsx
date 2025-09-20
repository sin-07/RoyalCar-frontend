import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/api/admin/cars')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => {
        setCars([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-green-600">Loading cars...</div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center px-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-300 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-extrabold text-green-700 drop-shadow-lg">Car Management</h2>
          <div className="bg-green-100 px-4 py-2 rounded-full">
            <span className="text-green-700 font-semibold">{cars.length} Cars</span>
          </div>
        </div>
        
        <div className="rounded-xl w-full overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl shadow-lg table-fixed min-w-[700px] sm:min-w-full">
            <thead className="sticky top-0 z-20">
              <tr className="bg-gradient-to-r from-green-100 to-emerald-100">
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Brand</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Model</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Year</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Price/Day</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Status</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-green-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-xl">No cars found.</td>
                </tr>
              ) : (
                cars.map(car => (
                  <tr key={car._id} className="hover:bg-green-50 transition border-b border-gray-100">
                    <td className="py-2 px-2 sm:py-3 sm:px-6 font-medium">{car.brand}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 text-green-600">{car.model}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">{car.year}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 font-semibold">₹{car.pricePerDay}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm font-bold ${car.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                        {car.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 flex gap-2 flex-wrap">
                      <button className="bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-green-600 transition text-xs sm:text-base">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-600 transition text-xs sm:text-base">
                        Delete
                      </button>
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
