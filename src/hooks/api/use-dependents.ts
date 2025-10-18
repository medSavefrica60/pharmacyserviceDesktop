import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dependent } from "@/hooks/common/table/columns/use-dependents-table-columns";

// Mock data - Replace with actual API calls
const mockDependents: Dependent[] = [
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

// Fetch all dependents
export const useGetDependents = () => {
  return useQuery({
    queryKey: ["dependents"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/dependents');
      // return response.json();
      return mockDependents;
    },
  });
};

// Fetch single dependent
export const useGetDependent = (dependentId: string | undefined) => {
  return useQuery({
    queryKey: ["dependent", dependentId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/dependents/${dependentId}`);
      // return response.json();
      const dependent = mockDependents.find((d) => d.id === dependentId);
      if (!dependent) throw new Error("Dependent not found");
      return dependent;
    },
    enabled: !!dependentId,
  });
};

// Create or update dependent
export const useUpsertDependent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dependent: Partial<Dependent> & { id?: string }) => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/dependents', {
      //   method: dependent.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dependent),
      // });
      // return response.json();
      return dependent;
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
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/dependents/${dependentId}`, { method: 'DELETE' });
      return dependentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependents"] });
    },
  });
};
