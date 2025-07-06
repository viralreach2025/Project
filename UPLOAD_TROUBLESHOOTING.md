# Profile Picture Upload Troubleshooting Guide

## Quick Fix Steps

### 1. Create Storage Bucket
1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Set:
   - **Name**: `portfolio-media`
   - **Public bucket**: ✅ **Enable**
   - **File size limit**: `50 MB`
   - **Allowed MIME types**: `image/*,video/*`

### 2. Set Storage Policies
Run this SQL in your Supabase SQL Editor:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow user updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow user deletes" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio media is publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations for portfolio-media" ON storage.objects;

-- Create permissive policy for development
CREATE POLICY "Allow all operations for portfolio-media" ON storage.objects 
FOR ALL USING (bucket_id = 'portfolio-media');
```

### 3. Check Environment Variables
Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Test the Setup
1. Open your browser console on any page
2. Copy and paste the contents of `test-upload.js`
3. Run `quickDiagnostic()` to check your setup
4. Run `runAllTests()` for comprehensive testing

## Common Error Messages and Solutions

### "Bucket not found" or 404 errors
**Problem**: The `portfolio-media` bucket doesn't exist
**Solution**: Create the bucket in Supabase Dashboard > Storage

### "403 Forbidden" errors
**Problem**: Storage policies are too restrictive
**Solution**: Run the storage policies SQL script above

### "File too large" errors
**Problem**: File exceeds bucket size limit
**Solution**: 
- Increase bucket file size limit in Supabase Dashboard
- Or compress files before upload

### "Invalid file type" errors
**Problem**: File type not allowed in bucket settings
**Solution**: Update bucket allowed MIME types to include your file types

### "Authentication required" errors
**Problem**: Policies require authentication
**Solution**: Use the permissive policy above for development

### "Network error" or "Connection failed"
**Problem**: Environment variables or network issues
**Solution**:
1. Check `.env.local` file exists and has correct values
2. Restart your development server
3. Check internet connection

## Debug Steps

### Step 1: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try uploading a file
4. Look for error messages

### Step 2: Test Storage Connection
Run this in browser console:

```javascript
// Test storage access
const { data, error } = await supabase.storage
  .from('portfolio-media')
  .list('', { limit: 1 });

console.log('Storage test:', { data, error });
```

### Step 3: Test File Upload
Run this in browser console:

```javascript
// Test file upload
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
const { data, error } = await supabase.storage
  .from('portfolio-media')
  .upload('test/test.txt', testFile);

console.log('Upload test:', { data, error });
```

### Step 4: Check Environment Variables
Run this in browser console:

```javascript
// Check if Supabase is configured
console.log('Supabase URL:', supabase.supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Key:', supabase.supabaseKey ? 'Set' : 'Missing');
```

## File Upload Process

The upload process works as follows:

1. **File Selection**: User selects file(s) via drag-and-drop or file picker
2. **Validation**: File type and size are validated
3. **Storage Upload**: File is uploaded to Supabase storage bucket
4. **URL Generation**: Public URL is generated for the uploaded file
5. **Database Update**: File URL is saved to the database
6. **UI Update**: Profile/gallery is updated with new image

## Expected File Structure

Files are stored in this structure:
```
portfolio-media/
├── username1/
│   ├── images/
│   │   ├── 1234567890-abc123.jpg
│   │   └── 1234567891-def456.png
│   └── videos/
│       ├── 1234567892-ghi789.mp4
│       └── 1234567893-jkl012.webm
└── username2/
    ├── images/
    └── videos/
```

## Still Having Issues?

If you're still experiencing problems:

1. **Check the logs**: Look at browser console and network tab for detailed error messages
2. **Verify setup**: Run the test scripts to identify specific issues
3. **Check Supabase Dashboard**: Verify bucket exists and policies are set correctly
4. **Restart development server**: Sometimes environment variables need a restart to take effect

## Support

If none of the above solutions work, please provide:
1. The exact error message from browser console
2. Your Supabase project URL (without the key)
3. The steps you've already tried
4. Screenshots of your Supabase storage settings 