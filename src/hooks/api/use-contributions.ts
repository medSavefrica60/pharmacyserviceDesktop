import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { queryFn } from "@/api";
import { BaseSuccessResponse } from "@/types";
import { AppServices } from "@/lib/services/providers";

export type ContributionsResponse = {
  contributions: Contribution[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Fetch all contributions
export const useGetContributions = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["contributions", params],
    queryFn: async () => {
      const response = await queryFn<
        BaseSuccessResponse<ContributionsResponse>
      >(AppServices.contributions.get_all_contributions(params));
      return response.data;
    },
  });
};

// Fetch single contribution
export const useGetContribution = (contributionId: string | undefined) => {
  return useQuery({
    queryKey: ["contribution", contributionId],
    queryFn: async () => {
      if (!contributionId) throw new Error("Contribution ID is required");

      const response = await queryFn<BaseSuccessResponse<Contribution>>(
        AppServices.contributions.get_id_contribution(contributionId)
      );
      return Promise.resolve(response);
    },
    enabled: !!contributionId,
  });
};

// Create contribution
export const useCreateContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return queryFn(AppServices.contributions.create_contribution(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
    },
  });
};

// Update contribution
export const useUpdateContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      return queryFn(AppServices.contributions.update_contribution(id, data));
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["contribution", id] });
      }
    },
  });
};

// Delete contribution
export const useDeleteContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contributionId: string) => {
      return queryFn(
        AppServices.contributions.delete_contribution(contributionId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
    },
  });
};
