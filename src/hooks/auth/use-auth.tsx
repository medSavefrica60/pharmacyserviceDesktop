import { invoke } from "@tauri-apps/api/core";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Updated interfaces to match the new Rust backend
export interface AdminData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  status: string;
  permissions: string[];
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface Session {
  user: AdminData;
  tokens: Tokens;
}

export interface OtpData {
  email: string;
  requestId: string;
  requires_otp: boolean;
}

export interface OtpVerificationRequest {
  email: string;
  otp: string;
  requestId: string;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  requestOtp: (email: string, password: string) => Promise<OtpData>;
  verifyOtp: (
    email: string,
    otp: string,
    request_id: string
  ) => Promise<Session>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const useSession = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const currentSession = await invoke<Session | null>(
          "get_current_session"
        );
        console.log("currentSession", currentSession);
        setSession(currentSession);
      } catch (error) {
        console.error("Failed to get current session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  const requestOtp = async (
    email: string,
    password: string
  ): Promise<OtpData> => {
    try {
      const otpData = await invoke<OtpData>("request_otp", {
        email,
        password,
      });
      return otpData;
    } catch (error) {
      console.error("OTP request failed:", error);
      throw error;
    }
  };

  const verifyOtp = async (
    email: string,
    otp: string,
    request_id: string
  ): Promise<Session> => {
    try {
      const session = await invoke<Session>("verify_otp", {
        email,
        otp,
        requestId: request_id,
      });
      setSession(session);
      return session;
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await invoke("logout");
      setSession(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const refreshSession = async (): Promise<void> => {
  //   try {
  //     const session = await invoke<Session>("refresh_session");
  //     setSession(session);
  //   } catch (error) {
  //     console.error("Refresh session failed:", error);
  //   }
  // };

  const checkAuthentication = async (): Promise<boolean> => {
    try {
      return await invoke<boolean>("is_authenticated");
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    session,
    isLoading,
    requestOtp,
    verifyOtp,
    logout,
    checkAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
