'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { User as AppUser, UserType } from './types'

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

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        await fetchUserProfile(session.user)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
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
  }, [])

  // Fetch user profile from our users table
  const fetchUserProfile = async (authUser: User) => {
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
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            ...userData
          }
        }
      })

      if (error) {
        return { error }
      }

      // Create user profile in our users table
      if (data.user) {
        const { error: profileError } = await supabase
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
              bio: userData?.bio
            }
          ])

        if (profileError) {
          console.error('Error creating user profile:', profileError)
          return { error: profileError }
        }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
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
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<AppUser>) => {
    try {
      if (!user) {
        return { error: new Error('No user logged in') }
      }

      const { error } = await supabase
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
    if (session?.user) {
      await fetchUserProfile(session.user)
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
// AUTHENTICATION HOOK
// =====================================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// =====================================================
// PROTECTED ROUTE HOOK
// =====================================================

export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = redirectTo
    }
  }, [user, loading, redirectTo])

  return { user, loading }
}

// =====================================================
// ROLE-BASED ACCESS HOOK
// =====================================================

export function useRequireRole(allowedRoles: UserType[], redirectTo = '/unauthorized') {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user && !allowedRoles.includes(user.user_type)) {
      window.location.href = redirectTo
    }
  }, [user, loading, allowedRoles, redirectTo])

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