-- OneTime Studios - Fix Empty Array Types
-- This fixes the "cannot determine type of empty array" error

-- 1. Drop tables if they exist
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- 2. Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'booker',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create studios table with explicit array types
CREATE TABLE studios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'US',
  studio_type TEXT[] DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  hourly_rate INTEGER NOT NULL DEFAULT 50,
  minimum_booking_hours INTEGER DEFAULT 1,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  cover_image TEXT,
  status TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  stripe_connect_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  studio_id UUID NOT NULL REFERENCES studios(id),
  booker_id UUID NOT NULL REFERENCES profiles(id),
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

-- 5. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 6. Policies
CREATE POLICY "Profiles readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Studios readable by everyone" ON studios FOR SELECT USING (status = 'active' OR owner_id = auth.uid());
CREATE POLICY "Owners can create studios" ON studios FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Owners can update their studios" ON studios FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Bookers can view their bookings" ON bookings FOR SELECT USING (booker_id = auth.uid());
CREATE POLICY "Owners can view their studio bookings" ON bookings FOR SELECT USING (EXISTS (
  SELECT 1 FROM studios WHERE studios.id = bookings.studio_id AND studios.owner_id = auth.uid()
));
CREATE POLICY "Bookers can create bookings" ON bookings FOR INSERT WITH CHECK (booker_id = auth.uid());

-- 7. Indexes
CREATE INDEX idx_studios_city ON studios(city);
CREATE INDEX idx_studios_status ON studios(status);
CREATE INDEX idx_bookings_studio ON bookings(studio_id);
CREATE INDEX idx_bookings_booker ON bookings(booker_id);

-- 8. Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER studios_updated BEFORE UPDATE ON studios
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 9. Sample data with non-empty arrays or explicit casts
INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'owner@onetime.studio', 'Test', 'Owner', 'owner'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'booker@onetime.studio', 'Test', 'Booker', 'booker');

INSERT INTO studios (owner_id, name, slug, description, address, city, state, hourly_rate, studio_type, amenities, status, is_verified)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'Neon Sound Labs', 'neon-sound-labs', 'Professional recording studio', '123 Music Row', 'Los Angeles', 'CA', 75, ARRAY['recording']::TEXT[], ARRAY['SSL Console', 'Vocal Booth']::TEXT[], 'active', true),
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'Golden Hour Studios', 'golden-hour-studios', 'Natural light photo studio', '456 Photo Lane', 'Brooklyn', 'NY', 120, ARRAY['photography']::TEXT[], ARRAY['Cyclorama', 'Lighting']::TEXT[], 'active', true),
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'The Basement', 'the-basement-austin', 'Rehearsal space', '789 Live Ave', 'Austin', 'TX', 35, ARRAY['rehearsal']::TEXT[], ARRAY['Drums', 'PA']::TEXT[], 'active', true);

SELECT 'Database setup complete!' as message;
