-- Check if studios have images
SELECT 
  name,
  slug,
  cover_image,
  array_length(images, 1) as num_images
FROM studios;

-- Check if images array is populated
SELECT 
  name,
  images
FROM studios 
WHERE array_length(images, 1) > 0;

-- Update studios to add images if missing
UPDATE studios 
SET 
  cover_image = CASE slug
    WHEN 'neon-sound-labs' THEN 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop'
    WHEN 'golden-hour-studios' THEN 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop'
    WHEN 'the-basement-austin' THEN 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop'
    WHEN 'podcast-palace-miami' THEN 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=800&fit=crop'
    ELSE cover_image
  END,
  images = CASE slug
    WHEN 'neon-sound-labs' THEN ARRAY['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop']
    WHEN 'golden-hour-studios' THEN ARRAY['https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop']
    WHEN 'the-basement-austin' THEN ARRAY['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop']
    WHEN 'podcast-palace-miami' THEN ARRAY['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=800&fit=crop']
    ELSE images
  END
WHERE slug IN ('neon-sound-labs', 'golden-hour-studios', 'the-basement-austin', 'podcast-palace-miami');
