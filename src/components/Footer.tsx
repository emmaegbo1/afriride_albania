import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & Social Media */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">AfriRide Albania</h3>
            <p className="text-sm mb-4">
              Your trusted partner for seamless travel experiences in Albania.
              We specialize in serving African tourists with premium services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/afriride_albania"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/afriride_albania"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/afriride_albania"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/transfers" className="text-sm hover:text-emerald-400 transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-sm hover:text-emerald-400 transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-sm hover:text-emerald-400 transition-colors">
                  Tourism
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Airport Pickup & Drop-off</li>
              <li>Hotel Accommodation</li>
              <li>Guided Tours</li>
              <li>Cultural Experiences</li>
              <li>Beach Adventures</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Skanderbeg Square, Tirana, Albania</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">+355 69 216 3767</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">infoafriridealbania@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AfriRide Albania. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
