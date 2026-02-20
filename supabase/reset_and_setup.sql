-- OneTime Studios - Reset and Fresh Setup
-- WARNING: This will DELETE ALL DATA in the tables!
-- Only run this if you want to start completely fresh

-- 1. Drop existing tables (will cascade drop policies, triggers, indexes)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Profiles table
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'booker',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Studios table
CREATE TABLE studios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'US',
  studio_type TEXT[] DEFAULT ARRAY['recording'],
  amenities TEXT[] DEFAULT ARRAY[],
  hourly_rate INTEGER NOT NULL DEFAULT 50,
  minimum_booking_hours INTEGER DEFAULT 1,
  images TEXT[] DEFAULT ARRAY[],
  cover_image TEXT,
  status TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  stripe_connect_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES studios(id),
  booker_id TEXT NOT NULL REFERENCES profiles(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL,
  hourly_rate INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  platform_fee INTEGER DEFAULT 0,
  status TEXT DEFAULT 'hold',
  payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 7. Basic Policies
CREATE POLICY "Profiles readable" ON profiles FOR SELECT USING (true);

CREATE POLICY "Studios readable" ON studios FOR SELECT 
  USING (COALESCE(status, 'pending') = 'active' OR owner_id = auth.uid()::text);

CREATE POLICY "Studios insertable" ON studios FOR INSERT 
  WITH CHECK (owner_id = auth.uid()::text);

CREATE POLICY "Studios updatable" ON studios FOR UPDATE 
  USING (owner_id = auth.uid()::text);

CREATE POLICY "Bookings readable by booker" ON bookings FOR SELECT 
  USING (booker_id = auth.uid()::text);

CREATE POLICY "Bookings readable by owner" ON bookings FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM studios 
    WHERE studios.id = bookings.studio_id 
    AND studios.owner_id = auth.uid()::text
  ));

CREATE POLICY "Bookings insertable" ON bookings FOR INSERT 
  WITH CHECK (booker_id = auth.uid()::text);

CREATE POLICY "Bookings updatable" ON bookings FOR UPDATE 
  USING (booker_id = auth.uid()::text);

-- 8. Indexes
CREATE INDEX idx_studios_city ON studios(city);
CREATE INDEX idx_studios_status ON studios(status);
CREATE INDEX idx_bookings_studio ON bookings(studio_id);
CREATE INDEX idx_bookings_booker ON bookings(booker_id);

-- 9. Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ 
BEGIN 
  NEW.updated_at = NOW(); 
  RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

CREATE TRIGGER studios_updated 
  BEFORE UPDATE ON studios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated 
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 10. Insert sample data
INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES 
  ('test-owner', 'owner@onetime.studio', 'Test', 'Owner', 'owner'),
  ('test-booker', 'booker@onetime.studio', 'Test', 'Booker', 'booker');

INSERT INTO studios (owner_id, name, slug, description, address, city, state, hourly_rate, studio_type, amenities, status, is_verified)
VALUES 
  ('test-owner', 'Neon Sound Labs', 'neon-sound-labs', 'Professional recording studio with SSL console and vocal booth', '123 Music Row', 'Los Angeles', 'CA', 75, ARRAY['recording', 'mixing'], ARRAY['SSL Console', 'Vocal Booth', 'Parking'], 'active', true),
  ('test-owner', 'Golden Hour Studios', 'golden-hour-studios', 'Natural light photo studio perfect for portraits and product shots', '456 Photo Lane', 'Brooklyn', 'NY', 120, ARRAY['photography', 'video'], ARRAY['Cyclorama', 'Lighting Kit', 'Makeup Room'], 'active', true),
  ('test-owner', 'The Basement', 'the-basement-austin', 'Underground rehearsal space with full backline', '789 Live Ave', 'Austin', 'TX', 35, ARRAY['rehearsal'], ARRAY['Drums Included', 'PA System', '24/7 Access'], 'active', true);

SELECT 'OneTime Studios database reset and setup complete!' as message;
SELECT 'Created 3 sample studios for testing' as info;
