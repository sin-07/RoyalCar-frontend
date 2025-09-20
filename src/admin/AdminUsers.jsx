import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/api/admin/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-blue-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center px-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-12 border-2 border-blue-300 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow-lg">User Management</h2>
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-blue-700 font-semibold">{users.length} Users</span>
          </div>
        </div>
        
        <div className="rounded-xl w-full overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl shadow-lg table-fixed min-w-[600px] sm:min-w-full">
            <thead className="sticky top-0 z-20">
              <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-blue-700">Name</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-blue-700">Email</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-blue-700">Role</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-blue-700">Verified</th>
                <th className="py-2 px-2 sm:py-3 sm:px-6 text-base sm:text-lg font-semibold text-blue-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-xl">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className="hover:bg-blue-50 transition border-b border-gray-100">
                    <td className="py-2 px-2 sm:py-3 sm:px-6 font-medium">{user.name}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 text-blue-600">{user.email}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm font-bold ${user.role === 'owner' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6">
                      <span className={`px-2 py-1 rounded-full text-white text-xs font-bold ${user.emailVerified ? 'bg-green-500' : 'bg-red-500'}`}>
                        {user.emailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-6 flex gap-2 flex-wrap">
                      <button className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-blue-600 transition text-xs sm:text-base">
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
