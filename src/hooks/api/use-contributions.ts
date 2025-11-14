import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = true;

// Mock data generator
const generateMockContributions = (): Contribution[] => [
  {
    id: "con001",
    contributionId: "CONT-2024-001",
    memberName: "Kwame Mensah",
    memberId: "MS001234",
    packageName: "Comprehensive Medication Plan",
    amount: "₵350.00",
    paymentDate: "2024-10-15T10:30:00Z",
    paymentMethod: "Mobile Money",
    status: "Completed",
  },
  {
    id: "con002",
    contributionId: "CONT-2024-002",
    memberName: "Ama Osei",
    memberId: "MS001235",
    packageName: "Basic Medication Plan",
    amount: "₵150.00",
    paymentDate: "2024-10-14T14:20:00Z",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "con003",
    contributionId: "CONT-2024-003",
    memberName: "Kofi Asante",
    memberId: "MS001236",
    packageName: "Chronic Disease Plan",
    amount: "₵250.00",
    paymentDate: "2024-10-13T09:15:00Z",
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "con004",
    contributionId: "CONT-2024-004",
    memberName: "Akua Boateng",
    memberId: "MS001237",
    packageName: "Premium Medication Plan",
    amount: "₵500.00",
    paymentDate: "2024-10-12T16:45:00Z",
    paymentMethod: "Mobile Money",
    status: "Pending",
  },
  {
    id: "con005",
    contributionId: "CONT-2024-005",
    memberName: "Yaw Owusu",
    memberId: "MS001238",
    packageName: "Family Medication Plan",
    amount: "₵450.00",
    paymentDate: "2024-10-11T11:00:00Z",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "con006",
    contributionId: "CONT-2024-006",
    memberName: "Abena Appiah",
    memberId: "MS001239",
    packageName: "Student Medication Plan",
    amount: "₵100.00",
    paymentDate: "2024-10-10T13:30:00Z",
    paymentMethod: "Mobile Money",
    status: "Failed",
  },
  {
    id: "con007",
    contributionId: "CONT-2024-007",
    memberName: "Kojo Amoah",
    memberId: "MS001240",
    packageName: "Basic Medication Plan",
    amount: "₵150.00",
    paymentDate: "2024-10-09T10:00:00Z",
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "con008",
    contributionId: "CONT-2024-008",
    memberName: "Efua Darko",
    memberId: "MS001241",
    packageName: "Comprehensive Medication Plan",
    amount: "₵350.00",
    paymentDate: "2024-10-08T15:20:00Z",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockGetAllContributions = async (params?: Record<string, unknown>) => {
  await delay(500);
  let contributions = generateMockContributions();

  // Apply filters if params exist
  if (params?.userId) {
    contributions = contributions.filter((c) => c.memberId === params.userId);
  }
  if (params?.startDate) {
    contributions = contributions.filter(
      (c) => new Date(c.paymentDate) >= new Date(params.startDate as string)
    );
  }
  if (params?.endDate) {
    contributions = contributions.filter(
      (c) => new Date(c.paymentDate) <= new Date(params.endDate as string)
    );
  }

  return contributions;
};

const mockGetContribution = async (id: string) => {
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
    queryKey: [`contributions-${params}`],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockGetAllContributions(params);
      }
      return queryFn<Contribution[]>(
        AppServices.contributions.get_all_contributions(params)
      );
    },
  });
};

// Fetch single contribution
export const useGetContribution = (contributionId: string | undefined) => {
  return useQuery({
    queryKey: [`contribution-${contributionId}`],
    queryFn: async () => {
      if (!contributionId) throw new Error("Contribution ID is required");

      if (USE_MOCK) {
        return mockGetContribution(contributionId);
      }
      return queryFn<Contribution>(
        AppServices.contributions.get_id_contribution(contributionId)
      );
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
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: [`contributions`] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: [`contribution-${id}`] });
      }
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
    onSuccess: (response, { id }) => {
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
