# Supabase Storage Setup for Media Uploads

## Quick Fix - Complete Setup Script

Run this SQL script in your Supabase SQL Editor to set up everything needed for uploads:

```sql
-- 1. Create the storage bucket (if it doesn't exist)
-- Note: You need to create this manually in the Supabase Dashboard first
-- Go to Storage > Create bucket > Name: portfolio-media > Public: Yes

-- 2. Drop all existing storage policies to start fresh
DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow user updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow user deletes" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio media is publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own portfolio media" ON storage.objects;

-- 3. Create a simple policy that allows all operations for development
CREATE POLICY "Allow all operations for portfolio-media" ON storage.objects 
FOR ALL USING (bucket_id = 'portfolio-media');

-- 4. Alternative: More restrictive policy for production
-- CREATE POLICY "Allow public read" ON storage.objects 
-- FOR SELECT USING (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow authenticated uploads" ON storage.objects 
-- FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow user updates" ON storage.objects 
-- FOR UPDATE USING (bucket_id = 'portfolio-media');

-- CREATE POLICY "Allow user deletes" ON storage.objects 
-- FOR DELETE USING (bucket_id = 'portfolio-media');
```

## Step-by-Step Setup

### 1. Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Set the following:
   - **Name**: `portfolio-media`
   - **Public bucket**: ✅ **Enable** (this allows public access to uploaded files)
   - **File size limit**: `50 MB` (or your preferred limit)
   - **Allowed MIME types**: `image/*,video/*`

### 2. Set Storage Policies

Run the SQL script above in your Supabase SQL Editor.

### 3. Verify Environment Variables

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Test the Setup

Add this test function to your browser console on any page:

```javascript
// Test Supabase storage connection
async function testStorage() {
  console.log('🔍 Testing Supabase storage...');
  
  try {
    // Test 1: Check if bucket exists
    const { data: bucketData, error: bucketError } = await supabase.storage
      .from('portfolio-media')
      .list('', { limit: 1 });
    
    if (bucketError) {
      console.error('❌ Bucket access failed:', bucketError);
      return false;
    }
    
    console.log('✅ Bucket access successful');
    
    // Test 2: Try to upload a small test file
    const testContent = 'Hello, this is a test file!';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(`test/${Date.now()}-test.txt`, testFile);
    
    if (uploadError) {
      console.error('❌ Upload failed:', uploadError);
      return false;
    }
    
    console.log('✅ Upload successful:', uploadData);
    
    // Test 3: Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(`test/${Date.now()}-test.txt`);
    
    console.log('✅ Public URL generated:', publicUrl);
    
    // Clean up test file
    await supabase.storage
      .from('portfolio-media')
      .remove([`test/${Date.now()}-test.txt`]);
    
    console.log('✅ Storage test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Storage test failed:', error);
    return false;
  }
}

// Run the test
testStorage();
```

## Troubleshooting Common Issues

### Issue 1: "Bucket not found" or 404 errors
**Solution**: Create the `portfolio-media` bucket in Supabase Dashboard

### Issue 2: "403 Forbidden" errors
**Solution**: Run the storage policies SQL script above

### Issue 3: "File too large" errors
**Solution**: Increase the bucket file size limit or compress files before upload

### Issue 4: "Invalid file type" errors
**Solution**: Check that your bucket allows the file types you're uploading

### Issue 5: Environment variables not working
**Solution**: 
1. Make sure `.env.local` is in your project root
2. Restart your development server
3. Check that the variables are correctly named

### Issue 6: Authentication errors
**Solution**: For development, use the "Allow all operations" policy above

## Debug Upload Process

Add this to your browser console to debug uploads:

```javascript
// Debug upload function
async function debugUpload(file) {
  console.log('🔍 Debugging upload for:', file.name);
  console.log('File size:', file.size);
  console.log('File type:', file.type);
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
  const filePath = `debug/${fileName}`;
  
  console.log('Upload path:', filePath);
  
  try {
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .upload(filePath, file);
    
    if (error) {
      console.error('❌ Upload error:', error);
      return null;
    }
    
    console.log('✅ Upload successful:', data);
    
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);
    
    console.log('🔗 Public URL:', publicUrl);
    return publicUrl;
    
  } catch (err) {
    console.error('❌ Upload exception:', err);
    return null;
  }
}
```

## File Structure

Uploaded files will be organized as:
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

This structure allows each user to have their own organized media files. 