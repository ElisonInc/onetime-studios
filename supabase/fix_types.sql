-- OneTime Studios - Fix Type Mismatch (UUID vs TEXT)
-- This fixes the "operator does not exist: uuid = text" error

-- 1. First, drop tables if they exist (clean slate for types)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Drop the trigger function if exists
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- 3. Create profiles table with UUID primary key (matches Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE, -- Store Clerk user ID separately if needed
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'booker',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create studios table with UUID foreign key
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

-- 5. Create bookings table with UUID foreign keys
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

-- 6. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 7. Policies for profiles
CREATE POLICY "Profiles readable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (id = auth.uid() OR clerk_id = auth.uid()::text);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (id = auth.uid());

-- 8. Policies for studios
CREATE POLICY "Studios readable by everyone" 
  ON studios FOR SELECT 
  USING (status = 'active' OR owner_id = auth.uid());

CREATE POLICY "Owners can create studios" 
  ON studios FOR INSERT 
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their studios" 
  ON studios FOR UPDATE 
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their studios" 
  ON studios FOR DELETE 
  USING (owner_id = auth.uid());

-- 9. Policies for bookings
CREATE POLICY "Bookers can view their bookings" 
  ON bookings FOR SELECT 
  USING (booker_id = auth.uid());

CREATE POLICY "Owners can view their studio bookings" 
  ON bookings FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM studios 
    WHERE studios.id = bookings.studio_id 
    AND studios.owner_id = auth.uid()
  ));

CREATE POLICY "Bookers can create bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (booker_id = auth.uid());

CREATE POLICY "Bookers can update their bookings" 
  ON bookings FOR UPDATE 
  USING (booker_id = auth.uid());

-- 10. Indexes
CREATE INDEX idx_studios_city ON studios(city);
CREATE INDEX idx_studios_status ON studios(status);
CREATE INDEX idx_studios_owner ON studios(owner_id);
CREATE INDEX idx_bookings_studio ON bookings(studio_id);
CREATE INDEX idx_bookings_booker ON bookings(booker_id);
CREATE INDEX idx_bookings_date ON bookings(date);

-- 11. Update trigger function
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

-- 12. Insert sample data with explicit UUIDs
INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'owner@onetime.studio', 'Test', 'Owner', 'owner'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'booker@onetime.studio', 'Test', 'Booker', 'booker');

INSERT INTO studios (owner_id, name, slug, description, address, city, state, hourly_rate, studio_type, amenities, status, is_verified)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'Neon Sound Labs', 'neon-sound-labs', 'Professional recording studio with SSL console and vocal booth', '123 Music Row', 'Los Angeles', 'CA', 75, ARRAY['recording', 'mixing'], ARRAY['SSL Console', 'Vocal Booth', 'Parking'], 'active', true),
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'Golden Hour Studios', 'golden-hour-studios', 'Natural light photo studio perfect for portraits and product shots', '456 Photo Lane', 'Brooklyn', 'NY', 120, ARRAY['photography', 'video'], ARRAY['Cyclorama', 'Lighting Kit', 'Makeup Room'], 'active', true),
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'The Basement', 'the-basement-austin', 'Underground rehearsal space with full backline', '789 Live Ave', 'Austin', 'TX', 35, ARRAY['rehearsal'], ARRAY['Drums Included', 'PA System', '24/7 Access'], 'active', true);

SELECT 'Database schema created successfully with UUID types!' as message;
