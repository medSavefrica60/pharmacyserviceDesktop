// Mock user database
const MOCK_USERS = [
  {
    id: "user-1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    roles: ["admin", "user"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    department: "Administration",
    status: "active",
  },
  {
    id: "user-2",
    email: "john@example.com",
    password: "john123",
    name: "John Doe",
    roles: ["user"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    department: "Engineering",
    status: "active",
  },
  {
    id: "user-3",
    email: "jane@example.com",
    password: "jane123",
    name: "Jane Smith",
    roles: ["manager", "user"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    department: "Marketing",
    status: "active",
  },
  {
    id: "user-4",
    email: "guest@example.com",
    password: "guest123",
    name: "Guest User",
    roles: ["guest"],
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    department: "Guest",
    status: "active",
  },
];

// Mock API responses
const generateMockToken = () => {
  return `mock_token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
};

const generateMockRefreshToken = () => {
  return `mock_refresh_${Date.now()}_${Math.random().toString(36).substring(7)}`;
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    auth: {
      token: string;
      type: string;
    };
    refresh: string;
    userState: {
      id: string;
      email: string;
      name: string;
      roles: string[];
      avatar?: string;
      department?: string;
      status?: string;
      [key: string]: any;
    };
    expiresIn: number;
  };
}

/**
 * Mock authentication service
 */
export class MockAuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate network delay
    await delay(800);

    const { email, password } = credentials;

    // Find user by email
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      return {
        success: false,
        message: "User not found. Please check your email address.",
      };
    }

    // Check password
    if (user.password !== password) {
      return {
        success: false,
        message: "Invalid password. Please try again.",
      };
    }

    // Check user status
    if (user.status !== "active") {
      return {
        success: false,
        message: "Account is inactive. Please contact support.",
      };
    }

    // Success - return mock tokens and user data
    return {
      success: true,
      message: "Login successful!",
      data: {
        auth: {
          token: generateMockToken(),
          type: "Bearer",
        },
        refresh: generateMockRefreshToken(),
        userState: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
          avatar: user.avatar,
          department: user.department,
          status: user.status,
        },
        expiresIn: 60, // 1 hour
      },
    };
  }

  static async refreshToken(refreshToken: string): Promise<LoginResponse> {
    // Simulate network delay
    await delay(500);

    // In a real app, you'd validate the refresh token
    // For this mock, we'll just generate new tokens
    return {
      success: true,
      message: "Token refreshed successfully",
      data: {
        auth: {
          token: generateMockToken(),
          type: "Bearer",
        },
        refresh: generateMockRefreshToken(),
        userState: {
          id: "user-1", // Mock data - in real app this would come from token
          email: "admin@example.com",
          name: "Admin User",
          roles: ["admin", "user"],
        },
        expiresIn: 60,
      },
    };
  }

  static getDemoUsers() {
    return MOCK_USERS.map((user) => ({
      email: user.email,
      password: user.password,
      name: user.name,
      roles: user.roles,
      department: user.department,
    }));
  }
}
