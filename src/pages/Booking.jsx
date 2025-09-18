import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";

export default function BookingPage() {
  const [availableCars, setAvailableCars] = useState([]);
  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pickupOpen, setPickupOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const locations = ["Patna", "Gaya", "Nalanda"];
  const navigate = useNavigate();

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const minDateTime = new Date(now.getTime() + (1 * 60 * 60 * 1000)); // 1 hour from now
  const minTime = minDateTime.toTimeString().slice(0, 5); // HH:MM format

  // Handlers
  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
    
    // Real-time validation
    if (newForm.pickupDate && newForm.pickupTime) {
      const pickupDateTime = new Date(`${newForm.pickupDate}T${newForm.pickupTime}`);
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + (1 * 60 * 60 * 1000));
      
      if (pickupDateTime < oneHourFromNow) {
        setError(`Pickup time must be at least 1 hour in the future. Current time: ${now.toLocaleString()}`);
      } else {
        setError("");
      }
    }
  };
  const handleLocationSelect = (type, location) => {
    setForm({ ...form, [type]: location });
    if (type === "pickup") setPickupOpen(false);
    if (type === "drop") setDropOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Validate minimum 24 hours booking and pickup time in future
    const pickupDateTime = new Date(`${form.pickupDate}T${form.pickupTime}`);
    const dropDateTime = new Date(`${form.dropDate}T${form.dropTime}`);
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + (1 * 60 * 60 * 1000));
    const diffMs = dropDateTime - pickupDateTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Strict final check
    if (pickupDateTime < oneHourFromNow) {
      setLoading(false);
      setError(`Pickup time must be at least 1 hour in the future. Current time: ${now.toLocaleString()}, Selected pickup: ${pickupDateTime.toLocaleString()}`);
      toast.error(`Pickup time must be at least 1 hour in the future. Current time: ${now.toLocaleString()}, Selected pickup: ${pickupDateTime.toLocaleString()}`);
      return;
    }
    if (diffHours < 24) {
      setLoading(false);
      setError("Booking must be at least 24 hours.");
      toast.error("Booking must be at least 24 hours.");
      return;
    }
    // Fetch available cars from backend
    try {
      // Use environment variables for backend API
      const API_BASE_URL =
        import.meta.env.VITE_API_URL ||
        process.env.REACT_APP_API_BASE_URL ||
        "http://localhost:10000";
      const res = await fetch(`${API_BASE_URL}/api/cars/available`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to fetch available cars");
      const cars = await res.json();
      setAvailableCars(cars);
      // Redirect to available cars page with booking data
      navigate("/available-cars", {
        state: { bookingData: form },
      });
    } catch (err) {
      setError("Could not fetch available cars.");
    }
    setLoading(false);
  };

  // Render
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24">
      {/* Booking Card */}
      <motion.div
        className="relative z-20 w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 border border-white/30 mx-1 xs:mx-2 sm:mx-4"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ boxSizing: "border-box" }}
      >
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-center text-primary-700 mb-6 sm:mb-8 drop-shadow-lg">
          Book Your Ride
        </h2>
        {error && (
          <motion.div
            className="mb-4 text-red-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="mb-4 text-green-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Pickup Location Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-2 font-semibold">
              Pickup Location
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white/80 shadow-sm pl-10 pr-10 cursor-pointer transition-all duration-300 hover:border-primary-300 hover:shadow-md flex items-center justify-between"
                onClick={() => setPickupOpen(!pickupOpen)}
              >
                <span
                  className={form.pickup ? "text-gray-900" : "text-gray-500"}
                >
                  {form.pickup || "Select location"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${
                    pickupOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5 pointer-events-none" />
              <AnimatePresence>
                {pickupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-200 rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    {locations.map((location, index) => (
                      <motion.div
                        key={location}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="px-4 py-3 hover:bg-primary-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleLocationSelect("pickup", location)}
                      >
                        <span className="text-gray-800 font-medium">
                          {location}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          {/* Drop Location Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-gray-700 mb-2 font-semibold">
              Drop Location
            </label>
            <div className="relative">
              <div
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white/80 shadow-sm pl-10 pr-10 cursor-pointer transition-all duration-300 hover:border-primary-300 hover:shadow-md flex items-center justify-between"
                onClick={() => setDropOpen(!dropOpen)}
              >
                <span className={form.drop ? "text-gray-900" : "text-gray-500"}>
                  {form.drop || "Select location"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent-400 transition-transform duration-200 ${
                    dropOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-400 w-5 h-5 pointer-events-none" />
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-200 rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    {locations.map((location, index) => (
                      <motion.div
                        key={location}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="px-4 py-3 hover:bg-primary-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        onClick={() => handleLocationSelect("drop", location)}
                      >
                        <span className="text-gray-800 font-medium">
                          {location}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          {/* Pickup/Drop Date & Time */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                className="block text-gray-700 mb-2 font-semibold"
                htmlFor="pickupDate"
              >
                Pickup Date
              </label>
              <div className="relative">
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm pl-10"
                  value={form.pickupDate}
                  onChange={handleChange}
                  min={today}
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label
                className="block text-gray-700 mb-2 font-semibold"
                htmlFor="pickupTime"
              >
                Pickup Time
              </label>
              <div className="relative">
                <input
                  id="pickupTime"
                  name="pickupTime"
                  type="time"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm pl-10"
                  value={form.pickupTime}
                  onChange={handleChange}
                  min={form.pickupDate === today ? minTime : "00:00"}
                  required
                />
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-400 w-5 h-5" />
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                className="block text-gray-700 mb-2 font-semibold"
                htmlFor="dropDate"
              >
                Drop Date
              </label>
              <div className="relative">
                <input
                  id="dropDate"
                  name="dropDate"
                  type="date"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm pl-10"
                  value={form.dropDate}
                  onChange={handleChange}
                  min={form.pickupDate || today}
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label
                className="block text-gray-700 mb-2 font-semibold"
                htmlFor="dropTime"
              >
                Drop Time
              </label>
              <div className="relative">
                <input
                  id="dropTime"
                  name="dropTime"
                  type="time"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-100 shadow-sm pl-10"
                  value={form.dropTime}
                  onChange={handleChange}
                  required
                />
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-400 w-5 h-5" />
              </div>
            </motion.div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>{" "}
                Booking...
              </span>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" /> Book Now
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
      {/* Available Cars Section */}
      {availableCars.length > 0 && (
        <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {availableCars.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-white/40"
            >
              <img
                src={car.image}
                alt={car.model}
                className="object-cover w-full h-40"
              />
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-primary-700 mb-1">
                  {car.brand} {car.model}
                </h3>
                <div className="text-gray-600 text-sm mb-2">
                  {car.category} | {car.seating_capacity} Seats |{" "}
                  {car.fuel_type} | {car.transmission}
                </div>
                <div className="text-lg font-bold text-primary-600">
                  ₹{car.pricePerDay}/day
                </div>
                <button className="mt-2 w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-base">
                  Book This Car
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* ...existing code... */}
    </div>
  );
}
