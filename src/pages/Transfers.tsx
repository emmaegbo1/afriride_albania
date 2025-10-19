import { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Car, CheckCircle } from 'lucide-react';
import { supabase, TransferRoute, Booking } from '../lib/supabase';

export default function Transfers() {
  const [routes, setRoutes] = useState<TransferRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<TransferRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    booking_date: '',
    number_of_people: 1,
    special_requests: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('transfer_routes')
        .select('*')
        .order('from_location', { ascending: true });

      if (error) throw error;
      setRoutes(data || []);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (route: TransferRoute) => {
    setSelectedRoute(route);
    setShowBookingForm(true);
    setBookingSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute) return;

    try {
      const booking: Booking = {
        booking_type: 'transfer',
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        booking_date: formData.booking_date,
        service_id: selectedRoute.id,
        number_of_people: formData.number_of_people,
        special_requests: formData.special_requests,
        total_price: selectedRoute.price * formData.number_of_people,
      };

      const { error } = await supabase.from('bookings').insert([booking]);

      if (error) throw error;

      setBookingSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        booking_date: '',
        number_of_people: 1,
        special_requests: '',
      });

      setTimeout(() => {
        setShowBookingForm(false);
        setBookingSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const groupedRoutes = routes.reduce((acc, route) => {
    const key = route.from_location;
    if (!acc[key]) acc[key] = [];
    acc[key].push(route);
    return acc;
  }, {} as Record<string, TransferRoute[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading routes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Airport Transfers</h1>
          <p className="text-xl text-emerald-50 max-w-3xl">
            Comfortable and reliable transportation from Tirana International Airport to your destination.
            Professional drivers, modern vehicles, fixed prices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(groupedRoutes).map(([fromLocation, locationRoutes]) => (
          <div key={fromLocation} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-emerald-600" />
              From {fromLocation}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {locationRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {route.from_location} → {route.to_location}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-2 text-gray-400" />
                          {route.vehicle_type} - Up to {route.capacity} passengers
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {route.distance_km} km - Approximately {route.duration_minutes} minutes
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-emerald-600">
                        €{route.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">per vehicle</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBooking(route)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showBookingForm && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            {bookingSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">
                  We'll send you a confirmation email shortly with all the details.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Book Your Transfer</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Selected Route</h4>
                  <p className="text-gray-700">
                    {selectedRoute.from_location} → {selectedRoute.to_location}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedRoute.vehicle_type} - €{selectedRoute.price.toFixed(2)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Pickup Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.booking_date}
                      onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Number of Passengers *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={selectedRoute.capacity}
                      value={formData.number_of_people}
                      onChange={(e) => setFormData({ ...formData, number_of_people: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.special_requests}
                      onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                      placeholder="Flight number, luggage details, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total Price:</span>
                      <span className="text-emerald-600">
                        €{(selectedRoute.price * formData.number_of_people).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
