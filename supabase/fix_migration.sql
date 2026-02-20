-- OneTime Studios Migration Fix
-- Run this if you get "column does not exist" errors

-- 1. First, let's check what columns exist in studios table
DO $$
BEGIN
  -- Add status column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'studios' AND column_name = 'status') THEN
    ALTER TABLE studios ADD COLUMN status TEXT DEFAULT 'pending';
  END IF;

  -- Add other potentially missing columns
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'studios' AND column_name = 'is_verified') THEN
    ALTER TABLE studios ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'studios' AND column_name = 'stripe_connect_account_id') THEN
    ALTER TABLE studios ADD COLUMN stripe_connect_account_id TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'studios' AND column_name = 'updated_at') THEN
    ALTER TABLE studios ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  -- Add booking columns if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'updated_at') THEN
    ALTER TABLE bookings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'platform_fee') THEN
    ALTER TABLE bookings ADD COLUMN platform_fee INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'payment_status') THEN
    ALTER TABLE bookings ADD COLUMN payment_status TEXT DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'notes') THEN
    ALTER TABLE bookings ADD COLUMN notes TEXT;
  END IF;
END $$;

-- 2. Drop existing policies to recreate them
DROP POLICY IF EXISTS "Studios readable" ON studios;
DROP POLICY IF EXISTS "Bookings readable by booker" ON bookings;
DROP POLICY IF EXISTS "Bookings readable by owner" ON bookings;
DROP POLICY IF EXISTS "Bookings insertable" ON bookings;

-- 3. Recreate policies with proper checks
CREATE POLICY "Studios readable" 
  ON studios FOR SELECT 
  USING (status = 'active' OR owner_id = auth.uid()::text);

CREATE POLICY "Bookings readable by booker" 
  ON bookings FOR SELECT 
  USING (booker_id = auth.uid()::text);

CREATE POLICY "Bookings readable by owner" 
  ON bookings FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM studios 
    WHERE studios.id = bookings.studio_id 
    AND studios.owner_id = auth.uid()::text
  ));

CREATE POLICY "Bookings insertable" 
  ON bookings FOR INSERT 
  WITH CHECK (booker_id = auth.uid()::text);

-- 4. Create/update indexes
CREATE INDEX IF NOT EXISTS idx_studios_city ON studios(city);
CREATE INDEX IF NOT EXISTS idx_studios_status ON studios(status);
CREATE INDEX IF NOT EXISTS idx_bookings_studio ON bookings(studio_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booker ON bookings(booker_id);

-- 5. Create/update trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ 
BEGIN 
  NEW.updated_at = NOW(); 
  RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

-- Drop and recreate triggers
DROP TRIGGER IF EXISTS studios_updated ON studios;
CREATE TRIGGER studios_updated 
  BEFORE UPDATE ON studios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS bookings_updated ON bookings;
CREATE TRIGGER bookings_updated 
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

SELECT 'Migration fix complete!' as message;
