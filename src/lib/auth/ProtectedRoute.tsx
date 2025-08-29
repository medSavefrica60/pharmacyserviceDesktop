import { ReactNode } from "react";
import { useAuth } from "./context";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredRole?: string;
  requiredRoles?: string[];
}

/**
 * Component to protect routes that require authentication
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div>Please sign in to access this page.</div>,
  requiredRole,
  requiredRoles = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check authentication
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check role permissions if required
  if (requiredRole || requiredRoles.length > 0) {
    const userRoles = user?.roles || [];
    const rolesToCheck = requiredRole
      ? [requiredRole, ...requiredRoles]
      : requiredRoles;

    const hasRequiredRole = rolesToCheck.some((role) =>
      Array.isArray(userRoles) ? userRoles.includes(role) : userRoles === role,
    );

    if (!hasRequiredRole) {
      return <div>You don't have permission to access this page.</div>;
    }
  }

  return <>{children}</>;
};

/**
 * Higher-order component to protect components that require authentication
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: ReactNode;
    requiredRole?: string;
    requiredRoles?: string[];
  },
) => {
  const WrappedComponent = (props: P) => (
    <ProtectedRoute
      fallback={options?.fallback}
      requiredRole={options?.requiredRole}
      requiredRoles={options?.requiredRoles}
    >
      <Component {...props} />
    </ProtectedRoute>
  );

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
