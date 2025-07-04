// =====================================================
// DATABASE TYPES FOR INFLUENCER MARKETING SAAS
// =====================================================

// =====================================================
// CORE USER TYPES
// =====================================================

export type UserType = 'brand' | 'creator' | 'admin'
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'unpaid'
export type SubscriptionTier = 'free' | 'creator_pro' | 'brand_starter' | 'brand_pro' | 'enterprise'

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  user_type: UserType
  company_name?: string
  website?: string
  phone?: string
  location?: string
  bio?: string
  is_verified: boolean
  is_active: boolean
  subscription_tier: SubscriptionTier
  subscription_status: SubscriptionStatus
  created_at: string
  updated_at: string
}

// =====================================================
// CREATOR TYPES
// =====================================================

export type ContentType = 'post' | 'story' | 'video' | 'reel' | 'tiktok' | 'youtube'
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin'
export type AvailabilityStatus = 'available' | 'busy' | 'unavailable'
export type VerificationStatus = 'pending' | 'verified' | 'rejected'

export interface CreatorProfile {
  id: string
  user_id: string
  niche: string[]
  content_type: ContentType[]
  follower_count: Record<Platform, number>
  engagement_rate: number
  average_views: number
  average_likes: number
  average_comments: number
  audience_demographics: {
    age_groups: Record<string, number>
    locations: Record<string, number>
    interests: string[]
  }
  collaboration_experience: string
  portfolio_urls: string[]
  rate_range: {
    min: number
    max: number
    currency: string
  }
  availability_status: AvailabilityStatus
  verification_status: VerificationStatus
  created_at: string
  updated_at: string
}

export interface CreatorSocialAccount {
  id: string
  creator_id: string
  platform: Platform
  username: string
  follower_count: number
  engagement_rate: number
  is_verified: boolean
  last_synced?: string
  created_at: string
}

// =====================================================
// BRAND TYPES
// =====================================================

export interface BrandProfile {
  id: string
  user_id: string
  industry: string
  company_size: string
  target_audience: {
    age_range: [number, number]
    interests: string[]
    locations: string[]
    gender?: string
  }
  previous_campaigns: number
  total_spent: number
  verification_status: VerificationStatus
  created_at: string
  updated_at: string
}

// =====================================================
// CAMPAIGN TYPES
// =====================================================

export type CampaignType = 'awareness' | 'engagement' | 'sales' | 'launch' | 'product_review'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'

export interface Campaign {
  id: string
  brand_id: string
  title: string
  description?: string
  campaign_type: CampaignType
  goals: {
    primary_goal: string
    kpis: string[]
    target_metrics?: Record<string, number>
  }
  target_audience: {
    age_range: [number, number]
    interests: string[]
    locations: string[]
    gender?: string
    platforms?: Platform[]
  }
  content_requirements: string
  deliverables: {
    posts: number
    stories: number
    videos: number
    reels?: number
    tiktoks?: number
  }
  budget_range: {
    min: number
    max: number
    currency: string
  }
  timeline: {
    start_date: string
    end_date: string
  }
  status: CampaignStatus
  is_featured: boolean
  application_deadline?: string
  created_at: string
  updated_at: string
}

export interface CampaignRequirement {
  id: string
  campaign_id: string
  requirement_type: string
  requirement_value: any
  is_required: boolean
  created_at: string
}

// =====================================================
// APPLICATION & COLLABORATION TYPES
// =====================================================

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn'
export type CollaborationStatus = 'active' | 'in_progress' | 'completed' | 'cancelled'

export interface Application {
  id: string
  campaign_id: string
  creator_id: string
  proposal?: string
  proposed_rate?: number
  portfolio_samples?: string[]
  status: ApplicationStatus
  brand_notes?: string
  creator_notes?: string
  created_at: string
  updated_at: string
}

export interface Collaboration {
  id: string
  application_id: string
  campaign_id: string
  creator_id: string
  brand_id: string
  agreed_rate: number
  deliverables: {
    posts: number
    stories: number
    videos: number
    reels?: number
    tiktoks?: number
  }
  timeline: {
    start_date: string
    end_date: string
  }
  status: CollaborationStatus
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

// =====================================================
// CONTENT TYPES
// =====================================================

export type ContentSubmissionStatus = 'submitted' | 'under_review' | 'approved' | 'revision_requested' | 'published'

export interface ContentSubmission {
  id: string
  collaboration_id: string
  content_type: ContentType
  platform: Platform
  content_url?: string
  content_file_url?: string
  caption?: string
  status: ContentSubmissionStatus
  brand_feedback?: string
  creator_notes?: string
  published_at?: string
  created_at: string
  updated_at: string
}

// =====================================================
// ANALYTICS TYPES
// =====================================================

export interface PerformanceMetrics {
  id: string
  content_submission_id: string
  collaboration_id: string
  platform: Platform
  metrics: {
    views: number
    likes: number
    comments: number
    shares: number
    clicks: number
    saves?: number
    reach?: number
    impressions?: number
  }
  engagement_rate: number
  reach: number
  impressions: number
  date_recorded: string
  created_at: string
}

// =====================================================
// PAYMENT TYPES
// =====================================================

export type PaymentType = 'escrow' | 'release' | 'refund'
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'

export interface Payment {
  id: string
  collaboration_id: string
  amount: number
  currency: string
  payment_type: PaymentType
  status: PaymentStatus
  stripe_payment_intent_id?: string
  platform_fee: number
  creator_amount: number
  payment_date?: string
  created_at: string
}

// =====================================================
// MESSAGING TYPES
// =====================================================

export type MessageType = 'text' | 'file' | 'system'

export interface Message {
  id: string
  collaboration_id: string
  sender_id: string
  message_type: MessageType
  content?: string
  file_url?: string
  is_read: boolean
  created_at: string
}

// =====================================================
// NOTIFICATION TYPES
// =====================================================

export interface Notification {
  id: string
  user_id: string
  notification_type: string
  title: string
  message: string
  related_entity_type?: string
  related_entity_id?: string
  is_read: boolean
  created_at: string
}

// =====================================================
// SUBSCRIPTION TYPES
// =====================================================

export type BillingCycle = 'monthly' | 'yearly'

export interface SubscriptionPlan {
  id: string
  name: string
  description?: string
  price: number
  currency: string
  billing_cycle: BillingCycle
  features: Record<string, any>
  is_active: boolean
  created_at: string
}

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: string
  stripe_subscription_id?: string
  status: SubscriptionStatus
  current_period_start?: string
  current_period_end?: string
  created_at: string
  updated_at: string
}

// =====================================================
// FORM TYPES
// =====================================================

export interface WaitlistEntry {
  id?: string
  email: string
  user_type: UserType
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

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// =====================================================
// DASHBOARD TYPES
// =====================================================

export interface DashboardStats {
  total_campaigns: number
  active_campaigns: number
  total_applications: number
  pending_applications: number
  total_earnings: number
  total_spent: number
  active_collaborations: number
  completed_collaborations: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
  }[]
}

// =====================================================
// SEARCH & FILTER TYPES
// =====================================================

export interface SearchFilters {
  platforms?: Platform[]
  niches?: string[]
  follower_range?: [number, number]
  engagement_rate_min?: number
  budget_range?: [number, number]
  campaign_types?: CampaignType[]
  status?: CampaignStatus
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
} 