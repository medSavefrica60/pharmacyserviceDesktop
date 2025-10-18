import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MedicationPackage } from "@/hooks/common/table/columns/use-medications-table-columns";

// Mock data - Replace with actual API calls
const mockMedications: MedicationPackage[] = [
  {
    id: "m001",
    packageName: "Basic Medication Plan",
    packageCode: "MED-BASIC-001",
    category: "Basic",
    coverage: "Essential Medications",
    monthlyPremium: "₵150.00",
    annualLimit: "₵5,000.00",
    description: "Covers basic medications and prescriptions",
    dateCreated: "2024-01-15T10:20:00Z",
    status: "Active",
  },
  {
    id: "m002",
    packageName: "Comprehensive Medication Plan",
    packageCode: "MED-COMP-002",
    category: "Comprehensive",
    coverage: "All Medications",
    monthlyPremium: "₵350.00",
    annualLimit: "₵15,000.00",
    description: "Comprehensive coverage for all medications",
    dateCreated: "2024-01-20T08:15:00Z",
    status: "Active",
  },
  {
    id: "m003",
    packageName: "Chronic Disease Plan",
    packageCode: "MED-CHRONIC-003",
    category: "Specialized",
    coverage: "Chronic Medications",
    monthlyPremium: "₵250.00",
    annualLimit: "₵10,000.00",
    description: "Specialized coverage for chronic disease medications",
    dateCreated: "2024-02-10T14:30:00Z",
    status: "Active",
  },
  {
    id: "m004",
    packageName: "Premium Medication Plan",
    packageCode: "MED-PREM-004",
    category: "Premium",
    coverage: "All + Specialty Drugs",
    monthlyPremium: "₵500.00",
    annualLimit: "₵25,000.00",
    description: "Premium coverage including specialty medications",
    dateCreated: "2024-03-05T09:00:00Z",
    status: "Inactive",
  },
  {
    id: "m005",
    packageName: "Family Medication Plan",
    packageCode: "MED-FAMILY-005",
    category: "Family",
    coverage: "Family Coverage",
    monthlyPremium: "₵450.00",
    annualLimit: "₵20,000.00",
    description: "Comprehensive medication coverage for families",
    dateCreated: "2024-04-12T11:45:00Z",
    status: "Active",
  },
  {
    id: "m006",
    packageName: "Student Medication Plan",
    packageCode: "MED-STUDENT-006",
    category: "Student",
    coverage: "Basic + Emergency",
    monthlyPremium: "₵100.00",
    annualLimit: "₵3,000.00",
    description: "Affordable plan for students",
    dateCreated: "2024-05-01T10:00:00Z",
    status: "Draft",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all medication packages
export const useGetMedications = () => {
  return useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/medications');
      // return response.json();
      return mockMedications;
    },
  });
};

// Fetch single medication package
export const useGetMedication = (medicationId: string | undefined) => {
  return useQuery({
    queryKey: ["medication", medicationId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/medications/${medicationId}`);
      // return response.json();
      const medication = mockMedications.find((m) => m.id === medicationId);
      if (!medication) throw new Error("Medication package not found");
      return medication;
    },
    enabled: !!medicationId,
  });
};

// Create or update medication package
export const useUpsertMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      medication: Partial<MedicationPackage> & { id?: string }
    ) => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/medications', {
      //   method: medication.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(medication),
      // });
      // return response.json();
      return medication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

// Delete medication package
export const useDeleteMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (medicationId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/medications/${medicationId}`, { method: 'DELETE' });
      return medicationId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};
