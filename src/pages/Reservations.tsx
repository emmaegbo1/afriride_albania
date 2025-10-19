import { useState } from 'react';
import { Search, Calendar, Mail, Phone, User, Plane, Hotel as HotelIcon, MapPin } from 'lucide-react';
import { supabase, Booking } from '../lib/supabase';

export default function Reservations() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_email', email.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <Plane className="h-5 w-5" />;
      case 'hotel':
        return <HotelIcon className="h-5 w-5" />;
      case 'tour':
        return <MapPin className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Reservations</h1>
          <p className="text-xl text-emerald-50 max-w-3xl">
            View and manage your bookings for transfers, hotels, and tours.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Reservations</h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-gray-400 flex items-center"
              >
                <Search className="h-5 w-5 mr-2" />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {searched && (
          <div>
            {bookings.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Found {bookings.length} reservation{bookings.length !== 1 ? 's' : ''}
                </h3>

                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                            {getBookingIcon(booking.booking_type)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 capitalize">
                              {booking.booking_type} Booking
                            </h4>
                            <p className="text-sm text-gray-500">
                              Booking ID: {booking.id?.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                            booking.status || 'pending'
                          )}`}
                        >
                          {booking.status || 'pending'}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{booking.customer_name}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{booking.customer_email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{booking.customer_phone}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">
                              {new Date(booking.booking_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Participants:</span>{' '}
                            {booking.number_of_people}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Total:</span>{' '}
                            <span className="text-emerald-600 font-bold text-lg">
                              €{booking.total_price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {booking.special_requests && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Special Requests:</p>
                          <p className="text-sm text-gray-600">{booking.special_requests}</p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                        Booked on {new Date(booking.created_at || '').toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Reservations Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any reservations for this email address.
                </p>
                <p className="text-sm text-gray-500">
                  Make sure you've entered the same email address you used when booking.
                </p>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-emerald-600 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Search for Your Reservations</h3>
            <p className="text-gray-600">
              Enter your email address above to view all your bookings with AfriRide Albania.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
