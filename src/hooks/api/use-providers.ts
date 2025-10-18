import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Provider } from "@/hooks/common/table/columns/use-providers-table-columns";

// Mock data - Replace with actual API calls
const mockProviders: Provider[] = [
  {
    id: "p001",
    name: "City General Hospital",
    email: "contact@citygeneralhospital.com",
    phone: "+233 20 123 4567",
    facilityType: "Hospital",
    location: "Accra, Ghana",
    dateRegistered: "2024-01-15T10:20:00Z",
    providerId: "PRV001234",
    status: "Active",
  },
  {
    id: "p002",
    name: "Wellness Clinic",
    email: "info@wellnessclinic.com",
    phone: "+233 24 567 8901",
    facilityType: "Clinic",
    location: "Kumasi, Ghana",
    dateRegistered: "2024-02-20T08:15:00Z",
    providerId: "PRV001235",
    status: "Active",
  },
  {
    id: "p003",
    name: "Hope Pharmacy",
    email: "admin@hopepharmacy.com",
    phone: "+233 50 234 5678",
    facilityType: "Pharmacy",
    location: "Tamale, Ghana",
    dateRegistered: "2024-03-10T14:30:00Z",
    providerId: "PRV001236",
    status: "Inactive",
  },
  {
    id: "p004",
    name: "Regional Medical Center",
    email: "info@regionalmedical.com",
    phone: "+233 20 876 5432",
    facilityType: "Hospital",
    location: "Takoradi, Ghana",
    dateRegistered: "2024-01-05T09:00:00Z",
    providerId: "PRV001237",
    status: "Active",
  },
  {
    id: "p005",
    name: "Family Health Clinic",
    email: "contact@familyhealth.com",
    phone: "+233 24 111 2222",
    facilityType: "Clinic",
    location: "Cape Coast, Ghana",
    dateRegistered: "2024-04-12T11:45:00Z",
    providerId: "PRV001238",
    status: "Active",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all providers
export const useGetProviders = () => {
  return useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/providers');
      // return response.json();
      return mockProviders;
    },
  });
};

// Fetch single provider
export const useGetProvider = (providerId: string | undefined) => {
  return useQuery({
    queryKey: ["provider", providerId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/providers/${providerId}`);
      // return response.json();
      const provider = mockProviders.find((p) => p.id === providerId);
      if (!provider) throw new Error("Provider not found");
      return provider;
    },
    enabled: !!providerId,
  });
};

// Create or update provider
export const useUpsertProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provider: Partial<Provider> & { id?: string }) => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/providers', {
      //   method: provider.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(provider),
      // });
      // return response.json();
      return provider;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};

// Delete provider
export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (providerId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/providers/${providerId}`, { method: 'DELETE' });
      return providerId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};
