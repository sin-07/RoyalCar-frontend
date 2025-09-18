import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Shield, Clock, Star, CheckCircle, ArrowRight, Play, Award, Users, MapPin, Phone } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [featuredCars] = useState([
    {
      id: 1,
      name: 'BMW X5',
      type: 'Luxury SUV',
      price: '₹8,500',
      features: ['Automatic', '7 Seater', 'Premium', 'GPS'],
      rating: 4.9
    },
    {
      id: 2,
      name: 'Mercedes C-Class',
      type: 'Luxury Sedan',
      price: '₹12,000',
      features: ['Automatic', '5 Seater', 'Luxury', 'Sunroof'],
      rating: 4.8
    },
    {
      id: 3,
      name: 'Audi Q7',
      type: 'Premium SUV',
      price: '₹15,000',
      features: ['Automatic', '7 Seater', 'Premium', 'Leather'],
      rating: 4.9
    }
  ]);

  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Comprehensive insurance coverage for complete peace of mind during your journey.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Car,
      title: 'Premium Fleet',
      description: 'Latest model luxury cars maintained to the highest standards of quality.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: CheckCircle,
      title: 'Easy Booking',
      description: 'Simple online booking process with instant confirmation and flexible options.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Customers' },
    { icon: Car, number: '500+', label: 'Premium Vehicles' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: MapPin, number: '25+', label: 'Cities Covered' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-cosmic text-white py-32 mt-16 relative overflow-hidden">
        {/* Car Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-80"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source src="https://www.pexels.com/download/video/8345037/" type="video/mp4" />
        </video>
        {/* Black Overlay for Text Readability */}
        <div className="absolute inset-0 w-full h-full bg-black/60 z-10 pointer-events-none" />
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Premium Car Rentals
              <span className="block mt-2 text-primary-100 font-semibold">Redefined</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Experience luxury, comfort, and reliability with our premium fleet. 
              From business trips to special occasions, we make every journey memorable.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button
                className="bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                onClick={() => navigate('/booking')}
              >
                <Car className="w-5 h-5" />
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Royal Cars?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service with attention to every detail, ensuring your car rental experience exceeds expectations.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group hover:transform hover:scale-105 duration-300"
              >
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Vehicles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium vehicles, perfect for any occasion or business need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-20 h-20 text-primary-600" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
                      <p className="text-gray-600">{car.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">{car.price}</div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {car.features.map((feature, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              View All Cars
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over a decade of excellence in the car rental industry, we've built our reputation on trust, quality, and exceptional customer service. Join thousands of satisfied customers who choose Royal Cars for their transportation needs.
              </p>
              
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-center p-4"
                  >
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl h-96 flex items-center justify-center">
                <Car className="w-32 h-32 text-primary-600" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Verified Safe</div>
                    <div className="text-sm text-gray-600">100% Safety Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cosmic text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-10 leading-relaxed">
              Book your premium car rental today and experience the difference that quality service makes. 
              Available 24/7 with instant confirmation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <Car className="w-5 h-5" />
                Book Your Car
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
