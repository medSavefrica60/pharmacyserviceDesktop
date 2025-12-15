import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseSuccessResponse, Medication, MedicationsResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Fetch all medication packages
export const useGetMedications = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["medications", params],
    queryFn: async () => {
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
    queryKey: ["medication", medicationId],
    queryFn: async () => {
      if (!medicationId) throw new Error("Medication ID is required");
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
      if (!id || typeof id !== "string") {
        return queryFn(AppServices.medications.create_medication(data));
      }
      return queryFn(AppServices.medications.update_medication(id, data));
    },
    onSuccess: (_response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["medication", id] });
      }
    },
  });
};

// Delete medication package
export const useDeleteMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (medicationId: string) => {
      return queryFn(AppServices.medications.delete_medication(medicationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};
