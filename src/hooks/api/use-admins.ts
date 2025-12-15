import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Admin, BaseSuccessResponse, AdminsResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";
import { logger } from "@/lib/logger";

// Type for admins query response
export type AdminsQueryData = AdminsResponse;

// Fetch all admins
export const useGetAdmins = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["admins", params],
    queryFn: async () => {
      const response = await queryFn<AdminsQueryData>(
        AppServices.admins.get_all_admins(params)
      );
      return Promise.resolve(response);
    },
  });
};

// Fetch single admin
export const useGetAdmin = (adminId: string | undefined) => {
  return useQuery({
    queryKey: ["admin", adminId],
    queryFn: async () => {
      if (!adminId) throw new Error("Admin ID is required");

      const response = await queryFn<BaseSuccessResponse<Admin>>(
        AppServices.admins.get_id_admin(adminId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!adminId,
  });
};

// Update admin
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const response = await queryFn<BaseSuccessResponse<Admin>>(
        AppServices.admins.update_admin(id, data)
      );
      return response.data;
    },
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", id] });
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      logger.error("Failed to update admin", error);
    },
  });
};

// Delete admin
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminId: string) => {
      return queryFn(AppServices.admins.delete_admin(adminId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      logger.error("Failed to delete admin", error);
    },
  });
};
