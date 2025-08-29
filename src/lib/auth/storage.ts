import { AuthTokens, User } from "./types";

const AUTH_STORAGE_KEY = "_auth";
const TOKEN_STORAGE_KEY = "_tokens";
const USER_STORAGE_KEY = "_user";

export const authStorage = {
  // Save authentication data to localStorage
  saveAuth: (tokens: AuthTokens, user: User): void => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } catch (error) {
      console.error("Failed to save auth data:", error);
    }
  },

  // Load authentication data from localStorage
  loadAuth: (): {
    tokens: AuthTokens | null;
    user: User | null;
    isAuthenticated: boolean;
  } => {
    try {
      const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
      const tokensStr = localStorage.getItem(TOKEN_STORAGE_KEY);
      const userStr = localStorage.getItem(USER_STORAGE_KEY);

      if (!isAuthenticated || !tokensStr || !userStr) {
        return { tokens: null, user: null, isAuthenticated: false };
      }

      const tokens = JSON.parse(tokensStr) as AuthTokens;
      const user = JSON.parse(userStr) as User;

      // Check if token is expired
      if (tokens.expiresAt && Date.now() > tokens.expiresAt) {
        authStorage.clearAuth();
        return { tokens: null, user: null, isAuthenticated: false };
      }

      return { tokens, user, isAuthenticated };
    } catch (error) {
      console.error("Failed to load auth data:", error);
      authStorage.clearAuth();
      return { tokens: null, user: null, isAuthenticated: false };
    }
  },

  // Update user data in localStorage
  updateUser: (user: User): void => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  },

  // Clear all authentication data from localStorage
  clearAuth: (): void => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear auth data:", error);
    }
  },

  // Check if tokens exist in storage
  hasTokens: (): boolean => {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  },
};
