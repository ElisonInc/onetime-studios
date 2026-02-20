-- OneTime Studios Quick Setup
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/lbdauutduonffyaxuime/sql

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'booker',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Studios table
CREATE TABLE IF NOT EXISTS studios (
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

-- 4. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
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

-- 5. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 6. Basic Policies
CREATE POLICY "Profiles readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Studios readable" ON studios FOR SELECT USING (status = 'active' OR owner_id = auth.uid()::text);
CREATE POLICY "Bookings readable by booker" ON bookings FOR SELECT USING (booker_id = auth.uid()::text);
CREATE POLICY "Bookings readable by owner" ON bookings FOR SELECT USING (EXISTS (
  SELECT 1 FROM studios WHERE studios.id = bookings.studio_id AND studios.owner_id = auth.uid()::text
));
CREATE POLICY "Bookings insertable" ON bookings FOR INSERT WITH CHECK (booker_id = auth.uid()::text);

-- 7. Indexes
CREATE INDEX idx_studios_city ON studios(city);
CREATE INDEX idx_studios_status ON studios(status);
CREATE INDEX idx_bookings_studio ON bookings(studio_id);
CREATE INDEX idx_bookings_booker ON bookings(booker_id);

-- 8. Update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS studios_updated ON studios;
CREATE TRIGGER studios_updated BEFORE UPDATE ON studios
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS bookings_updated ON bookings;
CREATE TRIGGER bookings_updated BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 9. Sample data (optional - uncomment to add)
-- INSERT INTO profiles (id, email, first_name, last_name, role) 
-- VALUES ('test-user', 'test@onetime.studio', 'Test', 'User', 'owner');

-- INSERT INTO studios (owner_id, name, slug, description, address, city, state, hourly_rate, studio_type, status, is_verified)
-- VALUES ('test-user', 'Demo Studio', 'demo-studio', 'A demo studio for testing', '123 Main St', 'Los Angeles', 'CA', 75, ARRAY['recording'], 'active', true);

SELECT 'OneTime Studios database setup complete!' as message;
