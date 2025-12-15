import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Claim, ClaimsResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator with new nested structure
const generateMockClaims = () => [
  {
    id: "56f6bb00-c1ad-473a-afdc-cf89e2411cb3",
    amount: "600.00",
    status: "approved",
    reference: "CLM-20251022-58FZQ5",
    claimCode: "2209726",
    expiresAt: "2025-10-22T13:18:06.538Z",
    approvedAt: "2025-10-22T13:04:27.945Z",
    createdAt: "2025-10-22T13:03:06.523Z",
    updatedAt: "2025-10-22T13:04:27.959Z",
    user: {
      id: "d57fcb03-bc16-4728-9e99-6b5d3822d126",
      firstName: "Daniel",
      lastName: "Amoako Kodua",
      phoneNumber: "+233543482189",
      medsaveId: "MS07648",
    },
    provider: {
      id: "94433c74-31fb-455d-a206-8fa9132388cc",
      email: "danielamoakokodua698@gmail.com",
      organizationName: "Laud K Pharmacy",
      contactPhone: "+233543482189",
    },
    package: {
      id: "e5f15625-f58f-4f11-aeb3-bfc71df4aed3",
      name: "Diabetes Package",
      minAmount: "300",
      status: "ACTIVE",
    },
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllClaims = async (params?: Record<string, unknown>) => {
  await delay(500);
  let claims = generateMockClaims();

  // Apply filters if params exist
  if (params?.status && params.status !== "all") {
    claims = claims.filter((c) => c.status === params.status);
  }
  if (params?.providerId) {
    claims = claims.filter((c) => c.provider.id === params.providerId);
  }

  // Return paginated response matching new API structure
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;

  return {
    status: "success",
    code: 200,
    message: "Operation completed successfully",
    timestamp: new Date().toISOString(),
    data: {
      page,
      limit,
      total: claims.length,
      claims,
    },
  };
};

const mockGetClaim = async (id: string) => {
  await delay(300);
  const claims = generateMockClaims();
  const claim = claims.find((c) => c.id === id);
  if (!claim) throw new Error("Claim not found");
  return claim;
};

const mockUpdateClaim = async (id: string, data: Record<string, unknown>) => {
  await delay(500);
  return { id, ...data };
};

const mockDeleteClaim = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all claims
export const useGetClaims = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["claims", params],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllClaims(params);
      }
      const response = await queryFn<ClaimsResponse>(
        AppServices.claims.get_all_claims(params)
      );
      // Return the full response structure to match the new API format
      return response;
    },
  });
};

// Alias for consistency with other modules

// Fetch single claim
export const useGetClaim = (claimId: string | undefined) => {
  return useQuery({
    queryKey: ["claim", claimId],
    queryFn: async () => {
      if (!claimId) throw new Error("Claim ID is required");

      if (USE_MOCK) {
        return mockGetClaim(claimId);
      }
      const response = await queryFn<BaseSuccessResponse<Claim>>(
        AppServices.claims.get_id_claim(claimId)
      );
      return response.data;
    },
    enabled: !!claimId,
  });
};

// Update claim
export const useUpdateClaim = () => {
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
        return mockUpdateClaim(id, data);
      }
      return queryFn(AppServices.claims.update_claim(id, data));
    },
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["claim", id] });
      }
    },
  });
};

// Delete claim
export const useDeleteClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claimId: string) => {
      if (USE_MOCK) {
        return mockDeleteClaim(claimId);
      }
      return queryFn(AppServices.claims.delete_claim(claimId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
};
