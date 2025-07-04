# ViralReach Supabase Integration Setup

This guide will help you set up Supabase to store waitlist quiz results from your ViralReach landing page.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `viralreach-waitlist`
   - Database Password: (choose a secure password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## 2. Set Up the Database Table

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute the SQL

This will create:
- `waitlist_entries` table with all necessary fields
- Indexes for performance
- Row Level Security policies
- Auto-updating timestamps

## 3. Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the following values:
   - `Project URL`
   - `anon/public` key

## 4. Configure Environment Variables

1. Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace the placeholder values with your actual Supabase credentials

## 5. Test the Integration

1. Start your Next.js development server:
```bash
npm run dev
```

2. Navigate to your waitlist form
3. Fill out and submit the form
4. Check your Supabase dashboard under **Table Editor** > **waitlist_entries** to see the new entry

## 6. View Your Data

You can view and analyze your waitlist data in several ways:

### In Supabase Dashboard
- Go to **Table Editor** > **waitlist_entries**
- Use filters to segment by user type (brand vs creator)
- Export data as CSV for analysis

### Sample Queries
```sql
-- Count total entries
SELECT COUNT(*) FROM waitlist_entries;

-- Count by user type
SELECT user_type, COUNT(*) 
FROM waitlist_entries 
GROUP BY user_type;

-- Recent entries
SELECT email, user_type, created_at 
FROM waitlist_entries 
ORDER BY created_at DESC 
LIMIT 10;

-- Brand goals analysis
SELECT primary_goal, COUNT(*) 
FROM waitlist_entries 
WHERE user_type = 'brand' 
GROUP BY primary_goal 
ORDER BY COUNT(*) DESC;

-- Creator platform preferences
SELECT primary_platform, COUNT(*) 
FROM waitlist_entries 
WHERE user_type = 'creator' 
GROUP BY primary_platform 
ORDER BY COUNT(*) DESC;
```

## 7. Data Schema

The `waitlist_entries` table includes:

**Common Fields:**
- `id` - Unique identifier
- `email` - User's email address
- `user_type` - 'brand' or 'creator'
- `created_at` / `updated_at` - Timestamps

**Brand-Specific Fields:**
- `primary_goal` - Brand's marketing goal
- `biggest_challenge` - Current challenge
- `current_solution` - How they currently handle influencer marketing
- `budget_range` - Monthly budget range
- `timeline` - When they want to start
- `most_important` - Most important platform feature

**Creator-Specific Fields:**
- `primary_platform` - Main social platform
- `follower_count` - Follower count range
- `content_niche` - Content category
- `collaboration_experience` - Experience level
- `creator_challenge` - Biggest challenge as creator
- `creator_important` - Most important platform feature

## 8. Security Notes

- Row Level Security (RLS) is enabled
- Public users can only INSERT data (submit forms)
- Only authenticated users can read data (for admin access)
- All data is encrypted at rest in Supabase

## 9. Next Steps

- Set up email notifications for new waitlist entries
- Create an admin dashboard to view and export data
- Set up analytics and reporting
- Consider adding email validation and duplicate prevention

## Troubleshooting

**"ReferenceError: process is not defined"**
- Make sure your environment variables start with `NEXT_PUBLIC_`

**"Insert failed"**
- Check your RLS policies in Supabase
- Verify your API keys are correct
- Check the browser console for detailed error messages

**Form submits but no data appears**
- Verify your table name matches `waitlist_entries`
- Check the Supabase logs in your dashboard 