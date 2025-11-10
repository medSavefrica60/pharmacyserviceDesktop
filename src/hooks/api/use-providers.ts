import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Provider,
  ProvidersResponse,
  PaginatedData,
  BaseSuccessResponse,
  ProviderClaimsResponse,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator
const generateMockProviders = (): Provider[] => [
  {
    id: "68c77b01-f0b0-4a5b-9875-982b3f7b3b6e",
    email: "pantagoros@gmail.com",
    organizationName: "Saint's Medical Farm",
    licenseNumber: "BFD-3332-2026",
    address: "Tse Addo Labadi, Accra, Greater Accra, Ghana",
    contactPhone: "+233557466718",
    status: "ACTIVE",
    verificationDocuments: [
      {
        id: "a9700160-b86b-4171-85c7-f43f6a164ed3",
        size: 3890,
        type: "LICENSE",
        fileName: "receipt (5).pdf",
        filePath: "uploads/providers/provider-doc-1761139849833-826134136.pdf",
        verified: false,
        uploadedAt: "2025-10-22T13:30:49.878Z",
      },
      {
        id: "10aab167-688e-4c2b-811a-9ce872e9902b",
        size: 3890,
        type: "REGISTRATION_CERTIFICATE",
        fileName: "receipt (5).pdf",
        filePath: "uploads/providers/provider-doc-1761139849834-346041553.pdf",
        verified: false,
        uploadedAt: "2025-10-22T13:30:49.878Z",
      },
    ],
    emailVerifiedAt: "2025-10-22T13:34:28.408Z",
    failedLoginAttempts: 0,
    lockedUntil: null,
    lastLoginAt: "2025-10-22T13:55:47.416Z",
    lastLoginIp: "127.0.0.1",
    createdAt: "2025-10-22T13:31:33.296Z",
    updatedAt: "2025-10-22T13:56:11.745Z",
  },
  {
    id: "6e8d6080-af96-4111-b539-deef16d0e28f",
    email: "denfu.oscar.dev@gmail.com",
    organizationName: "Opas Labs",
    licenseNumber: "LCN-2025-001235",
    address:
      "St1 Konongo Habitat Estate, Juaso, Konongo Road, Konongo, Ashanti Region, Ghana",
    contactPhone: "+233592330177",
    status: "PENDING_VERIFICATION",
    verificationDocuments: [
      {
        id: "2118d982-0246-44c9-a92f-55c46f0fe866",
        size: 2317,
        type: "LICENSE",
        fileName: "download.jpeg",
        filePath: "uploads/providers/provider-doc-1761138970120-660959040.jpeg",
        verified: false,
        uploadedAt: "2025-10-22T13:16:10.151Z",
      },
    ],
    emailVerifiedAt: "2025-10-22T13:19:40.020Z",
    failedLoginAttempts: 0,
    lockedUntil: null,
    lastLoginAt: "2025-10-22T13:57:38.008Z",
    lastLoginIp: "127.0.0.1",
    createdAt: "2025-10-22T13:16:35.196Z",
    updatedAt: "2025-10-22T13:19:40.061Z",
  },
  {
    id: "94433c74-31fb-455d-a206-8fa9132388cc",
    email: "danielamoakokodua698@gmail.com",
    organizationName: "Laud K Pharmacy",
    licenseNumber: "LCN-2025-001237",
    address:
      "Eastssss Legon, Juaso, Konongo Road, Konongo, Ashanti Region, Ghana",
    contactPhone: "+233543482189",
    status: "ACTIVE",
    verificationDocuments: [
      {
        id: "3eae93ca-7ea8-4296-b3d6-24c4a896fad3",
        size: 91459,
        type: "LICENSE",
        fileName: "content.pdf",
        filePath: "uploads/providers/provider-doc-1761137132541-955161773.pdf",
        verified: false,
        uploadedAt: "2025-10-22T12:45:32.973Z",
      },
    ],
    emailVerifiedAt: "2025-10-22T12:47:50.214Z",
    failedLoginAttempts: 0,
    lockedUntil: null,
    lastLoginAt: null,
    lastLoginIp: null,
    createdAt: "2025-10-22T12:46:39.398Z",
    updatedAt: "2025-10-22T12:57:01.785Z",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllProviders = async (
  params?: Record<string, unknown>
): Promise<PaginatedData<Provider>> => {
  await delay(500);
  let providers = generateMockProviders();

  // Apply filters if params exist
  if (params?.search) {
    const search = (params.search as string).toLowerCase();
    providers = providers.filter(
      (p) =>
        p.organizationName.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search) ||
        p.address.toLowerCase().includes(search)
    );
  }
  if (params?.status) {
    providers = providers.filter((p) => p.status === params.status);
  }

  // Return paginated response
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;

  return {
    providers,
    page,
    limit,
    total: providers.length,
  };
};

// Fetch all providers
export const useGetProviders = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllProviders(params);
      }
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
    queryKey: [`provider-${providerId}`],
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
    queryKey: [`provider-claims-${providerId}`],
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
