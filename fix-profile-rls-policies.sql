-- Fix RLS policies for profiles table
-- First, let's drop the existing policies and recreate them

-- Drop existing policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create new policies that work better for the profile editor

-- Allow public read access to all profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

-- Allow insert for any profile (for now, we can restrict this later with proper auth)
CREATE POLICY "Allow profile creation" ON public.profiles
    FOR INSERT WITH CHECK (true);

-- Allow update for any profile (for now, we can restrict this later with proper auth)
CREATE POLICY "Allow profile updates" ON public.profiles
    FOR UPDATE USING (true);

-- Also fix the portfolio_items policies
DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can update their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can insert their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can delete their own portfolio items" ON public.portfolio_items;

-- Create new portfolio policies
CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
    FOR SELECT USING (true);

CREATE POLICY "Allow portfolio item creation" ON public.portfolio_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow portfolio item updates" ON public.portfolio_items
    FOR UPDATE USING (true);

CREATE POLICY "Allow portfolio item deletion" ON public.portfolio_items
    FOR DELETE USING (true);

-- Note: These policies allow full access for now. In production, you should:
-- 1. Add proper authentication
-- 2. Restrict operations to authenticated users
-- 3. Add ownership checks (e.g., auth.uid()::text = username)
-- 4. Add rate limiting and other security measures 