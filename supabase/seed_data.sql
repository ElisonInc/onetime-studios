-- Seed data for OneTime Studios
-- Run this in Supabase SQL Editor to add sample studios

-- First, create a sample owner profile
INSERT INTO profiles (id, email, first_name, last_name, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@onetime.studio', 'Demo', 'Owner', 'owner')
ON CONFLICT (id) DO NOTHING;

-- Insert sample studios with professional data
INSERT INTO studios (
  owner_id, name, slug, description, address, city, state, zip, country,
  studio_type, amenities, hourly_rate, minimum_booking_hours, images, cover_image,
  status, is_verified, created_at, updated_at
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Neon Sound Labs',
  'neon-sound-labs',
  'Premier recording studio featuring a vintage SSL 4000G+ console, spacious live room with 20ft ceilings, and four isolated booths. Perfect for tracking full bands or intimate vocal sessions. Our collection includes vintage mics, outboard gear, and a Steinway grand piano.',
  '1247 Music Row East',
  'Nashville',
  'TN',
  '37203',
  'US',
  ARRAY['recording', 'mixing'],
  ARRAY['SSL Console', 'Vintage Mics', 'Steinway Piano', 'Live Room', 'Vocal Booth', 'Parking', 'WiFi', 'Kitchen'],
  85,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Golden Hour Studios',
  'golden-hour-studios',
  'Beautiful daylight photo studio with floor-to-ceiling windows, white cyclorama wall, and professional lighting kit included. The space gets incredible golden hour light perfect for portraits, product shots, and fashion work. Makeup station and client lounge included.',
  '456 Creative Ave, Suite 200',
  'Brooklyn',
  'NY',
  '11211',
  'US',
  ARRAY['photography', 'video'],
  ARRAY['Cyclorama', 'Natural Light', 'Strobe Lighting', 'Makeup Station', 'Client Lounge', 'WiFi', 'Coffee Bar', 'Parking'],
  125,
  3,
  ARRAY[
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1554048612-387768052bf7?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'The Basement',
  'the-basement-austin',
  'Underground rehearsal space with killer acoustics and zero noise complaints. Full backline included: drums, bass amp, guitar stacks, and PA. Perfect for bands to write, rehearse, or record demos. 24/7 access with secure entry.',
  '789 Live Music Lane',
  'Austin',
  'TX',
  '78701',
  'US',
  ARRAY['rehearsal'],
  ARRAY['Drum Kit', 'Guitar Amps', 'Bass Amp', 'PA System', '24/7 Access', 'Air Conditioning', 'Secure Parking', 'WiFi'],
  45,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Podcast Palace',
  'podcast-palace-miami',
  'Professional podcast studio with 4-person setup, video capabilities, and live streaming equipment. Sound-treated room with Rodecaster Pro, Shure SM7B mics, and 4K cameras. Perfect for podcasts, interviews, and YouTube content.',
  '321 Media District Blvd',
  'Miami',
  'FL',
  '33132',
  'US',
  ARRAY['podcast', 'video'],
  ARRAY['4 Mics', 'Video Setup', 'Live Streaming', 'Sound Treated', 'Teleprompter', 'Green Room', 'WiFi', 'Parking'],
  75,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Metro Rehearsal Complex',
  'metro-rehearsal-la',
  '24/7 rehearsal complex in the heart of LA. Twelve private rooms ranging from solo practice spaces to full band rooms. All rooms equipped with PA systems, drum kits, and amps available for rent. Secure building with loading dock.',
  '1847 Industrial Street',
  'Los Angeles',
  'CA',
  '90021',
  'US',
  ARRAY['rehearsal'],
  ARRAY['24/7 Access', 'PA Systems', 'Drum Kits', 'Amps Available', 'Loading Dock', 'Parking', 'WiFi', 'Security'],
  35,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'The White Room',
  'the-white-room-chicago',
  'Elegant all-white photo and video studio perfect for fashion, product, and portrait photography. Features seamless white cyclorama, professional strobes, and changing room. Natural light option with blackout capability.',
  '923 Fashion District',
  'Chicago',
  'IL',
  '60607',
  'US',
  ARRAY['photography', 'video'],
  ARRAY['White Cyc', 'Strobe Lighting', 'Changing Room', 'Natural Light', 'Blackout Curtains', 'WiFi', 'Makeup Mirror', 'Parking'],
  95,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Rhythm Section',
  'rhythm-section-atlanta',
  'Drum-focused rehearsal and recording space with multiple kits, percussion room, and isolation booths. Perfect for drum tracking, lessons, or practice. Features vintage and modern kits including Ludwig, DW, and Yamaha.',
  '445 Peachtree Industrial',
  'Atlanta',
  'GA',
  '30341',
  'US',
  ARRAY['rehearsal', 'recording'],
  ARRAY['Drum Kits', 'Percussion', 'Isolation Booths', 'PA System', 'Air Conditioning', 'WiFi', 'Parking', 'Loading Area'],
  55,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1543443374-b6fe10a62d43?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Content House',
  'content-house-sf',
  'Modern content creation studio with podcast setup, video capabilities, and photo areas. All-in-one space for creators, influencers, and brands. Includes ring lights, softboxes, backdrops, and editing station.',
  '888 Mission Street, Floor 3',
  'San Francisco',
  'CA',
  '94103',
  'US',
  ARRAY['podcast', 'video', 'photography'],
  ARRAY['Ring Lights', 'Softboxes', 'Backdrops', 'Editing Station', 'Green Screen', 'WiFi', 'Coffee', 'Parking'],
  85,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop'
  ],
  'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=1200&h=800&fit=crop',
  'active',
  true,
  NOW(),
  NOW()
);

SELECT '8 sample studios added successfully!' as message;
