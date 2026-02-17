/**
 * Database types for OneTime Studios
 * Generated from Supabase schema
 */

export interface Studio {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string;
  tz: string; // IANA timezone
  hourly_rate: number;
  min_booking_hours: number;
  max_booking_hours: number | null;
  buffer_minutes: number;
  booking_window_days: number;
  min_notice_minutes: number;
  photos: string[]; // JSON array
  rules: string | null;
  stripe_connected_account_id: string | null;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  status: 'draft' | 'published' | 'paused';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityRule {
  id: string;
  studio_id: string;
  day_of_week: number; // 0=Sun, 1=Mon, ..., 6=Sat
  start_time_local: string; // HH:MM
  end_time_local: string; // HH:MM
  effective_from_date: string | null; // YYYY-MM-DD
  effective_to_date: string | null; // YYYY-MM-DD
  created_at: string;
}

export interface AvailabilityOverride {
  id: string;
  studio_id: string;
  date_local: string; // YYYY-MM-DD
  is_closed: boolean;
  start_time_local: string | null; // HH:MM
  end_time_local: string | null; // HH:MM
  window_index: number;
  created_at: string;
}

export interface AvailabilityBlock {
  id: string;
  studio_id: string;
  start_at_utc: string; // ISO 8601 timestamp
  end_at_utc: string; // ISO 8601 timestamp
  reason: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  studio_id: string;
  user_id: string;
  start_at_utc: string; // ISO 8601 timestamp
  end_at_utc: string; // ISO 8601 timestamp
  price_total: number;
  stripe_payment_intent_id: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  expires_at: string | null; // For pending bookings
  confirmed_at: string | null;
}

/**
 * Request/Response types for API
 */

export interface CreatePaymentIntentRequest {
  studioId: string;
  startAtUtc: string;
  endAtUtc: string;
  userId: string;
}

export interface CreatePaymentIntentResponse {
  bookingId: string;
  clientSecret: string;
  amount: number; // in cents
}

export interface ConfirmBookingRequest {
  bookingId: string;
  paymentIntentId: string;
}

export interface ConfirmBookingResponse {
  success: boolean;
  booking: Booking;
}

export interface GetAvailableDatesRequest {
  studioId: string;
  rangeStart: string; // ISO 8601
  rangeEnd: string; // ISO 8601
}

export interface GetAvailableDatesResponse {
  dates: string[]; // YYYY-MM-DD in studio local tz
}

export interface GetAvailableTimesRequest {
  studioId: string;
  dateLocal: string; // YYYY-MM-DD in studio local tz
  durationHours: number;
}

export interface GetAvailableTimesResponse {
  times: string[]; // HH:MM in studio local tz
}
