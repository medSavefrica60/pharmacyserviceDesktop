export interface User {
  id: string;
  email: string;
  name: string;
  tokenExpiresAt?: number; // Token expiration timestamp in milliseconds
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  expiresAt?: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignInParams {
  auth: {
    token: string;
    type?: string;
  };
  refresh: string;
  userState: User;
  expiresIn?: number;
}

export interface AuthContextType extends AuthState {
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
}
