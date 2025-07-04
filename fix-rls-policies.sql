-- Fix RLS Policies for ViralReach Waitlist
-- Run this SQL in your Supabase SQL editor to fix the RLS policies

-- First, let's see what policies currently exist and remove them
DROP POLICY IF EXISTS "Allow insert access for all users" ON waitlist_entries;
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON waitlist_entries;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON waitlist_entries;
DROP POLICY IF EXISTS "Enable all access for service role" ON waitlist_entries;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON waitlist_entries;

-- Temporarily disable RLS to test
ALTER TABLE waitlist_entries DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows all operations for all users
CREATE POLICY "Allow all access" ON waitlist_entries
  FOR ALL 
  TO public
  USING (true)
  WITH CHECK (true);

-- Alternative: If the above doesn't work, create specific policies
-- CREATE POLICY "Enable insert for all" ON waitlist_entries
--   FOR INSERT 
--   TO public
--   WITH CHECK (true);

-- CREATE POLICY "Enable select for all" ON waitlist_entries
--   FOR SELECT 
--   TO public
--   USING (true); 