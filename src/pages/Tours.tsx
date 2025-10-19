import { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Calendar, CheckCircle } from 'lucide-react';
import { supabase, Tour, Booking } from '../lib/supabase';

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
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
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(tours.map((tour) => tour.category)))];

  const filteredTours =
    selectedCategory === 'All'
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  const handleBooking = (tour: Tour) => {
    setSelectedTour(tour);
    setShowBookingForm(true);
    setBookingSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    try {
      const booking: Booking = {
        booking_type: 'tour',
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        booking_date: formData.booking_date,
        service_id: selectedTour.id,
        number_of_people: formData.number_of_people,
        special_requests: formData.special_requests,
        total_price: selectedTour.price * formData.number_of_people,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tourism & Activities</h1>
          <p className="text-xl text-emerald-50 max-w-3xl">
            Discover Albania's rich culture, stunning landscapes, and historical treasures with our curated tours
            and experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {tour.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{tour.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                    {tour.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-emerald-600" />
                    Up to {tour.max_participants} participants
                  </div>
                </div>

                <div className="border-t pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        €{tour.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBooking(tour)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Book Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tours found in this category.</p>
          </div>
        )}
      </div>

      {showBookingForm && selectedTour && (
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
                  <h3 className="text-2xl font-bold text-gray-900">Book Your Tour</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedTour.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{selectedTour.location}</p>
                  <p className="text-gray-600 text-sm mb-2">Duration: {selectedTour.duration}</p>
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Includes:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedTour.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-emerald-600 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-emerald-600 font-semibold mt-3">
                    €{selectedTour.price.toFixed(2)} per person
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
                      Tour Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.booking_date}
                      onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Number of Participants *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={selectedTour.max_participants}
                      value={formData.number_of_people}
                      onChange={(e) =>
                        setFormData({ ...formData, number_of_people: parseInt(e.target.value) })
                      }
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
                      placeholder="Dietary requirements, accessibility needs, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total Price:</span>
                      <span className="text-emerald-600">
                        €{(selectedTour.price * formData.number_of_people).toFixed(2)}
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
