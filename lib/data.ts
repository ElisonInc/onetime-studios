// Server-side data fetching for OneTime Studios
'use server';

import { createClient } from '@supabase/supabase-js';
import { Studio, Booking, Profile, SearchFilters } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Studios
export async function getStudios(filters?: SearchFilters): Promise<Studio[]> {
  let query = supabase
    .from('studios')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (filters?.location) {
    query = query.or(`city.ilike.%${filters.location}%,state.ilike.%${filters.location}%`);
  }

  if (filters?.studioType) {
    query = query.contains('studio_type', [filters.studioType]);
  }

  if (filters?.minPrice) {
    query = query.gte('hourly_rate', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('hourly_rate', filters.maxPrice);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching studios:', error);
    return [];
  }

  return data || [];
}

export async function getStudioBySlug(slug: string): Promise<Studio | null> {
  const { data, error } = await supabase
    .from('studios')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching studio:', error);
    return null;
  }

  return data;
}

export async function getFeaturedStudios(limit: number = 4): Promise<Studio[]> {
  const { data, error } = await supabase
    .from('studios')
    .select('*')
    .eq('status', 'active')
    .eq('is_verified', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching featured studios:', error);
    return [];
  }

  return data || [];
}

export async function getStudiosByOwner(ownerId: string): Promise<Studio[]> {
  const { data, error } = await supabase
    .from('studios')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching owner studios:', error);
    return [];
  }

  return data || [];
}

// Bookings
export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      studio:studios(*)
    `)
    .eq('booker_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }

  return data || [];
}

export async function getBookingsByStudio(studioId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      booker:profiles(*)
    `)
    .eq('studio_id', studioId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching studio bookings:', error);
    return [];
  }

  return data || [];
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      studio:studios(*),
      booker:profiles(*)
    `)
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error('Error fetching booking:', error);
    return null;
  }

  return data;
}

// Profile
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function createProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return null;
  }

  return data;
}

// Stats for owner dashboard
export async function getOwnerStats(ownerId: string): Promise<{
  totalStudios: number;
  totalBookings: number;
  totalEarnings: number;
  pendingBookings: number;
}> {
  // Get studios count
  const { count: studioCount } = await supabase
    .from('studios')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', ownerId);

  // Get owner's studio IDs first
  const { data: studios } = await supabase
    .from('studios')
    .select('id')
    .eq('owner_id', ownerId);

  if (!studios || studios.length === 0) {
    return {
      totalStudios: studioCount || 0,
      totalBookings: 0,
      totalEarnings: 0,
      pendingBookings: 0,
    };
  }

  const studioIds = studios.map(s => s.id);

  // Get bookings for owner's studios
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('total_amount, platform_fee, status')
    .in('studio_id', studioIds);

  if (error) {
    console.error('Error fetching owner stats:', error);
    return {
      totalStudios: studioCount || 0,
      totalBookings: 0,
      totalEarnings: 0,
      pendingBookings: 0,
    };
  }

  const totalBookings = bookings?.length || 0;
  const totalEarnings = bookings?.reduce((sum, b) => {
    if (b.status === 'confirmed' || b.status === 'completed') {
      return sum + (b.total_amount - (b.platform_fee || 0));
    }
    return sum;
  }, 0) || 0;

  const pendingBookings = bookings?.filter(b => 
    b.status === 'pending_payment' || b.status === 'confirmed'
  ).length || 0;

  return {
    totalStudios: studioCount || 0,
    totalBookings,
    totalEarnings,
    pendingBookings,
  };
}

// Check availability
export async function checkAvailability(
  studioId: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('studio_id', studioId)
    .eq('date', date)
    .in('status', ['confirmed', 'in_progress'])
    .or(`start_time.lt.${endTime},end_time.gt.${startTime}`);

  if (error) {
    console.error('Error checking availability:', error);
    return false;
  }

  return (data?.length || 0) === 0;
}

// Create booking
export async function createBooking(booking: Partial<Booking>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }

  return data;
}

// Update booking
export async function updateBooking(
  bookingId: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }

  return data;
}

// Create studio
export async function createStudio(studio: Partial<Studio>): Promise<Studio | null> {
  const { data, error } = await supabase
    .from('studios')
    .insert(studio)
    .select()
    .single();

  if (error) {
    console.error('Error creating studio:', error);
    return null;
  }

  return data;
}

// Update studio
export async function updateStudio(
  studioId: string,
  updates: Partial<Studio>
): Promise<Studio | null> {
  const { data, error } = await supabase
    .from('studios')
    .update(updates)
    .eq('id', studioId)
    .select()
    .single();

  if (error) {
    console.error('Error updating studio:', error);
    return null;
  }

  return data;
}

// Delete studio
export async function deleteStudio(studioId: string): Promise<boolean> {
  const { error } = await supabase
    .from('studios')
    .delete()
    .eq('id', studioId);

  if (error) {
    console.error('Error deleting studio:', error);
    return false;
  }

  return true;
}
