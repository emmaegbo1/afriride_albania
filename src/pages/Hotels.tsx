import { useState, useEffect } from 'react';
import { MapPin, Star, Wifi, Calendar, Users, CheckCircle } from 'lucide-react';
import { supabase, Hotel, Booking } from '../lib/supabase';

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    check_in_date: '',
    check_out_date: '',
    number_of_people: 1,
    special_requests: '',
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
    setBookingSuccess(false);
  };

  const calculateNights = () => {
    if (!formData.check_in_date || !formData.check_out_date) return 0;
    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    if (!selectedHotel) return 0;
    const nights = calculateNights();
    return selectedHotel.price_per_night * nights;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    try {
      const booking: Booking = {
        booking_type: 'hotel',
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        booking_date: formData.check_in_date,
        service_id: selectedHotel.id,
        number_of_people: formData.number_of_people,
        special_requests: `Check-out: ${formData.check_out_date}. ${formData.special_requests}`,
        total_price: calculateTotal(),
      };

      const { error } = await supabase.from('bookings').insert([booking]);

      if (error) throw error;

      setBookingSuccess(true);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        check_in_date: '',
        check_out_date: '',
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hotel Accommodation</h1>
          <p className="text-xl text-emerald-50 max-w-3xl">
            Carefully selected hotels across Albania offering comfort, safety, and authentic Albanian hospitality.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center bg-emerald-100 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-emerald-600 fill-current mr-1" />
                    <span className="font-semibold text-emerald-600">{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}, Albania</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{hotel.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center"
                      >
                        {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">
                      €{hotel.price_per_night.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  <button
                    onClick={() => handleBooking(hotel)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="mt-3 text-sm text-gray-500">
                  {hotel.available_rooms} rooms available
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showBookingForm && selectedHotel && (
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
                  <h3 className="text-2xl font-bold text-gray-900">Book Your Stay</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedHotel.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedHotel.location}</p>
                  <p className="text-emerald-600 font-semibold mt-1">
                    €{selectedHotel.price_per_night.toFixed(2)} per night
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Check-in *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.check_in_date}
                        onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Check-out *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.check_out_date}
                        onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
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
                      placeholder="Room preferences, dietary requirements, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {calculateNights() > 0 && (
                    <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Number of nights:</span>
                        <span className="font-semibold">{calculateNights()}</span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total Price:</span>
                        <span className="text-emerald-600">€{calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  )}

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
