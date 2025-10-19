import { Link } from 'react-router-dom';
import { Plane, Hotel, MapPin, Clock, Shield, HeadphonesIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Albania
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Your trusted travel partner connecting Africa to the hidden gem of the Balkans.
              Discover Albania with seamless transfers, comfortable stays, and unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/transfers"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Book Airport Transfer
              </Link>
              <Link
                to="/tours"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors text-center"
              >
                Explore Tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for an amazing Albanian adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/transfers" className="group">
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <Plane className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Airport Transfers</h3>
                <p className="text-gray-600 mb-4">
                  Reliable and comfortable transportation from Tirana Airport to anywhere in Albania.
                  Professional drivers, clean vehicles, competitive prices.
                </p>
                <span className="text-emerald-600 font-semibold group-hover:underline">
                  Book Now →
                </span>
              </div>
            </Link>

            <Link to="/hotels" className="group">
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <Hotel className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Hotel Accommodation</h3>
                <p className="text-gray-600 mb-4">
                  Carefully selected hotels ranging from budget-friendly to luxury. All vetted
                  for quality, safety, and welcoming service.
                </p>
                <span className="text-emerald-600 font-semibold group-hover:underline">
                  View Hotels →
                </span>
              </div>
            </Link>

            <Link to="/tours" className="group">
              <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <MapPin className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Guided Tours</h3>
                <p className="text-gray-600 mb-4">
                  Experience Albania's rich culture, stunning landscapes, and historical sites
                  with expert local guides who speak your language.
                </p>
                <span className="text-emerald-600 font-semibold group-hover:underline">
                  Explore Tours →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AfriRide?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand the unique needs of African travelers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock assistance in multiple languages to help you whenever you need it.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Licensed drivers, insured vehicles, and secure payment methods for your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Bridge</h3>
              <p className="text-gray-600">
                Staff familiar with African cultures ensuring you feel at home throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Albanian Adventure?</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Book your services today and experience the beauty of Albania with AfriRide
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
