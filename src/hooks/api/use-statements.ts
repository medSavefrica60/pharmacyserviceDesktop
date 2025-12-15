import { useQuery } from "@tanstack/react-query";
import { Statement } from "@/hooks/common/table/columns/use-statements-table-columns";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";
import { MiniStatementData } from "@/modules/user-management/misc/show-mini-statement";
import { BaseSuccessResponse } from "@/types";

// Mock data for users (for search functionality)
export type User = {
  id: string;
  name: string;
  email: string;
  memberId: string;
};

// Search users by name or member ID
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: async () => {
      // For real API, would use AppServices.users.get_all_users with search param
      return queryFn<User[]>(
        AppServices.users.get_all_users({ search: query })
      );
    },
    enabled: true,
  });
};

// Fetch statements for a specific user
export const useGetUserStatements = (userId: string) => {
  return useQuery({
    queryKey: ["mini-statement", userId],
    queryFn: async () => {
      return queryFn<BaseSuccessResponse<MiniStatementData>>(
        AppServices.users.get_user_mini_statement(userId)
      );
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
    queryKey: ["mini-statement", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      return queryFn<BaseSuccessResponse<MiniStatementData>>(
        AppServices.users.get_user_mini_statement(userId)
      );
    },
    enabled: !!userId,
  });
};
