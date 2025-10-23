import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UsersResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator
const generateMockUsers = (): User[] => [
  {
    id: "d57fcb03-bc16-4728-9e99-6b5d3822d126",
    ghanaCardNumber: "GHA-998877565-5",
    firstName: "Daniel",
    lastName: "Amoako Kodua",
    email: "",
    phoneNumber: "+233543482189",
    dateOfBirth: "",
    gender: "",
    channel: "USSD",
    status: "ACTIVE",
    role: "END_USER",
    isPinSet: true,
    isPhoneVerified: true,
    isEmailVerified: false,
    ghanaCardVerified: false,
    isMomoNumber: false,
    momoNumber: "",
    termsAccepted: true,
    trustScore: 50,
    failedLoginAttempts: 0,
    lastLoginAt: "",
    createdAt: "2025-10-22T12:57:42.305Z",
    updatedAt: "2025-10-22T12:57:42.305Z",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllUsers = async (params?: Record<string, unknown>) => {
  await delay(500);
  let users = generateMockUsers();

  // Apply filters if params exist
  if (params?.search) {
    const search = (params.search as string).toLowerCase();
    users = users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.phoneNumber.toLowerCase().includes(search) ||
        u.ghanaCardNumber.toLowerCase().includes(search)
    );
  }
  if (params?.role) {
    users = users.filter((u) => u.role === params.role);
  }
  if (params?.status) {
    users = users.filter((u) => u.status === params.status);
  }

  // Return response with pagination at root level
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;

  return {
    users,
    limit,
    totalPages: Math.ceil(users.length / limit),
    currentPage: page,
    total: users.length,
  };
};

const mockGetUser = async (id: string) => {
  await delay(300);
  const users = generateMockUsers();
  const user = users.find((u) => u.id === id);
  if (!user) throw new Error("User not found");
  return user;
};

const mockUpsertUser = async (
  id: string | null,
  data: Record<string, unknown>
) => {
  await delay(500);
  if (!id) {
    // Create
    return { id: `u${Date.now()}`, ...data };
  }
  // Update
  return { id, ...data };
};

const mockDeleteUser = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all users
export const useGetUsers = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllUsers(params);
      }
      const response = await queryFn<UsersResponse>(
        AppServices.users.get_all_users(params)
      );
      return {
        users: response.data.users,
        limit: response.limit,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        total: response.total,
      };
    },
  });
};

// Fetch single user
export const useGetUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      if (USE_MOCK) {
        return mockGetUser(userId);
      }
      const response = await queryFn<BaseSuccessResponse<User>>(
        AppServices.users.get_id_user(userId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!userId,
  });
};

// Upsert user (create or update)
export const useUpsertUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | null;
      data: Record<string, unknown>;
    }) => {
      if (USE_MOCK) {
        return mockUpsertUser(id, data);
      }

      if (!id || typeof id !== "string") {
        return queryFn(AppServices.users.create_user(data));
      }
      return queryFn(AppServices.users.update_user(id, data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (USE_MOCK) {
        return mockDeleteUser(userId);
      }
      return queryFn(AppServices.users.delete_user(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
