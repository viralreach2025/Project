-- Create profile_customizations table
CREATE TABLE IF NOT EXISTS profile_customizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  layout TEXT NOT NULL DEFAULT 'modern' CHECK (layout IN ('minimal', 'modern', 'creative', 'professional', 'story')),
  theme JSONB NOT NULL DEFAULT '{"primaryColor": "#8B5CF6", "backgroundColor": "#FFFFFF", "textColor": "#1F2937"}',
  display_name TEXT NOT NULL,
  bio TEXT,
  categories TEXT[] DEFAULT '{}',
  location TEXT,
  rate_range JSONB DEFAULT '{"min": 0, "max": 0, "currency": "USD"}',
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profile_customizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile customization" ON profile_customizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile customization" ON profile_customizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile customization" ON profile_customizations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile customization" ON profile_customizations
  FOR DELETE USING (auth.uid() = user_id);

-- Public read access for profile viewing
CREATE POLICY "Public can view profile customizations" ON profile_customizations
  FOR SELECT USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_profile_customizations_user_id ON profile_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_profile_customizations_username ON profile_customizations(username);
CREATE INDEX IF NOT EXISTS idx_profile_customizations_layout ON profile_customizations(layout);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profile_customizations_updated_at 
  BEFORE UPDATE ON profile_customizations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 