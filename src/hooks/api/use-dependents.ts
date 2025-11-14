import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dependent, DependentsResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator
const generateMockDependents = (): Dependent[] => [
  {
    id: "d001",
    dependentPhone: "+233241234567",
    dependentName: "Akosua Mensah",
    relationship: "spouse",
    status: "active",
    createdAt: "2024-01-15T10:20:00Z",
    updatedAt: "2024-01-15T10:20:00Z",
    user: {
      id: "u001",
      firstName: "Kwame",
      lastName: "Mensah",
      phoneNumber: "+233241234567",
    },
  },
  {
    id: "d002",
    dependentPhone: "+233241234568",
    dependentName: "Kofi Mensah",
    relationship: "child",
    status: "active",
    createdAt: "2024-01-15T10:25:00Z",
    updatedAt: "2024-01-15T10:25:00Z",
    user: {
      id: "u001",
      firstName: "Kwame",
      lastName: "Mensah",
      phoneNumber: "+233241234567",
    },
  },
  {
    id: "d003",
    dependentPhone: "+233241234569",
    dependentName: "Abena Osei",
    relationship: "child",
    status: "active",
    createdAt: "2024-02-20T08:15:00Z",
    updatedAt: "2024-02-20T08:15:00Z",
    user: {
      id: "u002",
      firstName: "John",
      lastName: "Osei",
      phoneNumber: "+233241234570",
    },
  },
  {
    id: "d004",
    dependentPhone: "+233241234571",
    dependentName: "Samuel Asante",
    relationship: "parent",
    status: "inactive",
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-10T14:30:00Z",
    user: {
      id: "u003",
      firstName: "Michael",
      lastName: "Asante",
      phoneNumber: "+233241234571",
    },
  },
  {
    id: "d005",
    dependentPhone: "+233241234572",
    dependentName: "Grace Boateng",
    relationship: "spouse",
    status: "active",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-01-05T09:00:00Z",
    user: {
      id: "u004",
      firstName: "David",
      lastName: "Boateng",
      phoneNumber: "+233241234572",
    },
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllDependents = async (
  params?: Record<string, unknown>
): Promise<{
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  dependents: Dependent[];
}> => {
  await delay(500);
  let dependents = generateMockDependents();

  // Apply filters if params exist
  if (params?.userId) {
    dependents = dependents.filter((d) => d.user.id === params.userId);
  }
  if (params?.status) {
    dependents = dependents.filter((d) => d.status === params.status);
  }

  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;
  const total = dependents.length;
  const totalPages = Math.ceil(total / limit);

  return {
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
    dependents,
  };
};

const mockGetDependent = async (id: string) => {
  await delay(300);
  const dependents = generateMockDependents();
  const dependent = dependents.find((d) => d.id === id);
  if (!dependent) throw new Error("Dependent not found");
  return dependent;
};

const mockCreateDependent = async (data: Record<string, unknown>) => {
  await delay(500);
  return { id: `d${Date.now()}`, ...data };
};

const mockUpdateDependent = async (
  id: string,
  data: Record<string, unknown>
) => {
  await delay(500);
  return { id, ...data };
};

const mockDeleteDependent = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all dependents
export const useGetDependents = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["dependents", params],
    queryFn: async () => {
      const response = await queryFn<DependentsResponse>(
        AppServices.dependents.get_all_dependents(params)
      );
      return response.data;
    },
  });
};

// Fetch single dependent
export const useGetDependent = (dependentId: string | undefined) => {
  return useQuery({
    queryKey: ["dependent", dependentId],
    queryFn: async () => {
      if (!dependentId) throw new Error("Dependent ID is required");

      const response = await queryFn<BaseSuccessResponse<Dependent>>(
        AppServices.dependents.get_id_dependent(dependentId)
      );
      return response.data;
    },
    enabled: !!dependentId,
  });
};

// Create dependent
export const useCreateDependent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      if (USE_MOCK) {
        return mockCreateDependent(data);
      }
      return queryFn(AppServices.dependents.create_dependent(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
    },
  });
};

// Update dependent
export const useUpdateDependent = () => {
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
        return mockUpdateDependent(id, data);
      }
      return queryFn(AppServices.dependents.update_dependent(id, data));
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["dependent", id] });
      }
    },
  });
};

// Delete dependent
export const useDeleteDependent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dependentId: string) => {
      if (USE_MOCK) {
        return mockDeleteDependent(dependentId);
      }
      return queryFn(AppServices.dependents.delete_dependent(dependentId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
    },
  });
};
