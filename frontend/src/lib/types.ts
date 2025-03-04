import { User } from "@supabase/supabase-js";

export type UserType = "Individual" | "Curator";

export interface UserProfile {
  user_id: string;
  email: string;
  full_name: string;
  username: string;
  type_of_user: UserType;
  credits: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
