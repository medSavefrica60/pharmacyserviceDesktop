import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";

// Mock data - Replace with actual API calls
const mockContributions: Contribution[] = [
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

// Fetch all contributions
export const useGetContributions = () => {
  return useQuery({
    queryKey: ["contributions"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/contributions');
      // return response.json();
      return mockContributions;
    },
  });
};

// Fetch single contribution
export const useGetContribution = (contributionId: string | undefined) => {
  return useQuery({
    queryKey: ["contribution", contributionId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/contributions/${contributionId}`);
      // return response.json();
      const contribution = mockContributions.find(
        (c) => c.id === contributionId
      );
      if (!contribution) throw new Error("Contribution not found");
      return contribution;
    },
    enabled: !!contributionId,
  });
};

// Delete contribution
export const useDeleteContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contributionId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/contributions/${contributionId}`, { method: 'DELETE' });
      return contributionId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
    },
  });
};
