import { useApp } from '../context/AppContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { user, isLoading } = useApp();

  if (isLoading) return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
