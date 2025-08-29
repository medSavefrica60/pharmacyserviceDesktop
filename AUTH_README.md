# Custom Authentication System

This project implements a comprehensive authentication system using React Context API, replacing the previous `react-auth-kit` dependency.

## Features

- ✅ **Complete Authentication State Management**: Sign in, sign out, user data, and tokens
- ✅ **Local Storage Persistence**: Automatic save/restore of authentication state
- ✅ **Token Auto-Refresh**: Configurable automatic token refresh
- ✅ **Type Safety**: Full TypeScript support with proper types
- ✅ **Backward Compatibility**: Hooks that match `react-auth-kit` patterns
- ✅ **Protected Routes**: Components and HOCs for route protection
- ✅ **Role-Based Access Control**: Support for user roles and permissions
- ✅ **Axios Integration**: Pre-configured authenticated HTTP client
- ✅ **Error Handling**: Comprehensive error states and recovery

## Quick Start

### 1. Wrap your app with AuthProvider

```tsx
import { AuthProvider } from '@/lib/auth';

function App() {
  return (
    <AuthProvider refreshInterval={10}> {/* refresh every 10 minutes */}
      <YourApp />
    </AuthProvider>
  );
}
```

### 2. Use authentication in components

```tsx
import { useAuth, useAuthUser } from '@/lib/auth';

function MyComponent() {
  const { signIn, signOut, isAuthenticated, user } = useAuth();

  // Or use individual hooks
  const user = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
}
```

## API Reference

### Core Hooks

#### `useAuth()`

Returns the complete authentication context:

```tsx
const {
  user,              // Current user data
  tokens,            // Access and refresh tokens
  isAuthenticated,   // Boolean auth status
  isLoading,         // Loading state
  error,             // Error message if any
  signIn,            // Function to authenticate user
  signOut,           // Function to sign out user
  updateUser,        // Function to update user data
  refreshToken,      // Function to refresh tokens
  clearError         // Function to clear errors
} = useAuth();
```

#### `signIn(params)`

Authenticate a user:

```tsx
await signIn({
  auth: {
    token: "your-access-token",
    type: "Bearer" // optional, defaults to "Bearer"
  },
  refresh: "your-refresh-token",
  userState: {
    id: "user-id",
    email: "user@example.com",
    name: "User Name"
    // ... any other user data
  },
  expiresIn: 60 // optional, token expiry in minutes
});
```

### Utility Hooks

- `useAuthUser()` - Get current user data
- `useSignIn()` - Get sign in function
- `useSignOut()` - Get sign out function
- `useIsAuthenticated()` - Get authentication status
- `useAuthHeaders()` - Get Authorization headers for API calls
- `useAuthenticatedAxios()` - Get pre-configured axios instance
- `usePermissions()` - Get role-based permission helpers

### Protected Routes

#### Component-based protection:

```tsx
import { ProtectedRoute } from '@/lib/auth';

<ProtectedRoute
  fallback={<LoginPage />}
  requiredRole="admin"
>
  <AdminPanel />
</ProtectedRoute>
```

#### HOC-based protection:

```tsx
import { withAuth } from '@/lib/auth';

const AdminPanel = withAuth(MyComponent, {
  requiredRole: "admin",
  fallback: <div>Access denied</div>
});
```

### Authenticated HTTP Requests

#### Using auth headers:

```tsx
import axios from 'axios';
import { useAuthHeaders } from '@/lib/auth';

function MyComponent() {
  const authHeaders = useAuthHeaders();

  const fetchData = async () => {
    const response = await axios.get('/api/data', {
      headers: authHeaders
    });
  };
}
```

#### Using authenticated axios instance:

```tsx
import { useAuthenticatedAxios } from '@/lib/auth';

function MyComponent() {
  const authAxios = useAuthenticatedAxios();

  const fetchData = async () => {
    // Automatically includes auth headers and handles 401 errors
    const response = await authAxios.get('/api/data');
  };
}
```

### Role-Based Access Control

```tsx
import { usePermissions } from '@/lib/auth';

function MyComponent() {
  const { hasRole, hasAnyRole, hasAllRoles } = usePermissions();

  if (hasRole('admin')) {
    return <AdminControls />;
  }

  if (hasAnyRole(['editor', 'moderator'])) {
    return <EditorControls />;
  }

  return <RegularUserView />;
}
```

## Configuration

### AuthProvider Props

- `children` - React components to wrap
- `refreshInterval` - Auto-refresh interval in minutes (default: 10)

### Storage Configuration

The system uses localStorage with these keys:

- `_auth` - Authentication status
- `_tokens` - Token data
- `_user` - User data

## Migration from react-auth-kit

The system provides backward-compatible hooks:

- `useAuthUser()` - Same as react-auth-kit
- `useSignIn()` - Same signature as react-auth-kit
- `useSignOut()` - Same as react-auth-kit
- `useIsAuthenticated()` - Same as react-auth-kit

Replace imports:

```tsx
// Old
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

// New
import { useAuthUser, useSignIn } from '@/lib/auth';
```

## Type Definitions

```tsx
interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: any; // Additional user properties
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  expiresAt?: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

## Error Handling

The system handles various error scenarios:

- Invalid/expired tokens automatically trigger sign out
- Network errors during refresh are logged and handled gracefully
- Storage errors are caught and auth state is reset
- 401 responses from API calls trigger automatic sign out

## Security Features

- Tokens are validated on load
- Expired tokens are automatically removed
- Auto-refresh prevents token expiry during active sessions
- Secure storage cleanup on sign out
- Request/response interceptors for API security
