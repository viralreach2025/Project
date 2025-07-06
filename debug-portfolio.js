// Debug script to check portfolio data
// Run this in your browser console on your profile page

async function debugPortfolio() {
  console.log('🔍 Debugging portfolio data...');
  
  try {
    // Check if we're on a profile page
    const username = window.location.pathname.split('/').pop();
    console.log('Current username:', username);
    
    // Check if supabase is available
    if (typeof supabase === 'undefined') {
      console.error('❌ Supabase client not found');
      return;
    }
    
    // Check profile data
    console.log('📋 Checking profile data...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    
    if (profileError) {
      console.error('❌ Profile error:', profileError);
    } else {
      console.log('✅ Profile found:', profileData);
    }
    
    // Check portfolio items
    console.log('🖼️ Checking portfolio items...');
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('profile_id', username)
      .order('order_index', { ascending: true });
    
    if (portfolioError) {
      console.error('❌ Portfolio error:', portfolioError);
    } else {
      console.log('✅ Portfolio items found:', portfolioData);
      console.log('📊 Total portfolio items:', portfolioData?.length || 0);
      
      if (portfolioData && portfolioData.length > 0) {
        console.log('📝 Portfolio items:');
        portfolioData.forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.title} (${item.type}) - ${item.file_url}`);
        });
      } else {
        console.log('📭 No portfolio items found in database');
      }
    }
    
    // Check storage bucket
    console.log('🗂️ Checking storage bucket...');
    const { data: storageData, error: storageError } = await supabase.storage
      .from('portfolio-media')
      .list(username || '', { limit: 10 });
    
    if (storageError) {
      console.error('❌ Storage error:', storageError);
    } else {
      console.log('✅ Storage files found:', storageData);
      console.log('📊 Total storage files:', storageData?.length || 0);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

// Export function
window.debugPortfolio = debugPortfolio;

console.log('🧪 Portfolio debug script loaded!');
console.log('Run debugPortfolio() to check your portfolio data'); 