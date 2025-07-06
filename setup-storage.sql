-- Supabase Storage Setup Script
-- Run this in your Supabase SQL Editor to set up storage for profile picture uploads

-- Step 1: Drop all existing storage policies to start fresh
DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow user updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow user deletes" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio media is publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations for portfolio-media" ON storage.objects;

-- Step 2: Create a simple policy that allows all operations for development
-- This is the most permissive policy for testing uploads
CREATE POLICY "Allow all operations for portfolio-media" ON storage.objects 
FOR ALL USING (bucket_id = 'portfolio-media');

-- Step 3: Alternative - More restrictive policies for production (uncomment if needed)
-- CREATE POLICY "Allow public read" ON storage.objects 
-- FOR SELECT USING (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow authenticated uploads" ON storage.objects 
-- FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow user updates" ON storage.objects 
-- FOR UPDATE USING (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow user deletes" ON storage.objects 
-- FOR DELETE USING (bucket_id = 'portfolio-media');

-- Step 4: Verify the policy was created
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%portfolio-media%';

-- Step 5: Test storage access (this will show any remaining issues)
-- Note: You'll need to create the bucket manually in the Supabase Dashboard first
-- Go to Storage > Create bucket > Name: portfolio-media > Public: Yes 