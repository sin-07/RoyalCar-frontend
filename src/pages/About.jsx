import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Clock,
  Car,
  MapPin,
  Target,
  Heart,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "200+", label: "Premium Vehicles" },
    { number: "50+", label: "Cities Covered" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Every vehicle in our fleet undergoes rigorous safety inspections and maintenance to ensure your peace of mind.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize customer satisfaction above all else, delivering personalized service that exceeds expectations.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in vehicle quality, service delivery, and customer experience.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "Constantly evolving our services with the latest technology to make car rental simple and convenient.",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-cosmic text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Royal Cars
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
              Driving excellence since 2015, we've been India's premier car
              rental service, connecting people to their destinations with
              comfort, reliability, and style.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Royal Cars began with a simple yet powerful vision: to make
                  premium car rental accessible, reliable, and hassle-free for
                  everyone. Founded in 2015 by automotive enthusiast{" "}
                  <span className="font-bold text-primary-600">
                    Vicky Singh
                  </span>
                  , we started with just 5 vehicles and a commitment to
                  exceptional service.
                </p>
                <p>
                  Today, we've grown into one of India's most trusted car rental
                  platforms, serving over 5,000 satisfied customers across 50+
                  cities. Our success is built on three core principles: quality
                  vehicles, transparent pricing, and customer-first service.
                </p>
                <p>
                  Every car in our fleet is meticulously maintained and
                  regularly inspected to ensure your safety and comfort. Whether
                  you need a compact car for city travel or a luxury SUV for a
                  family vacation, Royal Cars has the perfect vehicle for your
                  journey.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center shadow-md">
                    <Car className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900">200+</div>
                    <div className="text-gray-600">Premium Vehicles</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-md">
                    <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-gray-600">Cities Covered</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-md">
                    <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900">
                      5000+
                    </div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-md">
                    <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience
              we deliver to our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`bg-gradient-to-r ${value.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300`}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-cosmic text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed mb-8">
              "To revolutionize the car rental industry by providing exceptional
              vehicles, transparent pricing, and unparalleled customer service
              that makes every journey memorable."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cars"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explore Our Fleet
              </a>
              <a
                href="/contact"
                className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
