import { useMutation } from "@tanstack/react-query";
import { BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";
import { logger } from "@/lib/logger";

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const response = await queryFn<BaseSuccessResponse<{ message: string }>>(
        AppServices.settings.change_password({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        })
      );
      return response.data;
    },
    onError: (error) => {
      logger.error("Failed to change password", error);
    },
  });
};
