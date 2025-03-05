import { createClient } from "@supabase/supabase-js";

// These environment variables should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase URL or Anon Key. Please check your .env file."
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to clear auth storage if needed
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem(
      "sb-" + supabaseUrl.split("//")[1].split(".")[0] + "-auth-token"
    );
    return true;
  } catch (error) {
    console.error("Error clearing auth storage:", error);
    return false;
  }
};
