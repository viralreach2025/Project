// Test script to debug Supabase storage uploads
// Run this in your browser console on any page

// First, let's test the Supabase connection
async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
    return false;
  }
}

// Test storage bucket access
async function testStorageBucket() {
  console.log('🔍 Testing storage bucket access...');
  
  try {
    // Test if we can list files in the bucket
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .list('', { limit: 1 });
    
    if (error) {
      console.error('❌ Storage bucket access failed:', error);
      return false;
    }
    
    console.log('✅ Storage bucket access successful');
    console.log('📁 Bucket contents:', data);
    return true;
  } catch (err) {
    console.error('❌ Storage bucket error:', err);
    return false;
  }
}

// Test file upload
async function testFileUpload() {
  console.log('🔍 Testing file upload...');
  
  try {
    // Create a simple test file
    const testContent = 'Hello, this is a test file!';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
    
    const filePath = `test/${Date.now()}-test.txt`;
    
    console.log('📤 Uploading test file:', filePath);
    
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .upload(filePath, testFile, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('❌ File upload failed:', error);
      return false;
    }
    
    console.log('✅ File upload successful:', data);
    
    // Test getting public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);
    
    console.log('🔗 Public URL:', publicUrl);
    
    // Clean up - delete the test file
    await supabase.storage
      .from('portfolio-media')
      .remove([filePath]);
    
    console.log('🧹 Test file cleaned up');
    return true;
  } catch (err) {
    console.error('❌ File upload error:', err);
    return false;
  }
}

// Test image upload specifically
async function testImageUpload() {
  console.log('🔍 Testing image upload...');
  
  try {
    // Create a simple test image (1x1 pixel PNG)
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 1, 1);
    
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error('❌ Failed to create test image blob');
        return false;
      }
      
      const testFile = new File([blob], 'test.png', { type: 'image/png' });
      const filePath = `test/${Date.now()}-test.png`;
      
      console.log('📤 Uploading test image:', filePath);
      
      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, testFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('❌ Image upload failed:', error);
        return false;
      }
      
      console.log('✅ Image upload successful:', data);
      
      // Test getting public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);
      
      console.log('🔗 Image public URL:', publicUrl);
      
      // Clean up
      await supabase.storage
        .from('portfolio-media')
        .remove([filePath]);
      
      console.log('🧹 Test image cleaned up');
      return true;
    }, 'image/png');
    
  } catch (err) {
    console.error('❌ Image upload error:', err);
    return false;
  }
}

// Comprehensive test function
async function runAllTests() {
  console.log('🚀 Starting comprehensive Supabase storage tests...\n');
  
  const results = {
    connection: await testSupabaseConnection(),
    bucket: await testStorageBucket(),
    fileUpload: await testFileUpload(),
    imageUpload: await testImageUpload()
  };
  
  console.log('\n📊 Test Results:');
  console.log('Connection:', results.connection ? '✅ PASS' : '❌ FAIL');
  console.log('Bucket Access:', results.bucket ? '✅ PASS' : '❌ FAIL');
  console.log('File Upload:', results.fileUpload ? '✅ PASS' : '❌ FAIL');
  console.log('Image Upload:', results.imageUpload ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! Your Supabase storage is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Check the errors above for troubleshooting.');
  }
  
  return results;
}

// Quick diagnostic function
async function quickDiagnostic() {
  console.log('🔍 Quick diagnostic...');
  
  // Check if supabase is available
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase client not found. Make sure you\'re on a page that loads the Supabase client.');
    return;
  }
  
  // Check environment variables
  console.log('🔧 Checking environment variables...');
  console.log('Supabase URL:', supabase.supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('Supabase Key:', supabase.supabaseKey ? '✅ Set' : '❌ Missing');
  
  // Test basic connection
  const { data, error } = await supabase.from('profiles').select('count').limit(1);
  
  if (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 This might indicate:');
    console.log('   - Incorrect environment variables');
    console.log('   - Network connectivity issues');
    console.log('   - Supabase project is down');
  } else {
    console.log('✅ Database connection successful');
  }
  
  // Test storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from('portfolio-media')
    .list('', { limit: 1 });
  
  if (storageError) {
    console.error('❌ Storage access failed:', storageError.message);
    console.log('💡 This might indicate:');
    console.log('   - portfolio-media bucket doesn\'t exist');
    console.log('   - Storage policies are too restrictive');
    console.log('   - Storage is not enabled in your project');
  } else {
    console.log('✅ Storage access successful');
  }
}

// Export functions for easy access
window.testSupabaseConnection = testSupabaseConnection;
window.testStorageBucket = testStorageBucket;
window.testFileUpload = testFileUpload;
window.testImageUpload = testImageUpload;
window.runAllTests = runAllTests;
window.quickDiagnostic = quickDiagnostic;

console.log('🧪 Supabase storage test functions loaded!');
console.log('Available functions:');
console.log('- quickDiagnostic() - Quick check of your setup');
console.log('- runAllTests() - Comprehensive test suite');
console.log('- testSupabaseConnection() - Test database connection');
console.log('- testStorageBucket() - Test storage bucket access');
console.log('- testFileUpload() - Test file upload');
console.log('- testImageUpload() - Test image upload');

// Auto-run quick diagnostic
quickDiagnostic(); 