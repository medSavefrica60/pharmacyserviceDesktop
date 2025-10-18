import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/hooks/common/table/columns/use-users-table-columns";

// Mock data - Replace with actual API calls
const mockUsers: User[] = [
  {
    id: "u001",
    name: "John Doe",
    email: "john.doe@medsave.com",
    role: "Administrator",
    dateJoined: "2024-01-15T10:20:00Z",
    medsaveId: "MS001234",
    avatar: "/placeholder-user.jpg",
    status: "Active",
  },
  {
    id: "u002",
    name: "Jane Smith",
    email: "jane.smith@medsave.com",
    role: "Manager",
    dateJoined: "2024-02-20T08:15:00Z",
    medsaveId: "MS001235",
    status: "Active",
  },
  {
    id: "u003",
    name: "Michael Johnson",
    email: "michael.j@medsave.com",
    role: "Staff",
    dateJoined: "2024-03-10T14:30:00Z",
    medsaveId: "MS001236",
    status: "Inactive",
  },
  {
    id: "u004",
    name: "Sarah Williams",
    email: "sarah.w@medsave.com",
    role: "Manager",
    dateJoined: "2024-01-05T09:00:00Z",
    medsaveId: "MS001237",
    status: "Active",
  },
  {
    id: "u005",
    name: "David Brown",
    email: "david.b@medsave.com",
    role: "Staff",
    dateJoined: "2024-04-12T11:45:00Z",
    medsaveId: "MS001238",
    status: "Active",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all users
export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await delay(500); // Simulate API delay
      // TODO: Replace with actual API call
      // const response = await fetch('/api/users');
      // return response.json();
      return mockUsers;
    },
  });
};

// Fetch single user
export const useGetUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/users/${userId}`);
      // return response.json();
      const user = mockUsers.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");
      return user;
    },
    enabled: !!userId,
  });
};

// Create or update user
export const useUpsertUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<User> & { id?: string }) => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/users', {
      //   method: user.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user),
      // });
      // return response.json();
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await delay(500);
      // TODO: Replace with actual API call
      // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
