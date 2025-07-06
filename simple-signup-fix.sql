-- =====================================================
-- SIMPLE SIGNUP FIX - DISABLE RLS TEMPORARILY
-- =====================================================

-- Option 1: Disable RLS temporarily for testing
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Option 2: Create a very permissive RLS policy
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow all operations" ON public.users;
-- CREATE POLICY "Allow all operations" ON public.users
--     FOR ALL USING (true);

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- =====================================================
-- TO RE-ENABLE RLS LATER
-- =====================================================

-- When you're ready to re-enable RLS, run this:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- 
-- Then create proper policies:
-- CREATE POLICY "Users can view their own profile" ON public.users
--     FOR SELECT USING (auth.uid() = id);
-- CREATE POLICY "Users can update their own profile" ON public.users
--     FOR UPDATE USING (auth.uid() = id);
-- CREATE POLICY "Service role can manage all users" ON public.users
--     FOR ALL USING (auth.role() = 'service_role'); 