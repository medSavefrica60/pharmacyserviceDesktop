import { useEffect, useRef } from "react";
import { useAuth } from "./store";

interface TokenRefreshManagerProps {
  refreshBeforeExpiryMinutes?: number; // Refresh 4 minutes before expiry by default
}

/**
 * TokenRefreshManager - Handles automatic token refresh based on user's token expiration time
 * This component should be rendered at the root level of your app
 */
export const TokenRefreshManager: React.FC<TokenRefreshManagerProps> = ({
  refreshBeforeExpiryMinutes = 4,
}) => {
  const { user, isAuthenticated, refreshToken } = useAuth();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }

    // Only set up refresh if user is authenticated and has token expiration time
    if (!isAuthenticated || !user?.tokenExpiresAt) {
      return;
    }

    const now = Date.now();
    const expiresAt = user.tokenExpiresAt;
    const refreshAt = expiresAt - refreshBeforeExpiryMinutes * 60 * 1000; // 4 minutes before expiry

    // If token already expired or should have been refreshed, refresh immediately
    if (now >= refreshAt) {
      console.log("Token needs immediate refresh");
      refreshToken().catch((error) => {
        console.error("Failed to refresh token:", error);
      });
      return;
    }

    // Calculate delay until refresh time
    const delayMs = refreshAt - now;

    console.log(
      `Token refresh scheduled in ${Math.round(delayMs / 1000 / 60)} minutes`,
    );

    // Set timeout to refresh token
    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        console.log("Auto-refreshing token...");
        const success = await refreshToken();
        if (success) {
          console.log("Token refreshed successfully");
        } else {
          console.error("Token refresh failed");
        }
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    }, delayMs);

    // Cleanup function
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [
    user?.tokenExpiresAt,
    isAuthenticated,
    refreshToken,
    refreshBeforeExpiryMinutes,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

/**
 * Hook to get token refresh information for debugging
 */
export const useTokenRefreshInfo = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user?.tokenExpiresAt) {
    return null;
  }

  const now = Date.now();
  const expiresAt = user.tokenExpiresAt;
  const refreshAt = expiresAt - 4 * 60 * 1000; // 4 minutes before expiry

  return {
    expiresAt: new Date(expiresAt),
    refreshAt: new Date(refreshAt),
    minutesUntilExpiry: Math.round((expiresAt - now) / 1000 / 60),
    minutesUntilRefresh: Math.round(Math.max(0, refreshAt - now) / 1000 / 60),
    shouldRefreshNow: now >= refreshAt,
    isExpired: now >= expiresAt,
  };
};
