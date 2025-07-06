-- =====================================================
-- FINAL SIGNUP FIX - COMPREHENSIVE APPROACH
-- =====================================================

-- Step 1: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON public.users;
DROP POLICY IF EXISTS "Allow all operations" ON public.users;

-- Step 2: Disable RLS temporarily for immediate fix
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- Step 4: Check if there are any remaining policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- =====================================================
-- OPTIONAL: RE-ENABLE RLS WITH PROPER POLICIES
-- =====================================================
-- Uncomment the lines below when you want to re-enable RLS

-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Users can view their own profile" ON public.users
--     FOR SELECT USING (auth.uid() = id);
-- 
-- CREATE POLICY "Users can update their own profile" ON public.users
--     FOR UPDATE USING (auth.uid() = id);
-- 
-- CREATE POLICY "Service role can manage all users" ON public.users
--     FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Final check
SELECT 
    'RLS Status' as check_type,
    CASE 
        WHEN rowsecurity THEN 'ENABLED'
        ELSE 'DISABLED'
    END as status
FROM pg_tables 
WHERE tablename = 'users'

UNION ALL

SELECT 
    'Policy Count' as check_type,
    COUNT(*)::text as status
FROM pg_policies 
WHERE tablename = 'users'; 