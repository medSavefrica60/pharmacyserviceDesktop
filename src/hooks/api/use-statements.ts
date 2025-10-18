import { useQuery } from "@tanstack/react-query";
import { Statement } from "@/hooks/common/table/columns/use-statements-table-columns";

// Mock data for users (for search functionality)
export type User = {
  id: string;
  name: string;
  email: string;
  memberId: string;
};

// Mock data for statements
const mockStatements: Statement[] = [
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

  // Akua Boateng statements
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
    userId: "USR004",
    userName: "Akua Boateng",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵220.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Yaw Owusu statements
  {
    id: "stmt010",
    statementId: "STMT-2024-010",
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
    id: "stmt011",
    statementId: "STMT-2024-011",
    userId: "USR005",
    userName: "Yaw Owusu",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵290.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Abena Appiah statements
  {
    id: "stmt012",
    statementId: "STMT-2024-012",
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
  {
    id: "stmt013",
    statementId: "STMT-2024-013",
    userId: "USR006",
    userName: "Abena Appiah",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵380.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Samuel Opoku statements
  {
    id: "stmt014",
    statementId: "STMT-2024-014",
    userId: "USR007",
    userName: "Samuel Opoku",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵150.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt015",
    statementId: "STMT-2024-015",
    userId: "USR007",
    userName: "Samuel Opoku",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵200.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Grace Adjei statements
  {
    id: "stmt016",
    statementId: "STMT-2024-016",
    userId: "USR008",
    userName: "Grace Adjei",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵480.00",
    status: "Overdue",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt017",
    statementId: "STMT-2024-017",
    userId: "USR008",
    userName: "Grace Adjei",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵350.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Michael Boateng statements
  {
    id: "stmt018",
    statementId: "STMT-2024-018",
    userId: "USR009",
    userName: "Michael Boateng",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵300.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt019",
    statementId: "STMT-2024-019",
    userId: "USR009",
    userName: "Michael Boateng",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵250.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Rita Osei statements
  {
    id: "stmt020",
    statementId: "STMT-2024-020",
    userId: "USR010",
    userName: "Rita Osei",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵400.00",
    status: "Pending",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt021",
    statementId: "STMT-2024-021",
    userId: "USR010",
    userName: "Rita Osei",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵320.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Daniel Kuffuor statements
  {
    id: "stmt022",
    statementId: "STMT-2024-022",
    userId: "USR011",
    userName: "Daniel Kuffuor",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵280.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt023",
    statementId: "STMT-2024-023",
    userId: "USR011",
    userName: "Daniel Kuffuor",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵240.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Linda Kwasi statements
  {
    id: "stmt024",
    statementId: "STMT-2024-024",
    userId: "USR012",
    userName: "Linda Kwasi",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵360.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt025",
    statementId: "STMT-2024-025",
    userId: "USR012",
    userName: "Linda Kwasi",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵310.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Joseph Armah statements
  {
    id: "stmt026",
    statementId: "STMT-2024-026",
    userId: "USR013",
    userName: "Joseph Armah",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵190.00",
    status: "Overdue",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt027",
    statementId: "STMT-2024-027",
    userId: "USR013",
    userName: "Joseph Armah",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵220.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Efua Darko statements
  {
    id: "stmt028",
    statementId: "STMT-2024-028",
    userId: "USR014",
    userName: "Efua Darko",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵270.00",
    status: "Paid",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt029",
    statementId: "STMT-2024-029",
    userId: "USR014",
    userName: "Efua Darko",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵230.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },

  // Nana Ama statements
  {
    id: "stmt030",
    statementId: "STMT-2024-030",
    userId: "USR015",
    userName: "Nana Ama",
    period: "September 2024",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    totalAmount: "₵340.00",
    status: "Pending",
    generatedDate: "2024-09-30T10:00:00Z",
    dueDate: "2024-10-15T23:59:59Z",
  },
  {
    id: "stmt031",
    statementId: "STMT-2024-031",
    userId: "USR015",
    userName: "Nana Ama",
    period: "August 2024",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    totalAmount: "₵290.00",
    status: "Paid",
    generatedDate: "2024-08-31T10:00:00Z",
    dueDate: "2024-09-15T23:59:59Z",
  },
];

// Mock users for search
const mockUsers: User[] = [
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

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Search users by name or member ID
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: async () => {
      await delay(300);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      // return response.json();

      if (!query.trim()) {
        // Return all users when no query
        return mockUsers;
      }

      const filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.memberId.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      return filteredUsers;
    },
    enabled: true, // Always enabled to show all users initially
  });
};

// Fetch statements for a specific user with date range and pagination
export const useGetUserStatements = (
  userId: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ["statements", userId, startDate, endDate, page, limit],
    queryFn: async () => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/statements/user/${userId}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
      // return response.json();

      if (!userId) return { statements: [], total: 0, page, limit };

      let filteredStatements = mockStatements.filter(
        (stmt) => stmt.userId === userId
      );

      // Filter by date range if provided
      if (startDate && endDate) {
        filteredStatements = filteredStatements.filter((stmt) => {
          const stmtDate = new Date(stmt.startDate);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return stmtDate >= start && stmtDate <= end;
        });
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedStatements = filteredStatements.slice(
        startIndex,
        endIndex
      );

      return {
        statements: paginatedStatements,
        total: filteredStatements.length,
        page,
        limit,
        totalPages: Math.ceil(filteredStatements.length / limit),
      };
    },
    enabled: !!userId,
  });
};

// Fetch single statement
export const useGetStatement = (statementId: string | undefined) => {
  return useQuery({
    queryKey: ["statement", statementId],
    queryFn: async () => {
      await delay(300);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/statements/${statementId}`);
      // return response.json();
      const statement = mockStatements.find((s) => s.id === statementId);
      if (!statement) throw new Error("Statement not found");
      return statement;
    },
    enabled: !!statementId,
  });
};

// Fetch all statements with advanced filtering
export const useGetAllStatements = (
  filters: {
    userId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    minAmount?: number;
    maxAmount?: number;
  } = {},
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ["statements", "all", filters, page, limit],
    queryFn: async () => {
      await delay(500);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/statements?${new URLSearchParams(filters as any)}&page=${page}&limit=${limit}`);
      // return response.json();

      let filteredStatements = [...mockStatements];

      // Apply filters
      if (filters.userId) {
        filteredStatements = filteredStatements.filter(
          (stmt) => stmt.userId === filters.userId
        );
      }

      if (filters.startDate && filters.endDate) {
        filteredStatements = filteredStatements.filter((stmt) => {
          const stmtDate = new Date(stmt.startDate);
          const start = new Date(filters.startDate!);
          const end = new Date(filters.endDate!);
          return stmtDate >= start && stmtDate <= end;
        });
      }

      if (filters.status) {
        filteredStatements = filteredStatements.filter(
          (stmt) => stmt.status === filters.status
        );
      }

      if (filters.minAmount !== undefined) {
        filteredStatements = filteredStatements.filter((stmt) => {
          const amount = parseFloat(
            stmt.totalAmount.replace("₵", "").replace(",", "")
          );
          return amount >= filters.minAmount!;
        });
      }

      if (filters.maxAmount !== undefined) {
        filteredStatements = filteredStatements.filter((stmt) => {
          const amount = parseFloat(
            stmt.totalAmount.replace("₵", "").replace(",", "")
          );
          return amount <= filters.maxAmount!;
        });
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedStatements = filteredStatements.slice(
        startIndex,
        endIndex
      );

      return {
        statements: paginatedStatements,
        total: filteredStatements.length,
        page,
        limit,
        totalPages: Math.ceil(filteredStatements.length / limit),
      };
    },
  });
};
