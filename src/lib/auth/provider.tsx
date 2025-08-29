import React, { useEffect, ReactNode } from "react";
import { useAuth } from "./store";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initialize } = useAuth();

  // Initialize auth state on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};
