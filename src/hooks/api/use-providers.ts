import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Provider,
  ProvidersResponse,
  BaseSuccessResponse,
  ProviderClaimsResponse,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Fetch all providers
export const useGetProviders = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: async () => {
      const response = await queryFn<ProvidersResponse>(
        AppServices.providers.get_all_providers(params)
      );
      return response.data;
    },
  });
};

// Fetch single provider
export const useGetProvider = (providerId: string | undefined) => {
  return useQuery({
    queryKey: ["provider", providerId],
    queryFn: async () => {
      if (!providerId) throw new Error("Provider ID is required");

      const response = await queryFn<BaseSuccessResponse<Provider>>(
        AppServices.providers.get_id_provider(providerId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!providerId,
  });
};

// Create provider
export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return queryFn(AppServices.providers.create_provider(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};

// Update provider
export const useUpsertProvider = () => {
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
        return queryFn(AppServices.providers.create_provider(data));
      }
      return queryFn(AppServices.providers.update_provider(id, data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};

// Delete provider
export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (providerId: string) => {
      return queryFn(AppServices.providers.delete_provider(providerId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};

// Provider Claims API Hook
export const useGetProviderClaims = (providerId: string | undefined) => {
  return useQuery({
    queryKey: ["provider-claims", providerId],
    queryFn: async () => {
      if (!providerId) throw new Error("Provider ID is required");

      const response = await queryFn<ProviderClaimsResponse>(
        AppServices.providers.get_provider_claims(providerId)
      );
      return response;
    },
    enabled: !!providerId,
  });
};
