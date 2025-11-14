import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BaseSuccessResponse,
  Medication,
  MedicationsResponse,
  PaginatedData,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data generator
const generateMockMedications = (): Medication[] => [
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
const mockGetAllMedications = async (
  params?: Record<string, unknown>
): Promise<PaginatedData<Medication>> => {
  await delay(500);
  let medications = generateMockMedications();

  // Apply filters if params exist
  if (params?.search) {
    const search = (params.search as string).toLowerCase();
    medications = medications.filter((m) =>
      m.name.toLowerCase().includes(search)
    );
  }
  if (params?.status) {
    medications = medications.filter((m) => m.status === params.status);
  }

  // Return paginated response
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;

  return {
    medications,
    page,
    limit,
    total: medications.length,
  };
};

const mockGetMedication = async (id: string) => {
  await delay(300);
  const medications = generateMockMedications();
  const medication = medications.find((m) => m.id === id);
  if (!medication) throw new Error("Medication package not found");
  return medication;
};

const mockUpsertMedication = async (
  id: string | null,
  data: Record<string, unknown>
) => {
  await delay(500);
  if (!id) {
    // Create
    return { id: `m${Date.now()}`, ...data };
  }
  // Update
  return { id, ...data };
};

const mockDeleteMedication = async (id: string) => {
  await delay(500);
  return { success: true, id };
};

// Fetch all medication packages
export const useGetMedications = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [`medications-${params}`],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllMedications(params);
      }
      const response = await queryFn<MedicationsResponse>(
        AppServices.medications.get_all_medications(params)
      );
      return response.data;
    },
  });
};

// Fetch single medication package
export const useGetMedication = (medicationId: string | undefined) => {
  return useQuery({
    queryKey: [`medication-${medicationId}`],
    queryFn: async () => {
      if (!medicationId) throw new Error("Medication ID is required");

      if (USE_MOCK) {
        return mockGetMedication(medicationId);
      }
      const response = await queryFn<BaseSuccessResponse<Medication>>(
        AppServices.medications.get_id_medication(medicationId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!medicationId,
  });
};

// Upsert medication package (create or update)
export const useUpsertMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | null;
      data: Record<string, unknown>;
    }) => {
      if (USE_MOCK) {
        return mockUpsertMedication(id, data);
      }

      if (!id || typeof id !== "string") {
        return queryFn(AppServices.medications.create_medication(data));
      }
      return queryFn(AppServices.medications.update_medication(id, data));
    },
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: [`medications`] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: [`medication-${id}`] });
      }
    },
  });
};

// Delete medication package
export const useDeleteMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (medicationId: string) => {
      if (USE_MOCK) {
        return mockDeleteMedication(medicationId);
      }
      return queryFn(AppServices.medications.delete_medication(medicationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`medications`] });
    },
  });
};
