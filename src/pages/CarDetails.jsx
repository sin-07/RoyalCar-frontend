import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useApp } from '../context/AppContext';
import { toast } from 'react-hot-toast';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useApp();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        setError(null);
        const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE_URL}/api/cars/${id}`);
        if (!res.ok) throw new Error("Car not found");
        const data = await res.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  const handleBookCar = async () => {
    if (!user) {
      toast.error('Please login to book a car.');
      navigate('/login');
      return;
    }
    
    try {
      setBookingLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          car: car._id,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Next day
        }),
      });
      if (!res.ok) throw new Error('Booking failed');
      toast.success('Car booked successfully!');
    } catch (err) {
      toast.error(err.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  if (error) return <div className="flex flex-col items-center h-96 text-red-600 text-lg">{error}</div>;
  if (!car) return null;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-600 hover:underline mb-8 text-lg font-semibold">
        <ArrowLeft size={22} /> Back to Cars
      </button>
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        <img src={car.image} alt={car.brand + car.model} className="w-full max-w-xl h-80 object-cover rounded-2xl shadow-xl border border-primary-100" />
        <div className="flex-1 w-full max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-3 text-primary-700 leading-tight">{car.brand} {car.model}</h1>
          <div className="text-lg text-gray-600 mb-2">{car.category} | {car.year}</div>
          <div className="text-primary-600 font-bold text-2xl mb-6">₹{car.pricePerDay}/day</div>
          <div className="mb-6 flex gap-4 flex-wrap">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-semibold">Seats: {car.seating_capacity}</span>
            <span className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full font-semibold">Fuel: {car.fuel_type}</span>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">Transmission: {car.transmission}</span>
          </div>
          <div className="mb-6 flex gap-4 flex-wrap">
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">Car ID: {car._id}</span>
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
              Owner: {car.owner && (typeof car.owner === 'object' ? (car.owner.name || car.owner.email || car.owner._id) : car.owner)}
            </span>
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">Created: {new Date(car.createdAt).toLocaleDateString()}</span>
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">Updated: {new Date(car.updatedAt).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{car.description || "No description available."}</p>
          <button 
            className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-primary-700 transition-all duration-300 text-xl" 
            onClick={handleBookCar} 
            disabled={bookingLoading}
          >
            {bookingLoading ? 'Booking...' : 'Book This Car'}
          </button>
        </div>
      </div>
    </div>
  );
}