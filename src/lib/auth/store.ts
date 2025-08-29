import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthState, SignInParams, User, AuthTokens } from "./types";

interface AuthStore extends AuthState {
  // Actions
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  updateUser: (userUpdates: Partial<User>) => void;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  initialize: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,

        // Initialize auth state (check token expiration)
        initialize: () => {
          const { tokens } = get();

          // Check if token is expired
          if (tokens?.expiresAt && Date.now() > tokens.expiresAt) {
            get().signOut();
            return;
          }

          set({
            isLoading: false,
          });
        },

        // Sign in action
        signIn: async (params: SignInParams) => {
          set({ isLoading: true, error: null });

          try {
            const expiresAt = params.expiresIn
              ? Date.now() + params.expiresIn * 60 * 1000
              : Date.now() + 60 * 60 * 1000; // Default 1 hour

            const tokens: AuthTokens = {
              accessToken: params.auth.token,
              refreshToken: params.refresh,
              tokenType: params.auth.type || "Bearer",
              expiresIn: params.expiresIn || 60,
              expiresAt,
            };

            // Add token expiration to user data for refresh manager
            const userWithExpiration = {
              ...params.userState,
              tokenExpiresAt: expiresAt,
            };

            set({
              tokens,
              user: userWithExpiration,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Sign in failed";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Sign out action
        signOut: () => {
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        },

        // Update user action
        updateUser: (userUpdates: Partial<User>) => {
          const { user } = get();
          if (!user) return;

          const updatedUser = { ...user, ...userUpdates };
          set({ user: updatedUser });
        },

        // Refresh token action
        refreshToken: async () => {
          const { tokens, user } = get();
          if (!tokens?.refreshToken) return false;

          try {
            set({ isLoading: true });

            // Use real API service for refresh token
            // const refreshResponse = await AuthService.refreshToken(tokens.refreshToken);

            // Mock tokens for demo
            const newTokens: AuthTokens = {
              accessToken: `refreshed_token_${Date.now()}`,
              refreshToken: `refreshed_refresh_${Date.now()}`,
              tokenType: "Bearer",
              expiresIn: 8, // 8 minutes for testing
              expiresAt: Date.now() + 8 * 60 * 1000,
            };

            // Update user with new token expiration time
            const updatedUser = {
              ...user!,
              tokenExpiresAt: newTokens.expiresAt,
            };

            set({
              tokens: newTokens,
              user: updatedUser,
              isLoading: false,
            });

            return true;
          } catch (error) {
            console.error("Token refresh failed:", error);
            get().signOut(); // Sign out if refresh fails
            return false;
          }
        },

        // Clear error action
        clearError: () => {
          set({ error: null });
        },

        // Set loading state
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        // Set error state
        setError: (error: string | null) => {
          set({ error, isLoading: false });
        },
      }),
      {
        name: "tauri-app-auth",
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: "auth-store",
    },
  ),
);

// Hook for easier access to auth state
export const useAuth = () => {
  const store = useAuthStore();

  return {
    // State
    user: store.user,
    tokens: store.tokens,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    signIn: store.signIn,
    signOut: store.signOut,
    updateUser: store.updateUser,
    refreshToken: store.refreshToken,
    clearError: store.clearError,
    initialize: store.initialize,
    setLoading: store.setLoading,
    setError: store.setError,
  };
};
