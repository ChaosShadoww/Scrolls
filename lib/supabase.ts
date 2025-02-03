import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates an authenticated Supabase client for the logged-in user.
 */
export async function getAuthenticatedSupabaseClient() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: `Bearer ${userId}` },
    },
  });

  return supabase;
}
