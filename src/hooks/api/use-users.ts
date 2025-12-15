import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  BaseSuccessResponse,
  UserPackageEnrollmentsResponse,
  ClaimsResponse,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";
import { logger } from "@/lib/logger";

// Type for users query response with optional metadata
export type UsersQueryData = BaseSuccessResponse<{
  users: User[];
  metadata: {
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
    totalSuspendedUsers: number;
    totalVerifiedUsers: number;
  };
}> & {};

// Fetch all users
export const useGetUsers = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await queryFn<UsersQueryData>(
        AppServices.users.get_all_users(params)
      );
      return Promise.resolve(response);
    },
  });
};

// Fetch single user
export const useGetUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

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
      if (!id || typeof id !== "string") {
        const response = await queryFn<BaseSuccessResponse<User>>(
          AppServices.users.create_user(data)
        );
        return response.data;
      }
      const response = await queryFn<BaseSuccessResponse<User>>(
        AppServices.users.update_user(id, data)
      );
      return response.data;
    },
    onSuccess: (_response, { id }) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["user", id] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error) => {
      logger.error("Failed to upsert user", error);
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return queryFn(AppServices.users.delete_user(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Fetch user package enrollments
export const useGetUserPackageEnrollments = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-packages", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await queryFn<UserPackageEnrollmentsResponse>(
        AppServices.users.get_user_package_enrollments(userId)
      );
      return response;
    },
    enabled: !!userId,
  });
};

// Fetch user claims
export const useGetUserClaims = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-claims", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await queryFn<ClaimsResponse>(
        AppServices.users.get_user_claims(userId)
      );
      return response;
    },
    enabled: !!userId,
  });
};
