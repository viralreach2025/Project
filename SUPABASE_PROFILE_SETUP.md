# Supabase Profile Integration Setup

## 1. Database Setup

Run the SQL commands from `create-profiles-table.sql` in your Supabase SQL editor to create the necessary tables:

```sql
-- Copy and paste the contents of create-profiles-table.sql
```

## 2. Storage Setup

Create a storage bucket for portfolio media:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket called `portfolio-media`
4. Set the bucket to public (for now, you can make it private later with proper authentication)
5. Set up storage policies:

```sql
-- Allow public read access to portfolio media
CREATE POLICY "Portfolio media is publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'portfolio-media');

-- Allow authenticated users to upload their own media
CREATE POLICY "Users can upload their own portfolio media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'portfolio-media' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to update their own media
CREATE POLICY "Users can update their own portfolio media" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'portfolio-media' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to delete their own media
CREATE POLICY "Users can delete their own portfolio media" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'portfolio-media' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
```

## 3. Environment Variables

Make sure you have these environment variables set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. Features

The profile editor now includes:

- **Profile Management**: Save/load profile data from Supabase
- **Portfolio Management**: Upload images and videos to Supabase storage
- **Real-time Updates**: Changes are saved to the database
- **File Upload**: Drag-and-drop upload with progress indicators
- **Video Compression**: Client-side video compression before upload
- **Thumbnail Generation**: Automatic thumbnail generation for videos
- **Edit Mode**: Toggle between view and edit modes
- **Batch Saving**: Save all changes at once with "Save & Publish"

## 5. Usage

1. Navigate to `/creator/[username]` to view a profile
2. Click "Edit Mode" to enable editing
3. Upload media files using drag-and-drop or click-to-upload
4. Edit profile information inline
5. Click "Save & Publish" to save all changes to Supabase

## 6. File Structure

Files are stored in Supabase storage with the following structure:
```
portfolio-media/
├── username/
│   ├── images/
│   │   ├── timestamp-randomid.jpg
│   │   └── ...
│   └── videos/
│       ├── timestamp-randomid.mp4
│       └── ...
```

## 7. Security

- Row Level Security (RLS) is enabled on all tables
- Users can only modify their own profiles and portfolio items
- Storage policies ensure users can only access their own files
- Public read access allows anyone to view profiles and media

## 8. Next Steps

- Add authentication to restrict editing to profile owners
- Implement image optimization and resizing
- Add video transcoding for better compatibility
- Implement caching for better performance
- Add analytics and tracking 