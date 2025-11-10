import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetUserMiniStatement } from "@/hooks/api/use-statements";
import { cn } from "@/lib/utils";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  CreditCardIcon,
  ReceiptIcon,
  CheckCircleIcon,
  ClockIcon,
  CopyIcon,
  CopyCheckIcon,
  CalendarIcon,
  HashIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ValueIndicator,
  AmountIndicator,
} from "@/components/common/misc/kpi-indicators";
import { Scroller } from "@/components/ui/scroller";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { BaseSuccessResponse } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { MedEmptyBoxIcon } from "@/components/common/icons";

// Mini Statement data types based on API response
interface MiniStatementUser {
  medsaveId: string;
  name: string;
  phone: string;
}

interface MiniStatementWallet {
  currentBalance: number;
}

interface MiniStatementPeriod {
  startDate: string;
  endDate: string;
}

interface MiniStatementTransaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  referenceNumber: string;
  createdAt: string;
  completedAt: string | null;
}

interface MiniStatementSummary {
  totalTransactions: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalContributions: number;
  totalClaims: number;
}

interface MiniStatementData {
  user: MiniStatementUser;
  wallet: MiniStatementWallet;
  period: MiniStatementPeriod;
  transactions: MiniStatementTransaction[];
  summary: MiniStatementSummary;
}

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount);
};

const formatAmountForIndicator = (amount: number) => {
  return amount.toFixed(2);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "DEPOSIT":
      return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
    case "WITHDRAWAL":
      return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
    case "CLAIM_PAYMENT":
      return <ReceiptIcon className="h-4 w-4 text-blue-600" />;
    case "CONTRIBUTION":
      return <CreditCardIcon className="h-4 w-4 text-purple-600" />;
    default:
      return <HashIcon className="h-4 w-4 text-gray-600" />;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case "DEPOSIT":
      return "bg-green-100 text-green-600";
    case "WITHDRAWAL":
      return "bg-red-100 text-red-600";
    case "CLAIM_PAYMENT":
      return "bg-blue-100 text-blue-600";
    case "CONTRIBUTION":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Financial Overview Component
interface FinancialOverviewProps {
  wallet: MiniStatementWallet;
  summary: MiniStatementSummary;
}

const FinancialOverview = ({ wallet, summary }: FinancialOverviewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {/* Current Balance */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Current Balance"
          value={formatAmountForIndicator(wallet.currentBalance)}
          description="Current Balance"
          className="text-primary"
        />
      </div>

      {/* Total Deposits */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Deposits"
          value={formatAmountForIndicator(summary.totalDeposits)}
          description="Total Deposits"
        />
      </div>

      {/* Total Claims */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Total Claims"
          value={formatAmountForIndicator(summary.totalClaims)}
          description="Total Claims"
        />
      </div>

      {/* Total Transactions */}
      <div className="[&>header]:hidden">
        <ValueIndicator
          title="Transactions"
          value={summary.totalTransactions}
          description="Total Transactions"
        />
      </div>

      {/* Total Contributions */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Contributions"
          value={formatAmountForIndicator(summary.totalContributions)}
          description="Contributions"
        />
      </div>

      {/* Total Withdrawals */}
      <AmountIndicator
        title="Withdrawals"
        value={formatAmountForIndicator(summary.totalWithdrawals)}
        description="Withdrawals"
      />
    </div>
  );
};

// Transaction Item Component
interface TransactionItemProps {
  transaction: MiniStatementTransaction;
  copiedId: string | null;
  onCopyId: (id: string) => void;
}

const TransactionItem = ({
  transaction,
  copiedId,
  onCopyId,
}: TransactionItemProps) => {
  return (
    <div className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-full",
              getTransactionColor(transaction.type)
            )}
          >
            {getTransactionIcon(transaction.type)}
          </div>
          <div>
            <p className="font-medium text-foreground">
              {transaction.description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.createdAt)}
              </p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                {formatTime(transaction.createdAt)}
              </p>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                {transaction.status === "completed" ? (
                  <CheckCircleIcon className="h-3 w-3 text-green-600" />
                ) : (
                  <ClockIcon className="h-3 w-3 text-yellow-600" />
                )}
                <span className="text-xs text-muted-foreground capitalize">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-semibold",
              transaction.type === "DEPOSIT" ||
                transaction.type === "CLAIM_PAYMENT"
                ? "text-green-600"
                : "text-red-600"
            )}
          >
            {transaction.type === "DEPOSIT" ||
            transaction.type === "CLAIM_PAYMENT"
              ? "+"
              : "-"}
            {formatCurrency(transaction.amount)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground font-mono">
              {transaction.referenceNumber}
            </p>
            <button
              onClick={() => onCopyId(transaction.referenceNumber)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              {copiedId === transaction.referenceNumber ? (
                <CopyCheckIcon className="h-3 w-3 text-green-600" />
              ) : (
                <CopyIcon className="h-3 w-3 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transactions List Component
interface TransactionsListProps {
  transactions: MiniStatementTransaction[];
  copiedId: string | null;
  onCopyId: (id: string) => void;
}

const TransactionsList = ({
  transactions,
  copiedId,
  onCopyId,
}: TransactionsListProps) => {
  return (
    <Scroller
      orientation="vertical"
      className="flex-1 mb-4 max-h-90"
      hideScrollbar={true}
      withNavigation
    >
      <div className="bg-card rounded-lg border">
        {transactions.length > 0 ? (
          <div className="divide-y">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                copiedId={copiedId}
                onCopyId={onCopyId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4">
              <ReceiptIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-muted-foreground">
              No Transactions
            </p>
            <p className="text-sm text-muted-foreground">
              No transactions found for this period.
            </p>
          </div>
        )}
      </div>
    </Scroller>
  );
};

// Statement Period Footer Component
interface StatementPeriodFooterProps {
  period: MiniStatementPeriod;
}

const StatementPeriodFooter = ({ period }: StatementPeriodFooterProps) => {
  return (
    <div className="pt-2 border-t border-medsave-black-50">
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <CalendarIcon className="h-4 w-4" />
        <span>
          Statement Period: {formatDate(period.startDate)} -{" "}
          {formatDate(period.endDate)}
        </span>
      </div>
    </div>
  );
};

// Financial Overview Skeleton Component
export const FinancialOverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border border-medsave-black-50 rounded-lg">
          <section className="p-3 flex flex-col space-y-2">
            <Skeleton className="h-[40px] w-24" />
            <Skeleton className="h-4 w-full" />
          </section>
        </div>
      ))}
    </div>
  );
};

// Transactions List Skeleton Component
export const TransactionsListSkeleton = () => {
  return (
    <Scroller
      orientation="vertical"
      className="flex-1 mb-4 max-h-90"
      hideScrollbar={true}
      withNavigation
    >
      <div className="bg-card rounded-lg border">
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-5 w-24 ml-auto" />
                  <div className="flex items-center gap-2 justify-end">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-4 w-4 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroller>
  );
};

// Empty State Component
export const EmptyState = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-muted p-4">
          <MedEmptyBoxIcon />{" "}
        </div>
        <p className="text-sm text-muted-foreground">
          Mini statement not found
        </p>
      </div>
    </div>
  );
};

const ShowMiniStatement = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };
  const { data: miniStatementData, isLoading } = useGetUserMiniStatement(
    search.userId as string
  );

  const isOpen = search.dialog === "mini-statement" && !!search.userId;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({
        to: "/users",
        search: { dialog: undefined, userId: undefined },
      });
    }
  };

  const handleCopyId = async (id: string) => {
    setCopiedId(id);
    await navigator.clipboard.writeText(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const response = miniStatementData as
    | BaseSuccessResponse<MiniStatementData>
    | undefined;
  const data = response?.data;

  return (
    <Sheet open={isOpen as boolean} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="!max-w-[120rem] w-full max-h-[85vh] flex flex-col p-2"
      >
        <SheetHeader className="px-6 pb-4">
          <SheetTitle className="text-xl">Mini Statement</SheetTitle>
          <SheetDescription>
            Recent transaction history and account summary
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6">
            <FinancialOverviewSkeleton />
            <TransactionsListSkeleton />
            <div className="pt-2 border-t border-medsave-black-50">
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        ) : data ? (
          <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6">
            <FinancialOverview wallet={data.wallet} summary={data.summary} />
            <TransactionsList
              transactions={data.transactions}
              copiedId={copiedId}
              onCopyId={handleCopyId}
            />
            <StatementPeriodFooter period={data.period} />
          </div>
        ) : (
          <EmptyState />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShowMiniStatement;
export type {
  MiniStatementData,
  MiniStatementTransaction,
  MiniStatementSummary,
  MiniStatementWallet,
  MiniStatementPeriod,
  MiniStatementUser,
};
export {
  formatCurrency,
  formatAmountForIndicator,
  formatDate,
  formatTime,
  getTransactionIcon,
  getTransactionColor,
  FinancialOverview,
  TransactionsList,
  StatementPeriodFooter,
  TransactionItem,
};
