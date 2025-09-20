import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Razorpay script loader
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingModal({ car, onClose }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  function getMinEndDate() {
    if (!start) return "";
    const minEnd = new Date(new Date(start).getTime() + 24 * 60 * 60 * 1000);
    return minEnd.toISOString().slice(0, 16);
  }

  async function handleBook() {
    setError("");
    if (!start || !end) {
      setError("Please select both start and end time.");
      return;
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {
      setError("Minimum booking duration is 24 hours.");
      return;
    }
    setLoading(true);
    // 1. Load Razorpay script
    const resScript = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!resScript) {
      setError("Failed to load Razorpay SDK. Try again.");
      setLoading(false);
      return;
    }
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log('Razorpay Key:', razorpayKey);
    if (!razorpayKey) {
      setError("Razorpay key is missing. Please check your .env and restart the server.");
      setLoading(false);
      return;
    }
    // 2. Create order on backend
    const amount = car.pricePerDay * Math.ceil((endDate.getTime() - startDate.getTime()) / (24*60*60*1000)) * 100; // in paise
    let order_id = '';
    try {
      const orderRes = await axios.post('/api/payment/razorpay-order', { amount, currency: 'INR' });
      if (!orderRes.data.success) {
        setError(orderRes.data.message || 'Failed to create payment order');
        setLoading(false);
        return;
      }
      order_id = orderRes.data.order.id;
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to create payment order');
      setLoading(false);
      return;
    }
    const options = {
      key: razorpayKey,
      amount: amount,
      currency: "INR",
      name: "Royal Car Booking",
      description: `${car.brand} ${car.model} booking`,
      image: car.image,
      order_id,
      handler: async function (response) {
        // 3. On payment success, book car
        try {
          const res = await axios.post("/api/bookings", {
            carId: car._id,
            start: start,
            end: end,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          if (res.data.success) {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              onClose();
              navigate("/my-bookings");
            }, 3000);
          } else {
            setError(res.data.message || "Booking failed");
          }
        } catch (e) {
          setError(e.response?.data?.message || e.message || "Booking failed");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        email: "",
        contact: "",
      },
      theme: { color: "#6366f1" },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2 text-primary-600">Booking Successful!</h2>
            <p className="text-gray-700 text-center mb-2">Your booking is confirmed.<br/>A confirmation and receipt have been sent to your email.</p>
            <div className="mt-4 text-sm text-gray-500">Redirecting to My Bookings...</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-40 h-24 mb-2">
                <img src={car.image} alt={car.brand + car.model} className="w-full h-full object-cover rounded" />
              </div>
              <h2 className="text-xl font-bold mb-1">{car.brand} {car.model}</h2>
              <div className="text-gray-600 text-sm mb-2">{car.category} | {car.year}</div>
              <div className="text-primary-600 font-semibold text-lg mb-2">9{car.pricePerDay}/day</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Start Date & Time</label>
              <div className="relative">
                <input type="datetime-local" className="w-full border border-primary-300 rounded px-2 py-1 bg-gray-100 pr-10" value={start} onChange={e => setStart(e.target.value)} min={new Date().toISOString().slice(0,16)} />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 pointer-events-none">
                  <FiCalendar size={20} />
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End Date & Time</label>
              <div className="relative">
                <input type="datetime-local" className="w-full border border-primary-300 rounded px-2 py-1 bg-gray-100 pr-10" value={end} onChange={e => setEnd(e.target.value)} min={getMinEndDate()} />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 pointer-events-none">
                  <FiCalendar size={20} />
                </span>
              </div>
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <button className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 disabled:opacity-60" onClick={handleBook} disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
          </>
        )}
      </div>
    </div>
  );
}