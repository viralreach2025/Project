-- ViralReach Contact Form Table Setup
-- Run this SQL in your Supabase SQL editor to create the contact submissions table

-- Create contact submissions table
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

-- Create indexes for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_subject ON contact_submissions(subject);

-- Create updated_at trigger (reuse existing function)
CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
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

-- Verify the table was created successfully
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
ORDER BY ordinal_position; 