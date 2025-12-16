import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WalletsResponse, BaseSuccessResponse, Wallet } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";
import { logger } from "@/lib/logger";

// Fetch all wallets
export const useGetWallets = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["wallets", params],
    queryFn: async () => {
      const response = await queryFn<WalletsResponse>(
        AppServices.wallets.get_all_wallets(params)
      );
      return response;
    },
  });
};

// Fetch single wallet
export const useGetWallet = (walletId: string | undefined) => {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async () => {
      if (!walletId) throw new Error("Wallet ID is required");

      const response = await queryFn<BaseSuccessResponse<Wallet>>(
        AppServices.wallets.get_id_wallet(walletId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!walletId,
  });
};

// Update wallet
export const useUpdateWalletStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const response = await queryFn<BaseSuccessResponse<Wallet>>(
        AppServices.wallets.update_wallet_status(id, data)
      );
      return response.data;
    },
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["wallet", id] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      logger.error("Failed to update wallet", error);
    },
  });
};

// Adjust wallet balance
export const useAdjustWalletBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const response = await queryFn<BaseSuccessResponse<Wallet>>(
        AppServices.wallets.adjust_wallet_balance(id, data)
      );
      return response.data;
    },
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["wallet", id] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      logger.error("Failed to adjust wallet balance", error);
    },
  });
};
