-- ViralReach Waitlist Entries Table
-- Run this SQL in your Supabase SQL editor to create the table

CREATE TABLE waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('brand', 'creator')),
  
  -- Brand-specific fields
  primary_goal VARCHAR(100),
  biggest_challenge VARCHAR(100),
  current_solution VARCHAR(100),
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  most_important VARCHAR(100),
  
  -- Creator-specific fields
  primary_platform VARCHAR(50),
  follower_count VARCHAR(50),
  content_niche VARCHAR(100),
  collaboration_experience VARCHAR(50),
  creator_challenge VARCHAR(100),
  creator_important VARCHAR(100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_waitlist_entries_user_type ON waitlist_entries(user_type);
CREATE INDEX idx_waitlist_entries_created_at ON waitlist_entries(created_at);
CREATE INDEX idx_waitlist_entries_email ON waitlist_entries(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_entries_updated_at 
  BEFORE UPDATE ON waitlist_entries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for all users (for the waitlist form)
CREATE POLICY "Allow insert access for all users" ON waitlist_entries
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow read access for authenticated users (for admin dashboard)
CREATE POLICY "Allow read access for authenticated users" ON waitlist_entries
  FOR SELECT 
  TO authenticated
  USING (true);

-- ViralReach Contact Form Table
-- Contact form submissions

CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact submissions
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Create updated_at trigger for contact submissions
CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security for contact submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for all users (for the contact form)
CREATE POLICY "Allow insert access for all users" ON contact_submissions
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow read access for authenticated users (for admin dashboard)
CREATE POLICY "Allow read access for authenticated users" ON contact_submissions
  FOR SELECT 
  TO authenticated
  USING (true); 