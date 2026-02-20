-- Check what studios exist
SELECT name, slug, city, state, status, is_verified 
FROM studios 
ORDER BY created_at DESC;

-- Count total studios
SELECT COUNT(*) as total_studios FROM studios;

-- Check if we need to add more
SELECT 
  (SELECT COUNT(*) FROM studios WHERE studio_type @> ARRAY['recording']) as recording_studios,
  (SELECT COUNT(*) FROM studios WHERE studio_type @> ARRAY['photography']) as photo_studios,
  (SELECT COUNT(*) FROM studios WHERE studio_type @> ARRAY['rehearsal']) as rehearsal_studios,
  (SELECT COUNT(*) FROM studios WHERE studio_type @> ARRAY['podcast']) as podcast_studios;
