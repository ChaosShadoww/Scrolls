import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches videos from Supabase database.
 * If a `userId` is provided, it fetches recommended videos for that user.
 */
export async function getVideos(userId?: string) {
  try {
    let query = supabase.from("videos").select("*");

    if (userId) {
      // Example: Fetch recommended videos for the user
      query = query.eq("recommended_for", userId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching videos: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
