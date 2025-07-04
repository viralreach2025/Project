-- Fix RLS Policies for Contact Submissions
-- Run this SQL in your Supabase SQL editor to fix the contact form RLS policies

-- First, drop any existing policies for contact_submissions
DROP POLICY IF EXISTS "Allow insert access for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable all access for service role" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow all access" ON contact_submissions;

-- Temporarily disable RLS to test
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a comprehensive policy that allows all operations for all users
CREATE POLICY "Allow all access" ON contact_submissions
  FOR ALL 
  TO public
  USING (true)
  WITH CHECK (true);

-- Alternative: Create specific policies if the above doesn't work
-- CREATE POLICY "Enable insert for all" ON contact_submissions
--   FOR INSERT 
--   TO public
--   WITH CHECK (true);

-- CREATE POLICY "Enable select for authenticated users" ON contact_submissions
--   FOR SELECT 
--   TO authenticated
--   USING (true);

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions'; 