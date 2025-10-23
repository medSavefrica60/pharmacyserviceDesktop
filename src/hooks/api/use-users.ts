import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  UsersResponse,
  BaseSuccessResponse,
  UserPackageEnrollmentsResponse,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Fetch all users
export const useGetUsers = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
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
    queryKey: ["users", "packages", userId],
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
