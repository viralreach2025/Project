-- =====================================================
-- TEMPORARY: DISABLE RLS FOR TESTING
-- =====================================================
-- WARNING: This is for testing only! Re-enable RLS after testing.

-- Disable RLS on users table temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'users';

-- =====================================================
-- TO RE-ENABLE RLS LATER, RUN:
-- =====================================================
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- Then run the fix-user-signup-rls.sql script 