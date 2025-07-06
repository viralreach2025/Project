-- =====================================================
-- INFLUENCER MARKETING SAAS DATABASE SCHEMA
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- WAITLIST & CONTACT FORMS
-- =====================================================

-- Waitlist entries table
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    user_type TEXT CHECK (user_type IN ('brand', 'creator')) NOT NULL,
    primary_goal TEXT,
    biggest_challenge TEXT,
    current_solution TEXT,
    budget_range TEXT,
    timeline TEXT,
    most_important TEXT,
    primary_platform TEXT,
    follower_count TEXT,
    content_niche TEXT,
    collaboration_experience TEXT,
    creator_challenge TEXT,
    creator_important TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    user_type TEXT CHECK (user_type IN ('brand', 'creator', 'admin')) NOT NULL,
    company_name TEXT,
    website TEXT,
    phone TEXT,
    location TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    subscription_tier TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATOR PROFILES
-- =====================================================

-- Creator profiles table
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    niche TEXT[],
    content_type TEXT[],
    follower_count JSONB, -- {instagram: 10000, tiktok: 5000, youtube: 2000}
    engagement_rate DECIMAL(5,2),
    average_views INTEGER,
    average_likes INTEGER,
    average_comments INTEGER,
    audience_demographics JSONB, -- {age_groups: {...}, locations: {...}, interests: {...}}
    collaboration_experience TEXT,
    portfolio_urls TEXT[],
    rate_range JSONB, -- {min: 100, max: 1000, currency: 'USD'}
    availability_status TEXT DEFAULT 'available',
    verification_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator social accounts
CREATE TABLE IF NOT EXISTS public.creator_social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    username TEXT NOT NULL,
    follower_count INTEGER,
    engagement_rate DECIMAL(5,2),
    is_verified BOOLEAN DEFAULT FALSE,
    last_synced TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BRAND PROFILES
-- =====================================================

-- Brand profiles table
CREATE TABLE IF NOT EXISTS public.brand_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    industry TEXT,
    company_size TEXT,
    target_audience JSONB,
    previous_campaigns INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    verification_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CAMPAIGNS
-- =====================================================

-- Campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    campaign_type TEXT CHECK (campaign_type IN ('awareness', 'engagement', 'sales', 'launch', 'product_review')) NOT NULL,
    goals JSONB, -- {primary_goal: 'brand_awareness', kpis: ['reach', 'engagement']}
    target_audience JSONB, -- {age_range: [18, 35], interests: [...], locations: [...]}
    content_requirements TEXT,
    deliverables JSONB, -- {posts: 3, stories: 5, videos: 1}
    budget_range JSONB, -- {min: 1000, max: 5000, currency: 'USD'}
    timeline JSONB, -- {start_date: '2024-01-01', end_date: '2024-01-31'}
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
    is_featured BOOLEAN DEFAULT FALSE,
    application_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign requirements
CREATE TABLE IF NOT EXISTS public.campaign_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    requirement_type TEXT NOT NULL, -- 'content_type', 'platform', 'audience_size', etc.
    requirement_value JSONB,
    is_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- APPLICATIONS & COLLABORATIONS
-- =====================================================

-- Applications table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    proposal TEXT,
    proposed_rate DECIMAL(10,2),
    portfolio_samples TEXT[],
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
    brand_notes TEXT,
    creator_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, creator_id)
);

-- Collaborations table (approved applications become collaborations)
CREATE TABLE IF NOT EXISTS public.collaborations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
    agreed_rate DECIMAL(10,2),
    deliverables JSONB,
    timeline JSONB,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'in_progress', 'completed', 'cancelled')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CONTENT MANAGEMENT
-- =====================================================

-- Content submissions table
CREATE TABLE IF NOT EXISTS public.content_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL, -- 'post', 'story', 'video', 'reel'
    platform TEXT NOT NULL,
    content_url TEXT,
    content_file_url TEXT,
    caption TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'revision_requested', 'published')),
    brand_feedback TEXT,
    creator_notes TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ANALYTICS & PERFORMANCE
-- =====================================================

-- Performance metrics table
CREATE TABLE IF NOT EXISTS public.performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_submission_id UUID REFERENCES public.content_submissions(id) ON DELETE CASCADE,
    collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    metrics JSONB, -- {views: 1000, likes: 100, comments: 20, shares: 5, clicks: 50}
    engagement_rate DECIMAL(5,2),
    reach INTEGER,
    impressions INTEGER,
    date_recorded DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PAYMENTS & BILLING
-- =====================================================

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_type TEXT CHECK (payment_type IN ('escrow', 'release', 'refund')) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    stripe_payment_intent_id TEXT,
    platform_fee DECIMAL(10,2) DEFAULT 0,
    creator_amount DECIMAL(10,2),
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MESSAGING & COMMUNICATION
-- =====================================================

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
    content TEXT,
    file_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_entity_type TEXT, -- 'campaign', 'application', 'collaboration', etc.
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIPTIONS & BILLING
-- =====================================================

-- Subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')) NOT NULL,
    features JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.subscription_plans(id),
    stripe_subscription_id TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON public.users(subscription_status);

-- Creator profiles indexes
CREATE INDEX IF NOT EXISTS idx_creator_profiles_user_id ON public.creator_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_niche ON public.creator_profiles USING GIN(niche);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_availability ON public.creator_profiles(availability_status);

-- Campaigns indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_brand_id ON public.campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_campaign_type ON public.campaigns(campaign_type);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON public.campaigns(created_at);

-- Applications indexes
CREATE INDEX IF NOT EXISTS idx_applications_campaign_id ON public.applications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_applications_creator_id ON public.applications(creator_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- Collaborations indexes
CREATE INDEX IF NOT EXISTS idx_collaborations_campaign_id ON public.collaborations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_collaborations_creator_id ON public.collaborations(creator_id);
CREATE INDEX IF NOT EXISTS idx_collaborations_status ON public.collaborations(status);

-- Content submissions indexes
CREATE INDEX IF NOT EXISTS idx_content_submissions_collaboration_id ON public.content_submissions(collaboration_id);
CREATE INDEX IF NOT EXISTS idx_content_submissions_status ON public.content_submissions(status);

-- Performance metrics indexes
CREATE INDEX IF NOT EXISTS idx_performance_metrics_content_submission_id ON public.performance_metrics(content_submission_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date_recorded ON public.performance_metrics(date_recorded);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_collaboration_id ON public.messages(collaboration_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Creator profiles policies
CREATE POLICY "Creators can view their own profile" ON public.creator_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Creators can update their own profile" ON public.creator_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Brands can view creator profiles" ON public.creator_profiles
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type = 'brand'
    ));

-- Campaigns policies
CREATE POLICY "Brands can view their own campaigns" ON public.campaigns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.brand_profiles 
            WHERE id = brand_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Brands can create campaigns" ON public.campaigns
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.brand_profiles 
            WHERE id = brand_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Creators can view active campaigns" ON public.campaigns
    FOR SELECT USING (
        status = 'active' AND 
        EXISTS (
            SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type = 'creator'
        )
    );

-- Applications policies
CREATE POLICY "Creators can view their applications" ON public.applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.creator_profiles 
            WHERE id = creator_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Brands can view applications for their campaigns" ON public.applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.campaigns c
            JOIN public.brand_profiles b ON c.brand_id = b.id
            WHERE c.id = campaign_id AND b.user_id = auth.uid()
        )
    );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creator_profiles_updated_at BEFORE UPDATE ON public.creator_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_profiles_updated_at BEFORE UPDATE ON public.brand_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collaborations_updated_at BEFORE UPDATE ON public.collaborations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_submissions_updated_at BEFORE UPDATE ON public.content_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample subscription plans
INSERT INTO public.subscription_plans (name, description, price, billing_cycle, features) VALUES
('Free', 'Basic access for creators', 0, 'monthly', '{"max_applications": 5, "basic_analytics": true}'),
('Creator Pro', 'Enhanced features for creators', 19, 'monthly', '{"max_applications": 50, "priority_matching": true, "advanced_analytics": true}'),
('Brand Starter', 'Essential features for brands', 99, 'monthly', '{"max_campaigns": 5, "basic_analytics": true}'),
('Brand Pro', 'Advanced features for brands', 299, 'monthly', '{"max_campaigns": 50, "ai_matching": true, "advanced_analytics": true}'),
('Enterprise', 'Custom solutions for large brands', 999, 'monthly', '{"unlimited_campaigns": true, "dedicated_support": true, "custom_integrations": true}');

-- =====================================================
-- END OF SCHEMA
-- ===================================================== 