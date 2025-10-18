import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Package } from "@/hooks/common/table/columns/use-packages-table-columns";

// Mock data - Replace with actual API calls
const mockPackages: Package[] = [
  {
    id: "pkg001",
    packageId: "PKG-2024-001",
    name: "Basic Medication Plan",
    description: "Essential medications for common ailments",
    price: "₵150.00",
    duration: "12 months",
    coverage: "Basic medications only",
    status: "Active",
    memberCount: 245,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "pkg002",
    packageId: "PKG-2024-002",
    name: "Comprehensive Medication Plan",
    description: "Full coverage for chronic and acute conditions",
    price: "₵350.00",
    duration: "12 months",
    coverage: "All medications + specialist consultations",
    status: "Active",
    memberCount: 189,
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "pkg003",
    packageId: "PKG-2024-003",
    name: "Family Medication Plan",
    description: "Coverage for entire family unit",
    price: "₵450.00",
    duration: "12 months",
    coverage: "Family coverage up to 6 members",
    status: "Active",
    memberCount: 156,
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "pkg004",
    packageId: "PKG-2024-004",
    name: "Student Medication Plan",
    description: "Affordable plan for students",
    price: "₵100.00",
    duration: "12 months",
    coverage: "Basic medications with student discount",
    status: "Active",
    memberCount: 78,
    createdAt: "2024-02-10T11:45:00Z",
  },
  {
    id: "pkg005",
    packageId: "PKG-2024-005",
    name: "Premium Medication Plan",
    description: "Premium coverage with priority access",
    price: "₵500.00",
    duration: "12 months",
    coverage: "Premium medications + priority consultations",
    status: "Active",
    memberCount: 92,
    createdAt: "2024-02-15T16:20:00Z",
  },
  {
    id: "pkg006",
    packageId: "PKG-2024-006",
    name: "Chronic Disease Plan",
    description: "Specialized plan for chronic conditions",
    price: "₵250.00",
    duration: "12 months",
    coverage: "Chronic disease medications + monitoring",
    status: "Active",
    memberCount: 134,
    createdAt: "2024-03-01T13:00:00Z",
  },
  {
    id: "pkg007",
    packageId: "PKG-2024-007",
    name: "Senior Citizen Plan",
    description: "Specialized plan for senior citizens",
    price: "₵200.00",
    duration: "12 months",
    coverage: "Senior-focused medications + geriatric care",
    status: "Inactive",
    memberCount: 45,
    createdAt: "2024-03-10T10:30:00Z",
  },
  {
    id: "pkg008",
    packageId: "PKG-2024-008",
    name: "Emergency Care Plan",
    description: "Emergency and urgent care coverage",
    price: "₵300.00",
    duration: "12 months",
    coverage: "Emergency medications + urgent care access",
    status: "Suspended",
    memberCount: 67,
    createdAt: "2024-03-20T15:45:00Z",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all packages
export const useGetPackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/packages');
      // return response.json();
      return mockPackages;
    },
  });
};

// Fetch single package
export const useGetPackage = (packageId: string | undefined) => {
  return useQuery({
    queryKey: ["package", packageId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/packages/${packageId}`);
      // return response.json();
      const packageData = mockPackages.find((p) => p.id === packageId);
      if (!packageData) throw new Error("Package not found");
      return packageData;
    },
    enabled: !!packageId,
  });
};

// Delete package
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/packages/${packageId}`, { method: 'DELETE' });
      return packageId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
