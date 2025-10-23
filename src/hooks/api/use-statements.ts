import { useQuery } from "@tanstack/react-query";
import { Statement } from "@/hooks/common/table/columns/use-statements-table-columns";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Enable/disable mock mode
const USE_MOCK = false;

// Mock data for users (for search functionality)
export type User = {
  id: string;
  name: string;
  email: string;
  memberId: string;
};

// Mock users generator
const generateMockUsers = (): User[] => [
  {
    id: "USR001",
    name: "Kwame Mensah",
    email: "kwame@example.com",
    memberId: "MS001234",
  },
  {
    id: "USR002",
    name: "Ama Osei",
    email: "ama@example.com",
    memberId: "MS001235",
  },
  {
    id: "USR003",
    name: "Kofi Asante",
    email: "kofi@example.com",
    memberId: "MS001236",
  },
  {
    id: "USR004",
    name: "Akua Boateng",
    email: "akua@example.com",
    memberId: "MS001237",
  },
  {
    id: "USR005",
    name: "Yaw Owusu",
    email: "yaw@example.com",
    memberId: "MS001238",
  },
  {
    id: "USR006",
    name: "Abena Appiah",
    email: "abena@example.com",
    memberId: "MS001239",
  },
  {
    id: "USR007",
    name: "Samuel Opoku",
    email: "samuel@example.com",
    memberId: "MS001240",
  },
  {
    id: "USR008",
    name: "Grace Adjei",
    email: "grace@example.com",
    memberId: "MS001241",
  },
  {
    id: "USR009",
    name: "Michael Boateng",
    email: "michael@example.com",
    memberId: "MS001242",
  },
  {
    id: "USR010",
    name: "Rita Osei",
    email: "rita@example.com",
    memberId: "MS001243",
  },
  {
    id: "USR011",
    name: "Daniel Kuffuor",
    email: "daniel@example.com",
    memberId: "MS001244",
  },
  {
    id: "USR012",
    name: "Linda Kwasi",
    email: "linda@example.com",
    memberId: "MS001245",
  },
  {
    id: "USR013",
    name: "Joseph Armah",
    email: "joseph@example.com",
    memberId: "MS001246",
  },
  {
    id: "USR014",
    name: "Efua Darko",
    email: "efua@example.com",
    memberId: "MS001247",
  },
  {
    id: "USR015",
    name: "Nana Ama",
    email: "nana@example.com",
    memberId: "MS001248",
  },
];

// Mock statements generator
const generateMockStatements = (): Statement[] => [
  // Kwame Mensah statements
  {
    id: "stmt001",
    statementId: "STMT-2024-001",
    userId: "USR001",
    userName: "Kwame Mensah",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵450.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt002",
    statementId: "STMT-2024-002",
    userId: "USR001",
    userName: "Kwame Mensah",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵380.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },
  {
    id: "stmt003",
    statementId: "STMT-2024-003",
    userId: "USR001",
    userName: "Kwame Mensah",
    period: "July 2024",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    totalAmount: "₵520.00",
    status: "Paid",
    generatedDate: "2024-07-31T10:00:00Z",
    dueDate: "2024-08-15T23:59:59Z",
  },
  // Ama Osei statements
  {
    id: "stmt004",
    statementId: "STMT-2024-004",
    userId: "USR002",
    userName: "Ama Osei",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵250.00",
    status: "Pending",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt005",
    statementId: "STMT-2024-005",
    userId: "USR002",
    userName: "Ama Osei",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵180.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },
  // Kofi Asante statements
  {
    id: "stmt006",
    statementId: "STMT-2024-006",
    userId: "USR003",
    userName: "Kofi Asante",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵320.00",
    status: "Overdue",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt007",
    statementId: "STMT-2024-007",
    userId: "USR003",
    userName: "Kofi Asante",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵280.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },
  // Additional statements for other users...
  {
    id: "stmt008",
    statementId: "STMT-2024-008",
    userId: "USR004",
    userName: "Akua Boateng",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵180.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt009",
    statementId: "STMT-2024-009",
    userId: "USR005",
    userName: "Yaw Owusu",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵350.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt010",
    statementId: "STMT-2024-010",
    userId: "USR006",
    userName: "Abena Appiah",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵420.00",
    status: "Pending",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockSearchUsers = async (query: string) => {
  await delay(300);
  const users = generateMockUsers();

  if (!query.trim()) {
    return users;
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.memberId.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );
  return filteredUsers;
};

const mockGetUserStatements = async (
  userId: string,
  params?: Record<string, unknown>
) => {
  await delay(500);
  const statements = generateMockStatements();
  let filteredStatements = statements.filter((stmt) => stmt.userId === userId);

  // Filter by date range if provided
  if (params?.startDate && params?.endDate) {
    filteredStatements = filteredStatements.filter((stmt) => {
      const stmtDate = new Date(stmt.startDate);
      const start = new Date(params.startDate as string);
      const end = new Date(params.endDate as string);
      return stmtDate >= start && stmtDate <= end;
    });
  }

  // Pagination
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStatements = filteredStatements.slice(startIndex, endIndex);

  return {
    statements: paginatedStatements,
    total: filteredStatements.length,
    page,
    limit,
    totalPages: Math.ceil(filteredStatements.length / limit),
  };
};

const mockGetStatement = async (id: string) => {
  await delay(300);
  const statements = generateMockStatements();
  const statement = statements.find((s) => s.id === id);
  if (!statement) throw new Error("Statement not found");
  return statement;
};

const mockGetAllStatements = async (params?: Record<string, unknown>) => {
  await delay(500);
  const statements = generateMockStatements();
  let filteredStatements = [...statements];

  // Apply filters
  if (params?.userId) {
    filteredStatements = filteredStatements.filter(
      (stmt) => stmt.userId === params.userId
    );
  }

  if (params?.startDate && params?.endDate) {
    filteredStatements = filteredStatements.filter((stmt) => {
      const stmtDate = new Date(stmt.startDate);
      const start = new Date(params.startDate as string);
      const end = new Date(params.endDate as string);
      return stmtDate >= start && stmtDate <= end;
    });
  }

  if (params?.status) {
    filteredStatements = filteredStatements.filter(
      (stmt) => stmt.status === params.status
    );
  }

  // Pagination
  const page = (params?.page as number) || 1;
  const limit = (params?.limit as number) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStatements = filteredStatements.slice(startIndex, endIndex);

  return {
    statements: paginatedStatements,
    total: filteredStatements.length,
    page,
    limit,
    totalPages: Math.ceil(filteredStatements.length / limit),
  };
};

// Search users by name or member ID
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: async () => {
      if (USE_MOCK) {
        return mockSearchUsers(query);
      }
      // For real API, would use AppServices.users.get_all_users with search param
      return queryFn<User[]>(
        AppServices.users.get_all_users({ search: query })
      );
    },
    enabled: true,
  });
};

// Fetch statements for a specific user
export const useGetUserStatements = (
  userId: string | undefined,
  params?: Record<string, unknown>
) => {
  return useQuery({
    queryKey: ["statements", "user", userId, params],
    queryFn: async () => {
      if (!userId) return { statements: [], total: 0, page: 1, limit: 20 };

      if (USE_MOCK) {
        return mockGetUserStatements(userId, params);
      }
      return queryFn(AppServices.users.get_user_statements(userId, params));
    },
    enabled: !!userId,
  });
};

// Fetch single statement
export const useGetStatement = (statementId: string | undefined) => {
  return useQuery({
    queryKey: ["statement", statementId],
    queryFn: async () => {
      if (!statementId) throw new Error("Statement ID is required");

      if (USE_MOCK) {
        return mockGetStatement(statementId);
      }
      // Assuming there's a statement endpoint
      return queryFn<Statement>(
        AppServices.users.get_user_statements(statementId)
      );
    },
    enabled: !!statementId,
  });
};

// Fetch all statements with advanced filtering
export const useGetAllStatements = (
  id: string,
  params?: Record<string, unknown>
) => {
  return useQuery({
    queryKey: ["statements", "all", params],
    enabled: !!id,
    queryFn: async () => {
      return queryFn(AppServices.users.get_user_statements(id, params));
    },
  });
};

// Fetch mini statement for a user (last 10 transactions)
export const useGetUserMiniStatement = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["statements", "mini", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      if (USE_MOCK) {
        // Return mock data matching the new API structure
        return {
          status: "success",
          code: 200,
          message: "Transaction history retrieved successfully",
          timestamp: new Date().toISOString(),
          data: {
            user: {
              medsaveId: "MS07648",
              name: "Daniel Amoako Kodua",
              phone: "+233543482189",
            },
            wallet: {
              currentBalance: 0,
            },
            period: {
              startDate: "2025-10-22T13:01:47.504Z",
              endDate: "2025-10-22T13:04:28.342Z",
            },
            transactions: [
              {
                id: "be32ba6b-619e-4d03-85da-0cc9c37782b3",
                type: "CLAIM_PAYMENT",
                amount: 600,
                status: "completed",
                description: "Claim approved: CLM-20251022-58FZQ5",
                referenceNumber: "CLM-20251022-58FZQ5",
                createdAt: "2025-10-22T13:04:28.342Z",
                completedAt: null,
              },
              {
                id: "03241382-fc5d-443d-986e-22dec59082dc",
                type: "DEPOSIT",
                amount: 1200,
                status: "completed",
                description: "USSD deposit to Diabetes Package",
                referenceNumber: "USSD-DEP-1761138107686-LQRAL4",
                createdAt: "2025-10-22T13:01:47.504Z",
                completedAt: null,
              },
            ],
            summary: {
              totalTransactions: 2,
              totalDeposits: 1200,
              totalWithdrawals: 0,
              totalContributions: 0,
              totalClaims: 600,
            },
          },
        };
      }
      const response = await queryFn(
        AppServices.users.get_user_mini_statement(userId)
      );
      // Return the full response structure to match the new API format
      return response;
    },
    enabled: !!userId,
  });
};
