import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Claim } from "@/hooks/common/table/columns/use-claims-table-columns";

// Mock data - Replace with actual API calls
const mockClaims: Claim[] = [
  {
    id: "c001",
    claimNumber: "CLM-2024-001",
    patientName: "Kwame Mensah",
    patientId: "PT-123456",
    providerName: "City General Hospital",
    providerId: "PRV-001234",
    serviceType: "General Consultation",
    claimDate: "2024-10-15T10:30:00Z",
    claimAmount: "₵450.00",
    approvedAmount: "₵450.00",
    status: "Approved",
  },
  {
    id: "c002",
    claimNumber: "CLM-2024-002",
    patientName: "Ama Osei",
    patientId: "PT-123457",
    providerName: "Wellness Clinic",
    providerId: "PRV-001235",
    serviceType: "Blood Test",
    claimDate: "2024-10-14T14:20:00Z",
    claimAmount: "₵250.00",
    approvedAmount: "₵0.00",
    status: "Pending",
  },
  {
    id: "c003",
    claimNumber: "CLM-2024-003",
    patientName: "Kofi Asante",
    patientId: "PT-123458",
    providerName: "Regional Medical Center",
    providerId: "PRV-001237",
    serviceType: "X-Ray Imaging",
    claimDate: "2024-10-13T09:15:00Z",
    claimAmount: "₵600.00",
    approvedAmount: "₵550.00",
    status: "Approved",
  },
  {
    id: "c004",
    claimNumber: "CLM-2024-004",
    patientName: "Akua Boateng",
    patientId: "PT-123459",
    providerName: "Hope Pharmacy",
    providerId: "PRV-001236",
    serviceType: "Prescription Medication",
    claimDate: "2024-10-12T16:45:00Z",
    claimAmount: "₵320.00",
    approvedAmount: "₵0.00",
    status: "Rejected",
  },
  {
    id: "c005",
    claimNumber: "CLM-2024-005",
    patientName: "Yaw Owusu",
    patientId: "PT-123460",
    providerName: "City General Hospital",
    providerId: "PRV-001234",
    serviceType: "Dental Checkup",
    claimDate: "2024-10-11T11:00:00Z",
    claimAmount: "₵180.00",
    approvedAmount: "₵180.00",
    status: "Approved",
  },
  {
    id: "c006",
    claimNumber: "CLM-2024-006",
    patientName: "Abena Appiah",
    patientId: "PT-123461",
    providerName: "Wellness Clinic",
    providerId: "PRV-001235",
    serviceType: "Physiotherapy Session",
    claimDate: "2024-10-10T13:30:00Z",
    claimAmount: "₵200.00",
    approvedAmount: "₵0.00",
    status: "Processing",
  },
  {
    id: "c007",
    claimNumber: "CLM-2024-007",
    patientName: "Kojo Amoah",
    patientId: "PT-123462",
    providerName: "Regional Medical Center",
    providerId: "PRV-001237",
    serviceType: "Eye Examination",
    claimDate: "2024-10-09T10:00:00Z",
    claimAmount: "₵120.00",
    approvedAmount: "₵120.00",
    status: "Approved",
  },
  {
    id: "c008",
    claimNumber: "CLM-2024-008",
    patientName: "Efua Darko",
    patientId: "PT-123463",
    providerName: "Wellness Clinic",
    providerId: "PRV-001235",
    serviceType: "Vaccination",
    claimDate: "2024-10-08T15:20:00Z",
    claimAmount: "₵80.00",
    approvedAmount: "₵80.00",
    status: "Approved",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all claims
export const useGetClaims = () => {
  return useQuery({
    queryKey: ["claims"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/claims');
      // return response.json();
      return mockClaims;
    },
  });
};

// Fetch single claim
export const useGetClaim = (claimId: string | undefined) => {
  return useQuery({
    queryKey: ["claim", claimId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/claims/${claimId}`);
      // return response.json();
      const claim = mockClaims.find((c) => c.id === claimId);
      if (!claim) throw new Error("Claim not found");
      return claim;
    },
    enabled: !!claimId,
  });
};

// Create or update claim
export const useUpsertClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claim: Partial<Claim> & { id?: string }) => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/claims', {
      //   method: claim.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(claim),
      // });
      // return response.json();
      return claim;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
};

// Delete claim
export const useDeleteClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claimId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/claims/${claimId}`, { method: 'DELETE' });
      return claimId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
};
