import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cars and bookings in parallel
    Promise.all([
      fetch("/api/cars").then(res => res.json()),
      fetch("/api/bookings/all").then(res => res.json()).catch(() => []) // Fallback to empty array if endpoint doesn't exist
    ])
      .then(([carsData, bookingsData]) => {
        setCars(carsData);
        setBookings(bookingsData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not fetch cars.");
        setLoading(false);
      });
  }, []);

  // Check if a car is currently booked
  const isCarBooked = (carId) => {
    const now = new Date();
    return bookings.some(booking => 
      booking.car === carId && 
      booking.status !== 'cancelled' &&
      new Date(booking.startDate) <= now && 
      new Date(booking.endDate) >= now
    );
  };

  // Get next available date and time for booked cars
  const getNextAvailableDateTime = (carId) => {
    const now = new Date();
    const carBookings = bookings.filter(booking => 
      booking.car === carId && 
      booking.status !== 'cancelled' &&
      new Date(booking.endDate) >= now
    );
    
    if (carBookings.length === 0) return null;
    
    // Sort by end date and get the latest
    carBookings.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    return new Date(carBookings[0].endDate);
  };

  // Format date and time for display
  const formatDateTime = (date) => {
    if (!date) return '';
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleDateString('en-US', options);
  };

    return (
      <div className="min-h-screen pt-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Cars</h2>
        {loading && <div className="text-center text-lg">Loading cars...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-white/40 cursor-pointer"
              onClick={() => navigate(`/cars/${car._id}`)}
            >
              <div className="relative">
                <img src={car.image} alt={car.model} className="object-cover w-full h-40" />
                {/* Booking Status Tag */}
                {isCarBooked(car._id) ? (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Booked
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Available
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary-700 mb-1">{car.brand} {car.model}</h3>
                <div className="text-gray-600 text-sm mb-2">{car.category} | {car.seating_capacity} Seats | {car.fuel_type} | {car.transmission}</div>
                <div className="text-lg font-bold text-primary-600">₹{car.pricePerDay}/day</div>
                <div className="text-gray-500 text-xs mb-3">{car.description}</div>
                
                {/* Availability Status */}
                {isCarBooked(car._id) ? (
                  <div className="bg-red-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 text-red-700 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">Currently Booked</span>
                    </div>
                    {getNextAvailableDateTime(car._id) && (
                      <div className="text-red-600 text-xs mt-1">
                        <div className="font-medium">Available from:</div>
                        <div>{formatDateTime(getNextAvailableDateTime(car._id))}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-semibold">Available for booking</span>
                    </div>
                    <div className="text-green-600 text-xs mt-1">
                      Ready for immediate booking
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=800&q=80' // Range Rover Evoque
