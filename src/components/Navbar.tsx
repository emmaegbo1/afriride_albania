import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/transfers', label: 'Airport Transfers' },
    { path: '/hotels', label: 'Hotels' },
    { path: '/tours', label: 'Tourism' },
    { path: '/reservations', label: 'My Reservations' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">AfriRide</span>
                <span className="text-xs text-emerald-600">Albania</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(link.path)
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
