// OneTime Studios - TypeScript Types

export interface Profile {
  id: string;
  clerk_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'booker' | 'owner' | 'admin';
  created_at: string;
}

export interface Studio {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  studio_type: string[];
  amenities: string[];
  hourly_rate: number;
  minimum_booking_hours: number;
  images: string[];
  cover_image?: string;
  status: 'pending' | 'active' | 'paused' | 'suspended';
  is_verified: boolean;
  stripe_connect_account_id?: string;
  created_at: string;
  updated_at: string;
  owner?: Profile;
}

export interface Booking {
  id: string;
  studio_id: string;
  booker_id: string;
  start_at_utc: string;
  end_at_utc: string;
  price_total: number;
  stripe_payment_intent_id: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  expires_at: string | null;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
  // Legacy fields for compatibility with older code
  date?: string;
  start_time?: string;
  end_time?: string;
  duration_hours?: number;
  hourly_rate?: number;
  total_amount?: number;
  platform_fee?: number;
  payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  notes?: string;
  studio?: Studio;
  booker?: Profile;
}

export interface AvailabilitySlot {
  id: string;
  studio_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  booking_id?: string;
}

export interface Review {
  id: string;
  booking_id: string;
  studio_id: string;
  reviewer_id: string;
  rating: number;
  content?: string;
  created_at: string;
  reviewer?: Profile;
}

export interface SearchFilters {
  location?: string;
  date?: string;
  startTime?: string;
  duration?: number;
  studioType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export interface BookingFormData {
  studioId: string;
  date: string;
  startTime: string;
  durationHours: number;
  notes?: string;
}

export interface StudioFormData {
  name: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  hourlyRate: number;
  minimumBookingHours: number;
  studioType: string[];
  amenities: string[];
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
