import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, 
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// This file contains the AuthService class which handles authentication-related operations
// like login, logout, registration, and fetching the current user.

class AuthenticationService {
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      // Supabase automatically manages the session
      return {
        user: data.user,
        session: data.session,
        token: data.session?.access_token
      };
    } catch (error) {
      console.log("Error happened during login: " + error.message);
      throw error;
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("Error happened during logout: " + error.message);
      throw error;
    }
  }

  async register(name, email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name // Store name in user metadata
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.log("Error happened during register: " + error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        throw new Error(error.message);
      }

      return user;
    } catch (error) {
      console.log("Error getting current user: " + error.message);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw new Error(error.message);
      }
      return session;
    } catch (error) {
      console.log("Error getting session: " + error.message);
      return null;
    }
  }
}

export default new AuthenticationService();