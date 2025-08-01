// useAuthStore.js - FIXED VERSION
import { create } from "zustand";
import { supabase } from "../supabaseClient";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  // ✅ Internal method to set user (used by auth listener)
  setUser: (user) => {
    console.log('🔄 Setting user in store:', user?.email || 'null');
    set({ user, error: null });
  },

  // ✅ FIXED: Better error handling and debugging
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      console.log("👤 Fetching user from Supabase...");

      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("❌ Supabase auth error:", error);
        set({ user: null, error: error.message, isLoading: false });
        return null;
      }

      if (data?.user) {
        console.log("✅ User found:", {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at
        });
        set({ user: data.user, error: null, isLoading: false });
        return data.user;
      } else {
        console.log("ℹ️ No user session found");
        set({ user: null, error: null, isLoading: false });
        return null;
      }
    } catch (err) {
      console.error("❌ Unexpected error in fetchUser:", err);
      set({ user: null, error: "Failed to fetch user", isLoading: false });
      return null;
    }
  },

  // ✅ FIXED: Better login with error handling
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      console.log("🔐 Attempting login for:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("❌ Login error:", error);
        set({ user: null, error: error.message, isLoading: false });
        return { data: null, error };
      }

      console.log("✅ Login successful");
      set({ user: data.user, error: null, isLoading: false });
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected login error:", err);
      set({ user: null, error: "Login failed", isLoading: false });
      return { data: null, error: { message: "Login failed" } };
    }
  },

  // ✅ FIXED: Better logout
  logout: async () => {
    try {
      set({ isLoading: true });
      console.log("🚪 Logging out...");

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Logout error:", error);
        set({ error: error.message, isLoading: false });
        return { error };
      }

      console.log("✅ Logout successful");
      set({ user: null, error: null, isLoading: false });
      return { error: null };
    } catch (err) {
      console.error("❌ Unexpected logout error:", err);
      set({ error: "Logout failed", isLoading: false });
      return { error: { message: "Logout failed" } };
    }
  },

  // ✅ NEW: Register method
  register: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      console.log("📝 Attempting registration for:", email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        console.error("❌ Registration error:", error);
        set({ user: null, error: error.message, isLoading: false });
        return { data: null, error };
      }

      console.log("✅ Registration successful");
      set({ user: data.user, error: null, isLoading: false });
      return { data, error: null };
    } catch (err) {
      console.error("❌ Unexpected registration error:", err);
      set({ user: null, error: "Registration failed", isLoading: false });
      return { data: null, error: { message: "Registration failed" } };
    }
  },

  // ✅ NEW: Clear error method
  clearError: () => set({ error: null }),

  // ✅ NEW: Check if user is authenticated
  isAuthenticated: () => {
    const { user } = get();
    return !!user;
  },

  // ✅ NEW: Get user ID safely
  getUserId: () => {
    const { user } = get();
    return user?.id || null;
  }
}));

// ✅ Set up auth state listener AFTER store creation
let listenerSetup = false;

const setupAuthListener = () => {
  if (listenerSetup) return;
  listenerSetup = true;

  console.log('🎧 Setting up auth state listener...');
  
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("🔄 Auth state changed:", event, session?.user?.email || 'no user');
    
    const { setUser } = useAuthStore.getState();
    
    if (event === 'SIGNED_IN' && session?.user) {
      console.log('✅ User signed in, updating store');
      setUser(session.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('🚪 User signed out, clearing store');
      setUser(null);
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      console.log('🔄 Token refreshed, updating store');
      setUser(session.user);
    }
  });
  
  // Also check for existing session on setup
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      console.log('🔍 Found existing session, updating store');
      const { setUser } = useAuthStore.getState();
      setUser(session.user);
    }
  });
};

// Setup listener immediately
setupAuthListener();

export default useAuthStore;