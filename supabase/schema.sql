-- OneTime Studios Database Schema
-- Project: lbdauutduonffyaxuime

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (syncs with Clerk users)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'booker' CHECK (role IN ('booker', 'owner', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Studios table
CREATE TABLE IF NOT EXISTS studios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Studio details
  studio_type TEXT[] DEFAULT ARRAY['recording'],
  amenities TEXT[] DEFAULT ARRAY[],
  equipment TEXT[] DEFAULT ARRAY[],
  
  -- Pricing
  hourly_rate INTEGER NOT NULL DEFAULT 50,
  minimum_booking_hours INTEGER DEFAULT 1 CHECK (minimum_booking_hours >= 1),
  
  -- Media
  images TEXT[] DEFAULT ARRAY[],
  cover_image TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'suspended')),
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Stripe Connect for payouts
  stripe_connect_account_id TEXT,
  stripe_connect_enabled BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms within studios (optional - for multi-room studios)
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  hourly_rate INTEGER,
  images TEXT[] DEFAULT ARRAY[],
  amenities TEXT[] DEFAULT ARRAY[],
  capacity INTEGER,
  square_feet INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability slots (for specific time slots)
CREATE TABLE IF NOT EXISTS availability_slots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  booking_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  booker_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Booking details
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL,
  
  -- Pricing
  hourly_rate INTEGER NOT NULL,
  total_amount INTEGER NOT NULL, -- in cents
  platform_fee INTEGER DEFAULT 0, -- in cents
  payout_amount INTEGER DEFAULT 0, -- in cents
  
  -- Status
  status TEXT DEFAULT 'hold' CHECK (status IN ('hold', 'pending_payment', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  hold_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment
  payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded')),
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  reviewer_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites/bookmarks
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, studio_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid()::text);

-- Studios Policies
CREATE POLICY "Active studios are viewable by everyone"
  ON studios FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid()::text);

CREATE POLICY "Owners can create studios"
  ON studios FOR INSERT
  WITH CHECK (owner_id = auth.uid()::text);

CREATE POLICY "Owners can update their studios"
  ON studios FOR UPDATE
  USING (owner_id = auth.uid()::text);

CREATE POLICY "Owners can delete their studios"
  ON studios FOR DELETE
  USING (owner_id = auth.uid()::text);

-- Rooms Policies
CREATE POLICY "Rooms are viewable by everyone"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Owners can manage their rooms"
  ON rooms FOR ALL
  USING (EXISTS (
    SELECT 1 FROM studios WHERE studios.id = rooms.studio_id AND studios.owner_id = auth.uid()::text
  ));

-- Availability Slots Policies
CREATE POLICY "Slots are viewable by everyone"
  ON availability_slots FOR SELECT
  USING (true);

CREATE POLICY "Owners can manage their slots"
  ON availability_slots FOR ALL
  USING (EXISTS (
    SELECT 1 FROM studios WHERE studios.id = availability_slots.studio_id AND studios.owner_id = auth.uid()::text
  ));

-- Bookings Policies
CREATE POLICY "Bookers can view their bookings"
  ON bookings FOR SELECT
  USING (booker_id = auth.uid()::text);

CREATE POLICY "Owners can view their studio bookings"
  ON bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM studios WHERE studios.id = bookings.studio_id AND studios.owner_id = auth.uid()::text
  ));

CREATE POLICY "Bookers can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (booker_id = auth.uid()::text);

CREATE POLICY "Bookers can update their bookings"
  ON bookings FOR UPDATE
  USING (booker_id = auth.uid()::text);

-- Reviews Policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Bookers can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (reviewer_id = auth.uid()::text);

-- Favorites Policies
CREATE POLICY "Users can view their favorites"
  ON favorites FOR SELECT
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can remove their favorites"
  ON favorites FOR DELETE
  USING (user_id = auth.uid()::text);

-- Unique constraints to prevent double-booking
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_booking_slot 
  ON bookings (studio_id, room_id, date, start_time) 
  WHERE status IN ('confirmed', 'in_progress');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_studios_owner ON studios(owner_id);
CREATE INDEX IF NOT EXISTS idx_studios_city ON studios(city);
CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status);
CREATE INDEX IF NOT EXISTS idx_bookings_studio ON bookings(studio_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booker ON bookings(booker_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_availability_studio_date ON availability_slots(studio_id, date);
CREATE INDEX IF NOT EXISTS idx_reviews_studio ON reviews(studio_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_studios_updated_at ON studios;
CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON studios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional)
-- Uncomment to add sample studios
/*
INSERT INTO studios (owner_id, name, slug, description, address, city, state, hourly_rate, studio_type, amenities, status, is_verified)
VALUES 
  ('system', 'Neon Sound Labs', 'neon-sound-labs', 'Professional recording studio with SSL console', '123 Music Row', 'Los Angeles', 'CA', 75, ARRAY['recording', 'mixing'], ARRAY['ssl-console', 'vocal-booth', 'parking'], 'active', true),
  ('system', 'Golden Hour Studios', 'golden-hour-studios', 'Photo and video studio with natural light', '456 Photo Lane', 'Brooklyn', 'NY', 120, ARRAY['photography', 'video'], ARRAY['cyclorama', 'lighting-kit', 'makeup-room'], 'active', true);
*/
