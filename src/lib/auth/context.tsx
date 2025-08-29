import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  AuthState,
  AuthContextType,
  SignInParams,
  User,
  AuthTokens,
} from "./types";
import { authStorage } from "./storage";
import { MockAuthService } from "./mockService";

// Initial auth state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth actions
type AuthAction =
  | { type: "SIGN_IN_SUCCESS"; payload: { tokens: AuthTokens; user: User } }
  | { type: "SIGN_OUT" }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "REFRESH_TOKEN_SUCCESS"; payload: AuthTokens }
  | {
      type: "INITIALIZE";
      payload: {
        tokens: AuthTokens | null;
        user: User | null;
        isAuthenticated: boolean;
      };
    };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        tokens: action.payload.tokens,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
        error: null,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        tokens: action.payload.tokens,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        tokens: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "REFRESH_TOKEN_SUCCESS":
      return {
        ...state,
        tokens: action.payload,
      };
    default:
      return state;
  }
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
  refreshInterval?: number; // in minutes
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  refreshInterval = 10,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const { tokens, user, isAuthenticated } = authStorage.loadAuth();
    dispatch({
      type: "INITIALIZE",
      payload: { tokens, user, isAuthenticated },
    });
  }, []);

  // Auto-refresh token
  useEffect(() => {
    if (!state.isAuthenticated || !state.tokens?.refreshToken) return;

    const interval = setInterval(
      () => {
        refreshToken();
      },
      refreshInterval * 60 * 1000,
    ); // Convert minutes to milliseconds

    return () => clearInterval(interval);
  }, [state.isAuthenticated, state.tokens?.refreshToken, refreshInterval]);

  // Sign in function
  const signIn = useCallback(async (params: SignInParams): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

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

      // Save to localStorage
      authStorage.saveAuth(tokens, params.userState);

      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: { tokens, user: params.userState },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign in failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  }, []);

  // Sign out function
  const signOut = useCallback(() => {
    authStorage.clearAuth();
    dispatch({ type: "SIGN_OUT" });
  }, []);

  // Update user function
  const updateUser = useCallback(
    (userUpdates: Partial<User>) => {
      if (!state.user) return;

      const updatedUser = { ...state.user, ...userUpdates };
      authStorage.updateUser(updatedUser);
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
    },
    [state.user],
  );

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<boolean> => {
    console.log("refreshing tokens");
    if (!state.tokens?.refreshToken) return false;

    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Use mock service for refresh token
      const response = await MockAuthService.refreshToken(
        state.tokens.refreshToken,
      );

      if (response.success && response.data) {
        const newTokens: AuthTokens = {
          accessToken: response.data.auth.token,
          refreshToken: response.data.refresh,
          tokenType: response.data.auth.type,
          expiresIn: response.data.expiresIn,
          expiresAt: Date.now() + response.data.expiresIn * 60 * 1000,
        };

        // Update tokens in storage
        authStorage.saveAuth(newTokens, state.user!);

        dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: newTokens });
        dispatch({ type: "SET_LOADING", payload: false });

        return true;
      } else {
        throw new Error(response.message || "Token refresh failed");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      signOut(); // Sign out if refresh fails
      return false;
    }
  }, [state.tokens, state.user, signOut]);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signOut,
    updateUser,
    refreshToken,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Hook for backward compatibility with react-auth-kit pattern
export const useAuthUser = () => {
  const { user } = useAuth();
  return user;
};

// Hook for sign in (backward compatibility)
export const useSignIn = () => {
  const { signIn } = useAuth();
  return signIn;
};

// Hook for sign out (backward compatibility)
export const useSignOut = () => {
  const { signOut } = useAuth();
  return signOut;
};

// Hook to check if user is authenticated
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};
