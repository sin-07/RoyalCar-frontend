import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'


import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Cars from './pages/Cars'
import AvailableCars from './pages/AvailableCars'
import CarDetails from './pages/CarDetails'
import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './admin/AdminDashboard'
import AdminUsers from './admin/AdminUsers'
import AdminCars from './admin/AdminCars'
import AdminBookings from './admin/AdminBookings'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/cars" element={<AdminCars />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/available-cars" element={<AvailableCars />} />
              <Route path="/booking" element={<Booking />} />
            </Route>
            {/* Add more routes here as we migrate them */}
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    </AppProvider>
  )
}

export default App