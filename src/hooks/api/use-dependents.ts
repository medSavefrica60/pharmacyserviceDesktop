import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dependent } from "@/hooks/common/table/columns/use-dependents-table-columns";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = true;

// Mock data generator
const generateMockDependents = (): Dependent[] => [
  {
    id: "d001",
    name: "Akosua Mensah",
    relationship: "Spouse",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    primaryMember: "Kwame Mensah",
    primaryMemberId: "MS001234",
    dateAdded: "2024-01-15T10:20:00Z",
    dependentId: "DEP001234",
    status: "Active",
  },
  {
    id: "d002",
    name: "Kofi Mensah",
    relationship: "Child",
    dateOfBirth: "2015-08-20",
    gender: "Male",
    primaryMember: "Kwame Mensah",
    primaryMemberId: "MS001234",
    dateAdded: "2024-01-15T10:25:00Z",
    dependentId: "DEP001235",
    status: "Active",
  },
  {
    id: "d003",
    name: "Abena Osei",
    relationship: "Child",
    dateOfBirth: "2018-03-10",
    gender: "Female",
    primaryMember: "John Osei",
    primaryMemberId: "MS001235",
    dateAdded: "2024-02-20T08:15:00Z",
    dependentId: "DEP001236",
    status: "Active",
  },
  {
    id: "d004",
    name: "Samuel Asante",
    relationship: "Parent",
    dateOfBirth: "1960-12-05",
    gender: "Male",
    primaryMember: "Michael Asante",
    primaryMemberId: "MS001236",
    dateAdded: "2024-03-10T14:30:00Z",
    dependentId: "DEP001237",
    status: "Inactive",
  },
  {
    id: "d005",
    name: "Grace Boateng",
    relationship: "Spouse",
    dateOfBirth: "1988-07-22",
    gender: "Female",
    primaryMember: "David Boateng",
    primaryMemberId: "MS001237",
    dateAdded: "2024-01-05T09:00:00Z",
    dependentId: "DEP001238",
    status: "Active",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllDependents = async (params?: Record<string, unknown>) => {
  await delay(500);
  let dependents = generateMockDependents();

  // Apply filters if params exist
  if (params?.userId) {
    dependents = dependents.filter((d) => d.primaryMemberId === params.userId);
  }
  if (params?.status) {
    dependents = dependents.filter((d) => d.status === params.status);
  }

  return dependents;
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
      if (USE_MOCK) {
        return mockGetAllDependents(params);
      }
      return queryFn<Dependent[]>(
        AppServices.dependents.get_all_dependents(params)
      );
    },
  });
};

// Fetch single dependent
export const useGetDependent = (dependentId: string | undefined) => {
  return useQuery({
    queryKey: ["dependent", dependentId],
    queryFn: async () => {
      if (!dependentId) throw new Error("Dependent ID is required");

      if (USE_MOCK) {
        return mockGetDependent(dependentId);
      }
      return queryFn<Dependent>(
        AppServices.dependents.get_id_dependent(dependentId)
      );
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
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
