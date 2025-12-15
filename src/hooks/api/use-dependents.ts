import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dependent, DependentsResponse, BaseSuccessResponse } from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

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
      return queryFn(AppServices.dependents.delete_dependent(dependentId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
    },
  });
};
