import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for our waitlist data
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

// Type definitions for contact form data
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  created_at?: string
} 