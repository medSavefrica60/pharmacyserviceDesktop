import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Package, PackagesResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator
const generateMockPackages = (): Package[] => [
  {
    id: "e5f15625-f58f-4f11-aeb3-bfc71df4aed3",
    name: "Diabetes Package",
    minAmount: 300,
    status: "ACTIVE",
    isActive: true,
    createdBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    updatedBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    createdAt: "2025-10-22T12:58:59.767Z",
    updatedAt: "2025-10-22T12:58:59.767Z",
    deletedAt: null,
  },
  {
    id: "d4431658-065e-433b-9af1-325516035825",
    name: "Hypertension Package",
    minAmount: 300,
    status: "ACTIVE",
    isActive: true,
    createdBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    updatedBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    createdAt: "2025-10-22T12:58:47.129Z",
    updatedAt: "2025-10-22T12:58:47.129Z",
    deletedAt: null,
  },
  {
    id: "ffc0eb67-5d06-4a82-84ec-fcc3f91c723e",
    name: "Malaria Package",
    minAmount: 1000,
    status: "ACTIVE",
    isActive: true,
    createdBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    updatedBy: "358bfc6f-ac6e-4a90-bcec-d9b21d42be79",
    createdAt: "2025-10-22T12:59:12.475Z",
    updatedAt: "2025-10-22T12:59:12.475Z",
    deletedAt: null,
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllPackages = async (params?: Record<string, unknown>) => {
  await delay(500);
  let packages = generateMockPackages();

  // Apply filters if params exist
  if (params?.status) {
    packages = packages.filter((p) => p.status === params.status);
  }

  return {
    packages,
    pagination: {
      page: 1,
      limit: 50,
      total: packages.length,
      totalPages: 1,
    },
  };
};

const mockGetPackage = async (id: string) => {
  await delay(300);
  const packages = generateMockPackages();
  const packageData = packages.find((p) => p.id === id);
  if (!packageData) throw new Error("Package not found");
  return packageData;
};

const mockCreatePackage = async (data: Record<string, unknown>) => {
  await delay(500);
  return { id: `pkg${Date.now()}`, ...data };
};

const mockUpdatePackage = async (id: string, data: Record<string, unknown>) => {
  await delay(500);
  return { id, ...data };
};

const mockDeletePackage = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all packages
export const useGetPackages = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["packages", params],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllPackages(params);
      }
      const response = await queryFn<PackagesResponse>(
        AppServices.packages.get_all_packages(params)
      );
      return response.data;
    },
  });
};

// Fetch single package
export const useGetPackage = (packageId: string | undefined) => {
  return useQuery({
    queryKey: ["package", packageId],
    queryFn: async () => {
      if (!packageId) throw new Error("Package ID is required");

      if (USE_MOCK) {
        return mockGetPackage(packageId);
      }
      const response = await queryFn<BaseSuccessResponse<Package>>(
        AppServices.packages.get_id_package(packageId)
      );
      return response.data;
    },
    enabled: !!packageId,
  });
};

// Create package
export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (USE_MOCK) {
        return mockCreatePackage(data);
      }
      return queryFn(AppServices.packages.create_package(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};

// Update package
export const useUpdatePackage = () => {
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
        return mockUpdatePackage(id, data);
      }
      return queryFn(AppServices.packages.update_package(id, data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};

// Delete package
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      if (USE_MOCK) {
        return mockDeletePackage(packageId);
      }
      return queryFn(AppServices.packages.delete_package(packageId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
