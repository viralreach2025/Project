import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for your existing data
export interface WaitlistEntry {
  id?: string
  email: string
  user_type: 'brand' | 'creator'
  primary_goal?: string
  biggest_challenge?: string
  current_solution?: string
  budget_range?: string
  timeline?: string
  most_important?: string
  primary_platform?: string
  follower_count?: string
  content_niche?: string
  collaboration_experience?: string
  creator_challenge?: string
  creator_important?: string
  created_at?: string
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  created_at?: string
}

// New types for profile and portfolio
export interface Profile {
  id: string
  username: string
  name: string
  role: string
  location: string
  bio: string
  avatar: string
  headline: string
  social: {
    instagram: string
    tiktok: string
    youtube: string
  }
  gallery: string[]
  created_at: string
  updated_at: string
}

export interface PortfolioItem {
  id: string
  profile_id: string
  title: string
  type: 'image' | 'video'
  file_url: string
  thumbnail_url?: string
  file_size: number
  duration?: number
  order_index: number
  created_at: string
  updated_at: string
} 