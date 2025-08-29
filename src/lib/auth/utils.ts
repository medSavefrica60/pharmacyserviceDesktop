import axios from "axios";
import { useAuth } from "./context";

/**
 * Utility functions for authentication
 */

// Function to set Authorization header for axios
export const setAuthHeader = (token: string, tokenType: string = "Bearer") => {
  return {
    Authorization: `${tokenType} ${token}`,
  };
};

// Function to check if token is expired
export const isTokenExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt;
};

// Function to check if token will expire soon (within 5 minutes)
export const isTokenExpiringSoon = (
  expiresAt: number,
  thresholdMinutes: number = 5,
): boolean => {
  const threshold = thresholdMinutes * 60 * 1000; // Convert to milliseconds
  return Date.now() + threshold > expiresAt;
};

// Hook to get auth headers for API calls
export const useAuthHeaders = () => {
  const { tokens } = useAuth();

  return tokens ? setAuthHeader(tokens.accessToken, tokens.tokenType) : {};
};

// Hook to get authenticated axios instance
export const useAuthenticatedAxios = () => {
  const { tokens, signOut } = useAuth();

  const authAxios = axios.create();

  // Request interceptor to add auth headers
  authAxios.interceptors.request.use(
    (config: any) => {
      if (tokens?.accessToken) {
        config.headers.Authorization = `${tokens.tokenType || "Bearer"} ${tokens.accessToken}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error),
  );

  // Response interceptor to handle auth errors
  authAxios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        // Token expired or invalid, sign out
        signOut();
      }
      return Promise.reject(error);
    },
  );

  return authAxios;
};

// Protected route guard function
export const requireAuth = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    throw new Error("Authentication required");
  }
  return true;
};

// Function to format user display name
export const getDisplayName = (
  user: { name?: string; email?: string } | null,
): string => {
  if (!user) return "Guest";
  return user.name || user.email || "User";
};

// Function to get user initials
export const getUserInitials = (
  user: { name?: string; email?: string } | null,
): string => {
  if (!user) return "G";

  if (user.name) {
    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.charAt(0).toUpperCase();
  }

  if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }

  return "U";
};

// Role-based access control helper
export const hasPermission = (user: any, requiredRole: string): boolean => {
  if (!user?.roles) return false;
  return Array.isArray(user.roles)
    ? user.roles.includes(requiredRole)
    : user.roles === requiredRole;
};

// Hook for role-based access control
export const usePermissions = () => {
  const { user } = useAuth();

  return {
    hasRole: (role: string) => hasPermission(user, role),
    hasAnyRole: (roles: string[]) =>
      roles.some((role) => hasPermission(user, role)),
    hasAllRoles: (roles: string[]) =>
      roles.every((role) => hasPermission(user, role)),
  };
};
