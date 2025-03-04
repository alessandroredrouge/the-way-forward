import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthState, UserProfile } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

// Create the context with a default value
const AuthContext = createContext<{
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    username: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => boolean;
  isCurator: () => boolean;
}>({
  authState: { user: null, profile: null, isLoading: true, error: null },
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isAuthenticated: () => false,
  isCurator: () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });
  const { toast } = useToast();

  // Fetch user profile from the database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // Initialize auth state when the component mounts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for an active session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const { user } = session;
          const profile = await fetchUserProfile(user.id);

          setAuthState({
            user,
            profile,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuthState({
          user: null,
          profile: null,
          isLoading: false,
          error: "Failed to initialize authentication",
        });
      }
    };

    initializeAuth();

    // Set up a listener for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        const profile = await fetchUserProfile(session.user.id);

        setAuthState({
          user: session.user,
          profile,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          profile: null,
          isLoading: false,
          error: null,
        });
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const profile = await fetchUserProfile(data.user.id);

      setAuthState({
        user: data.user,
        profile,
        isLoading: false,
        error: null,
      });

      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${profile?.full_name || email}!`,
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "An unknown error occurred",
      }));
      toast({
        title: "Sign in failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    username: string
  ) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
          },
        },
      });

      if (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (!data.user) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "User creation failed",
        }));
        toast({
          title: "Sign up failed",
          description: "User creation failed",
          variant: "destructive",
        });
        return;
      }

      // The user profile is now created automatically by a database trigger
      // Wait a moment for the trigger to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      const profile = await fetchUserProfile(data.user.id);

      setAuthState({
        user: data.user,
        profile,
        isLoading: false,
        error: null,
      });

      toast({
        title: "Signed up successfully",
        description: `Welcome, ${fullName}!`,
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "An unknown error occurred",
      }));
      toast({
        title: "Sign up failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const { error } = await supabase.auth.signOut();

      if (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });

      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "An unknown error occurred",
      }));
      toast({
        title: "Sign out failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return !!authState.user;
  };

  // Check if the user is a curator
  const isCurator = () => {
    return !!authState.profile && authState.profile.type_of_user === "Curator";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        isCurator,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
