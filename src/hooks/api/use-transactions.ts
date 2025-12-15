import { useQuery } from "@tanstack/react-query";
import {
  TransactionsResponse,
  BaseSuccessResponse,
  Transaction,
} from "@/types";
import { queryFn } from "@/api";
import { AppServices } from "@/lib/services/providers";

// Fetch all transactions
export const useGetTransactions = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => {
      const response = await queryFn<TransactionsResponse>(
        AppServices.transactions.get_all_transactions(params)
      );
      return response;
    },
  });
};

// Fetch single transaction
export const useGetTransaction = (transactionId: string | undefined) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      if (!transactionId) throw new Error("Transaction ID is required");

      const response = await queryFn<BaseSuccessResponse<Transaction>>(
        AppServices.transactions.get_id_transaction(transactionId)
      );
      return Promise.resolve(response.data);
    },
    enabled: !!transactionId,
  });
};
