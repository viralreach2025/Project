import { supabase, WaitlistEntry, ContactSubmission } from './supabase'

export async function saveWaitlistEntry(data: Omit<WaitlistEntry, 'id' | 'created_at'>) {
  try {
    // First check if email already exists (normalize email to lowercase)
    const normalizedEmail = data.email.toLowerCase().trim()
    console.log('🔍 Checking for existing email:', normalizedEmail)
    
    const { data: existingEntries, error: checkError } = await supabase
      .from('waitlist_entries')
      .select('email, id, created_at')
      .eq('email', normalizedEmail)  // Use simple eq without single()

    console.log('🔍 Database check result:', { existingEntries, checkError: checkError?.code })

    if (checkError) {
      console.error('❌ Error checking existing entry:', checkError)
      return { success: false, error: checkError }
    }

    if (existingEntries && existingEntries.length > 0) {
      // Email already exists
      console.log('⚠️ DUPLICATE EMAIL DETECTED:', existingEntries[0])
      return { 
        success: true, 
        data: null, 
        alreadyExists: true,
        message: "You're already on our waitlist! We'll notify you when we launch." 
      }
    }

    console.log('✅ New email - proceeding with insert')

    // Email doesn't exist, proceed with insertion
    const { data: result, error } = await supabase
      .from('waitlist_entries')
      .insert([
        {
          email: normalizedEmail,  // Store normalized email
          user_type: data.user_type,
          primary_goal: data.primary_goal,
          biggest_challenge: data.biggest_challenge,
          current_solution: data.current_solution,
          budget_range: data.budget_range,
          timeline: data.timeline,
          most_important: data.most_important,
          primary_platform: data.primary_platform,
          follower_count: data.follower_count,
          content_niche: data.content_niche,
          collaboration_experience: data.collaboration_experience,
          creator_challenge: data.creator_challenge,
          creator_important: data.creator_important,
        }
      ])
      .select()

    if (error) {
      console.error('Error saving waitlist entry:', error)
      return { success: false, error }
    }

    return { success: true, data: result, isNewEntry: true }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error }
  }
}

export async function getWaitlistStats() {
  try {
    const { data, error } = await supabase
      .from('waitlist_entries')
      .select('user_type, created_at')

    if (error) {
      console.error('Error fetching waitlist stats:', error)
      throw error
    }

    const totalEntries = data?.length || 0
    const brands = data?.filter(entry => entry.user_type === 'brand').length || 0
    const creators = data?.filter(entry => entry.user_type === 'creator').length || 0

    return {
      success: true,
      stats: {
        total: totalEntries,
        brands,
        creators
      }
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { success: false, error }
  }
}

export async function saveContactSubmission(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company,
          subject: data.subject,
          message: data.message,
        }
      ])
      .select()

    if (error) {
      console.error('Error saving contact submission:', error)
      return { success: false, error }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error }
  }
} 