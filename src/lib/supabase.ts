import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  image_url: string;
  available_rooms: number;
  created_at: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  location: string;
  includes: string[];
  image_url: string;
  max_participants: number;
  created_at: string;
}

export interface TransferRoute {
  id: string;
  from_location: string;
  to_location: string;
  distance_km: number;
  price: number;
  vehicle_type: string;
  capacity: number;
  duration_minutes: number;
  created_at: string;
}

export interface Booking {
  id?: string;
  booking_type: 'transfer' | 'hotel' | 'tour';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  service_id: string;
  number_of_people: number;
  special_requests?: string;
  total_price: number;
  status?: string;
  created_at?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}
