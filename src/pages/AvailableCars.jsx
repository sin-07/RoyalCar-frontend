import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { toast } from "react-hot-toast";

export default function AvailableCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useApp();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!bookingData) {
      setError("No booking data found. Please go back and submit the booking form.");
      setLoading(false);
      return;
    }

    // Fetch available cars
    const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    fetch(`${API_BASE_URL}/api/cars/available`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(async (res) => {
        if (!res.ok) {
          let errorMsg = "Failed to fetch cars";
          try {
            const errData = await res.json();
            errorMsg = errData.message || errorMsg;
          } catch (e) {}
          throw new Error(errorMsg);
        }
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not fetch available cars.");
        setLoading(false);
      });
  }, [bookingData]);

  const formatDateTime = (date, time) => {
    return new Date(`${date}T${time}`).toLocaleString();
  };

  const handleBookCar = async (car) => {
    // Check if user is logged in
    if (!user || !token) {
      toast.error("Please login to book a car");
      navigate('/login', { 
        state: { 
          from: '/available-cars',
          bookingData: bookingData 
        } 
      });
      return;
    }

    setBookingLoading(car._id);
    
    try {
      // Calculate total amount (days * price per day)
      const pickupDate = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
      const dropDate = new Date(`${bookingData.dropDate}T${bookingData.dropTime}`);
      const days = Math.ceil((dropDate - pickupDate) / (1000 * 60 * 60 * 24));
      const totalAmount = days * car.pricePerDay;

      const bookingPayload = {
        car: car._id,
        startDate: pickupDate,
        endDate: dropDate,
        totalAmount: totalAmount,
        pickupLocation: bookingData.pickup,
        dropLocation: bookingData.drop
      };

      const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:10000';
      console.log('🚀 Making booking request to:', `${API_BASE_URL}/api/bookings`);
      console.log('📦 Booking payload:', bookingPayload);
      console.log('🔑 Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingPayload)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        let errorMsg = `Failed to create booking: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          const errorText = await response.text();
          errorMsg = errorText || errorMsg;
        }
        console.error('❌ Booking failed:', response.status, errorMsg);
        toast.error(errorMsg);
        setBookingLoading(null);
        return;
      }

      const result = await response.json();
      console.log('✅ Booking response:', result);
      const bookingId = result.booking?._id || result._id;
      setSuccessBookingId(bookingId);
      setShowSuccessModal(true);
      
      // Navigate to booking confirmation or user bookings page
      // navigate('/my-bookings');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book car. Please try again.');
    }
    
    setBookingLoading(null);
  };

  return (
    <>
      {/* Booking Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Successful!</h2>
            <p className="mb-2">Your booking has been confirmed.</p>
            {successBookingId && (
              <p className="mb-4 text-gray-700">Booking ID: <span className="font-mono text-primary-700">{successBookingId}</span></p>
            )}
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition-all"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Available Cars</h2>
          {bookingData && (
            <div className="bg-blue-50 rounded-lg p-4 mb-8 text-center">
              <p className="text-lg">
                <strong>Pickup:</strong> {bookingData.pickup} | <strong>Drop:</strong> {bookingData.drop}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {formatDateTime(bookingData.pickupDate, bookingData.pickupTime)} - {formatDateTime(bookingData.dropDate, bookingData.dropTime)}
              </p>
            </div>
          )}
          {loading && <div className="text-center text-lg">Loading available cars...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          {cars.length === 0 && !loading && !error && (
            <div className="text-center text-gray-600">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-semibold mb-2">No Cars Available</h3>
              <p>Sorry, no cars are available for your selected timing.</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-white/40"
              >
                <div className="relative">
                  <img src={car.image} alt={car.model} className="object-cover w-full h-40" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Available
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-primary-700 mb-1">{car.brand} {car.model}</h3>
                  <div className="text-gray-600 text-sm mb-2">
                    {car.category} | {car.seating_capacity} Seats | {car.fuel_type} | {car.transmission}
                  </div>
                  <div className="text-lg font-bold text-primary-600">₹{car.pricePerDay}/day</div>
                  <div className="text-gray-500 text-xs mb-3">{car.description}</div>
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold">Available for selected period</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      <span>Ready for immediate booking</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBookCar(car)}
                    disabled={bookingLoading === car._id}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {bookingLoading === car._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Booking...
                      </span>
                    ) : (
                      "Book This Car"
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}