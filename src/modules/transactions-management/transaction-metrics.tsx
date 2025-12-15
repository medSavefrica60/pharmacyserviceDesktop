"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsResponse, Transaction } from "@/types";

interface TransactionMetricsProps {
  transactionsData?: TransactionsResponse;
  isLoading?: boolean;
}

const SkeletonTransactionMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="border border-medsave-black-50 rounded-lg">
          <header className="flex-1 py-2 font-bold text-lg px-3 border-b border-medsave-black-50 flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
          </header>
          <section className="p-3 flex flex-col space-y-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-4 w-full" />
          </section>
        </div>
      ))}
    </div>
  );
};

export const TransactionMetrics = ({
  transactionsData,
  isLoading,
}: TransactionMetricsProps) => {
  if (isLoading) {
    return <SkeletonTransactionMetrics />;
  }

  const txs = transactionsData?.data?.transactions || [];
  const metadata = transactionsData?.metadata as any;

  const totalTransactions =
    metadata?.totalTransactions ?? transactionsData?.total ?? txs.length;
  const completedTransactions =
    metadata?.completedTransactions ??
    txs.filter(
      (t: Transaction) => (t.status || "").toLowerCase() === "completed"
    ).length;
  const pendingTransactions =
    metadata?.pendingTransactions ??
    txs.filter((t: Transaction) => (t.status || "").toLowerCase() === "pending")
      .length;
  const failedTransactions =
    metadata?.failedTransactions ??
    txs.filter((t: Transaction) => (t.status || "").toLowerCase() === "failed")
      .length;
  const totalAmount =
    metadata?.totalAmount ??
    txs.reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ValueIndicator
        title="Total Transactions"
        value={totalTransactions.toString()}
        description="All transactions in the system."
      />
      <ValueIndicator
        title="Completed"
        value={completedTransactions.toString()}
        description="Transactions that are completed."
      />
      <ValueIndicator
        title="Pending"
        value={pendingTransactions.toString()}
        description="Transactions that are pending."
      />
      <ValueIndicator
        title="Failed"
        value={failedTransactions.toString()}
        description="Transactions that failed."
      />
      <ValueIndicator
        title="Total Volume"
        value={`GHS ${totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        description="Total amount across all transactions."
      />
    </div>
  );
};
