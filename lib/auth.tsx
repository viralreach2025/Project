'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { User as AppUser, UserType } from './types'
import { useRouter } from 'next/navigation'

// =====================================================
// AUTHENTICATION CONTEXT
// =====================================================

interface AuthContextType {
  user: AppUser | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userType: UserType, userData?: Partial<AppUser>) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateProfile: (updates: Partial<AppUser>) => Promise<{ error: any }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// =====================================================
// AUTHENTICATION PROVIDER
// =====================================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if Supabase is configured
  const isSupabaseConfigured = supabase !== null

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Mock authentication for local development
      console.log('🔧 Using mock authentication for local development')
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase!.auth.getSession()
        setSession(session)
        
        if (session?.user) {
          await fetchUserProfile(session.user)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        
        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [isSupabaseConfigured])

  // Fetch user profile from our users table
  const fetchUserProfile = async (authUser: User) => {
    if (!isSupabaseConfigured || !supabase) return

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }

      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, userType: UserType, userData?: Partial<AppUser>) => {
    if (!isSupabaseConfigured) {
      // Mock signup for local development
      console.log('🔧 Mock signup:', { email, userType, userData })
      
      // Create mock user
      const mockUser: AppUser = {
        id: 'mock-user-id-' + Date.now(),
        email,
        user_type: userType,
        full_name: userData?.full_name || 'Mock User',
        company_name: userData?.company_name,
        website: userData?.website,
        phone: userData?.phone,
        location: userData?.location,
        bio: userData?.bio,
        is_verified: true,
        is_active: true,
        subscription_tier: 'free',
        subscription_status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      setUser(mockUser)
      return { error: null }
    }

    try {
      // Check our users table first
      const { data: existingUser } = await supabase!
        .from('users')
        .select('id')
        .eq('email', email)
        .single()
      
      if (existingUser) {
        return { 
          error: new Error('A user with this email already exists. Please sign in instead.') 
        }
      }
      // Create the auth user
      const { data, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            full_name: userData?.full_name,
            company_name: userData?.company_name,
            ...userData
          }
        }
      })

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message?.includes('User already registered')) {
          return { error: new Error('A user with this email already exists. Please sign in instead.') }
        } else if (error.message?.includes('Invalid email')) {
          return { error: new Error('Please enter a valid email address') }
        } else if (error.message?.includes('Password')) {
          return { error: new Error('Password must be at least 6 characters long') }
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          return { error: new Error('Network error. Please check your connection and try again.') }
        }
        return { error }
      }

      if (!data.user) {
        return { error: new Error('Failed to create user account') }
      }

      // Wait longer for the auth user to be fully committed to the database
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Try multiple approaches to create the user profile
      let profileCreated = false
      let lastError = null

      // Approach 1: Try direct insertion
      try {
        const { error: profileError } = await supabase!
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email!,
              user_type: userType,
              full_name: userData?.full_name,
              company_name: userData?.company_name,
              website: userData?.website,
              phone: userData?.phone,
              location: userData?.location,
              bio: userData?.bio,
              is_verified: false,
              is_active: true,
              subscription_tier: 'free',
              subscription_status: 'active'
            }
          ])

        if (!profileError) {
          profileCreated = true
          console.log('User profile created successfully via direct insertion')
        } else {
          lastError = profileError
          console.error('Direct insertion failed:', profileError)
        }
      } catch (e) {
        lastError = e
        console.error('Direct insertion exception:', e)
      }

      // Approach 2: Check if profile already exists
      if (!profileCreated) {
        try {
          const { data: existingProfile, error: checkError } = await supabase!
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          if (existingProfile && !checkError) {
            profileCreated = true
            console.log('User profile already exists, proceeding with signup')
          }
        } catch (e) {
          console.error('Profile check failed:', e)
        }
      }

      // Approach 3: Try API route as last resort
      if (!profileCreated) {
        try {
          const response = await fetch('/api/create-user-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: data.user.id,
              email: data.user.email,
              userType: userType,
              userData: userData
            })
          })

          if (response.ok) {
            profileCreated = true
            console.log('User profile created successfully via API')
          } else {
            console.error('API creation failed:', response.statusText)
          }
        } catch (e) {
          console.error('API call failed:', e)
        }
      }

      if (!profileCreated) {
        return { 
          error: new Error(`Failed to create user profile after multiple attempts. Last error: ${lastError?.message || 'Unknown error'}`) 
        }
      }

      console.log('User account and profile created successfully')
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Mock signin for local development
      console.log('🔧 Mock signin:', { email, password })
      
      // Create mock user for any email/password combination
      const mockUser: AppUser = {
        id: 'mock-user-id-' + Date.now(),
        email,
        user_type: 'brand', // Default to brand for demo
        full_name: 'Demo User',
        is_verified: true,
        is_active: true,
        subscription_tier: 'free',
        subscription_status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      setUser(mockUser)
      return { error: null }
    }

    try {
      const { error } = await supabase!.auth.signInWithPassword({
        email,
        password
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Sign out function
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      // Mock signout for local development
      console.log('🔧 Mock signout')
      setUser(null)
      setSession(null)
      return
    }

    try {
      await supabase!.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      // Mock reset password for local development
      console.log('🔧 Mock reset password:', email)
      return { error: null }
    }

    try {
      const { error } = await supabase!.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!isSupabaseConfigured) {
      // Mock update profile for local development
      console.log('🔧 Mock update profile:', updates)
      setUser(prev => prev ? { ...prev, ...updates } : null)
      return { error: null }
    }

    try {
      if (!user) {
        return { error: new Error('No user logged in') }
      }

      const { error } = await supabase!
        .from('users')
        .update(updates)
        .eq('id', user.id)

      if (error) {
        return { error }
      }

      // Update local user state
      setUser(prev => prev ? { ...prev, ...updates } : null)

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    if (!isSupabaseConfigured) {
      console.log('🔧 Mock refresh user')
      return
    }

    try {
      const { data: { user: authUser } } = await supabase!.auth.getUser()
      if (authUser) {
        await fetchUserProfile(authUser)
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// =====================================================
// HOOKS
// =====================================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}

export function useRequireRole(allowedRoles: UserType[], redirectTo = '/unauthorized') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && !allowedRoles.includes(user.user_type)) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo, allowedRoles])

  return { user, loading }
}

// =====================================================
// AUTHENTICATION UTILITIES
// =====================================================

export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: (user: AppUser | null) => !!user,

  // Check if user has specific role
  hasRole: (user: AppUser | null, role: UserType) => user?.user_type === role,

  // Check if user has any of the specified roles
  hasAnyRole: (user: AppUser | null, roles: UserType[]) => 
    user ? roles.includes(user.user_type) : false,

  // Check if user is verified
  isVerified: (user: AppUser | null) => user?.is_verified || false,

  // Check if user has active subscription
  hasActiveSubscription: (user: AppUser | null) => 
    user?.subscription_status === 'active',

  // Get user's subscription tier
  getSubscriptionTier: (user: AppUser | null) => user?.subscription_tier || 'free',

  // Check if user can access premium features
  canAccessPremium: (user: AppUser | null) => {
    if (!user) return false
    return user.subscription_status === 'active' && 
           ['creator_pro', 'brand_starter', 'brand_pro', 'enterprise'].includes(user.subscription_tier)
  }
} 