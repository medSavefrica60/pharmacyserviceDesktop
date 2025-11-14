import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { queryFn } from "@/api";
import { BaseSuccessResponse } from "@/types";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

export type ContributionsResponse = {
  contributions: Contribution[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data generator
const generateMockContributions = (): Contribution[] => [
  {
    id: "2382ef72-f381-49d8-83de-2d32190291d0",
    contributorId: "d57fcb03-bc16-4728-9e99-6b5d3822d126",
    recipientId: "d57fcb03-bc16-4728-9e99-6b5d3822d126",
    contributorPhone: "+233543482189",
    recipientMedsaveId: "MS07648",
    amount: "350.00",
    status: "completed",
    description: "USSD contribution to Diabetes Package",
    reference: "CONT-1761138317803-5GQSM2",
    createdAt: "2025-10-22T13:05:17.789Z",
    updatedAt: "2025-10-22T13:05:17.789Z",
  },
];

// Mock implementation
const mockGetAllContributions = async (
  params?: Record<string, unknown>
): Promise<ContributionsResponse> => {
  await delay(500);
  let contributions = generateMockContributions();

  // Apply filters if params exist
  if (params?.recipientId) {
    contributions = contributions.filter(
      (c) => c.recipientId === params.recipientId
    );
  }
  if (params?.startDate) {
    contributions = contributions.filter(
      (c) => new Date(c.createdAt) >= new Date(params.startDate as string)
    );
  }
  if (params?.endDate) {
    contributions = contributions.filter(
      (c) => new Date(c.createdAt) <= new Date(params.endDate as string)
    );
  }

  return {
    contributions,
    pagination: {
      page: 1,
      limit: 20,
      total: contributions.length,
      totalPages: 1,
    },
  };
};

const mockGetContribution = async (id: string): Promise<Contribution> => {
  await delay(300);
  const contributions = generateMockContributions();
  const contribution = contributions.find((c) => c.id === id);
  if (!contribution) throw new Error("Contribution not found");
  return contribution;
};

const mockCreateContribution = async (data: Record<string, unknown>) => {
  await delay(500);
  return { id: `con${Date.now()}`, ...data };
};

const mockUpdateContribution = async (
  id: string,
  data: Record<string, unknown>
) => {
  await delay(500);
  return { id, ...data };
};

const mockDeleteContribution = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all contributions
export const useGetContributions = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [`contributions`, params],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllContributions(params);
      }
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
    queryKey: [`contribution-${contributionId}`],
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
      if (USE_MOCK) {
        return mockCreateContribution(data);
      }
      return queryFn(AppServices.contributions.create_contribution(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`contributions`] });
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
      if (USE_MOCK) {
        return mockUpdateContribution(id, data);
      }
      return queryFn(AppServices.contributions.update_contribution(id, data));
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [`contributions`] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: [`contribution-${id}`] });
      }
    },
  });
};

// Delete contribution
export const useDeleteContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contributionId: string) => {
      if (USE_MOCK) {
        return mockDeleteContribution(contributionId);
      }
      return queryFn(
        AppServices.contributions.delete_contribution(contributionId)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
    },
  });
};
