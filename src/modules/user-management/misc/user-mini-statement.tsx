import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserMiniStatement } from "@/hooks/api/use-statements";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  UserIcon,
  WalletIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CreditCardIcon,
  ReceiptIcon,
  CheckCircleIcon,
  ClockIcon,
  HashIcon,
  CopyIcon,
  CopyCheckIcon,
  BarChart3Icon,
  HistoryIcon,
} from "lucide-react";
import { useState } from "react";

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

interface MiniStatementResponse {
  status: string;
  code: number;
  message: string;
  timestamp: string;
  data: MiniStatementData;
}

export const UserMiniStatement = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isOpen = search.dialog === "mini-statement" && !!search.userId;
  const { data: miniStatementData, isLoading } = useGetUserMiniStatement(
    search.userId
  );

  const handleClose = () => {
    navigate({
      to: "/users",
      search: { sheet: undefined, dialog: undefined, userId: undefined },
    });
  };

  const handleCopyId = async (id: string) => {
    setCopiedId(id);
    await navigator.clipboard.writeText(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get transaction icon
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

  // Get transaction color
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-4xl w-full max-h-[85vh] flex flex-col p-2">
        <DialogHeader className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Mini Statement</DialogTitle>
              <DialogDescription>
                Recent transaction history and account summary
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Loading mini statement...
              </p>
            </div>
          </div>
        ) : miniStatementData ? (
          <div className="px-6 pb-6">
            {/* Extract data from API response */}
            {(() => {
              const response = miniStatementData as MiniStatementResponse;
              const data = response.data;
              return (
                <>
                  {/* User & Wallet Header Card */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-3">
                          <UserIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-primary">
                            {data.user.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {data.user.medsaveId} • {data.user.phone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(data.wallet.currentBalance)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current Balance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs for organized content */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="overview"
                        className="flex items-center gap-2"
                      >
                        <BarChart3Icon className="h-4 w-4" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="transactions"
                        className="flex items-center gap-2"
                      >
                        <HistoryIcon className="h-4 w-4" />
                        Transactions
                      </TabsTrigger>
                      <TabsTrigger
                        value="period"
                        className="flex items-center gap-2"
                      >
                        <CalendarIcon className="h-4 w-4" />
                        Period
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        {/* Financial Overview */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3Icon className="h-5 w-5 text-primary" />
                            Financial Overview
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {/* Current Balance */}
                            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <div className="flex items-center justify-center mb-2">
                                <WalletIcon className="h-5 w-5 text-primary" />
                              </div>
                              <p className="text-xl font-bold text-primary">
                                {formatCurrency(data.wallet.currentBalance)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Current Balance
                              </p>
                            </div>

                            {/* Total Deposits */}
                            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                              <div className="flex items-center justify-center mb-2">
                                <TrendingUpIcon className="h-5 w-5 text-green-600" />
                              </div>
                              <p className="text-xl font-bold text-green-600">
                                {formatCurrency(data.summary.totalDeposits)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Total Deposits
                              </p>
                            </div>

                            {/* Total Claims */}
                            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <div className="flex items-center justify-center mb-2">
                                <ReceiptIcon className="h-5 w-5 text-orange-600" />
                              </div>
                              <p className="text-xl font-bold text-orange-600">
                                {formatCurrency(data.summary.totalClaims)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Total Claims
                              </p>
                            </div>

                            {/* Total Transactions */}
                            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-center mb-2">
                                <ReceiptIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <p className="text-xl font-bold text-blue-600">
                                {data.summary.totalTransactions}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Total Transactions
                              </p>
                            </div>

                            {/* Total Contributions */}
                            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="flex items-center justify-center mb-2">
                                <CreditCardIcon className="h-5 w-5 text-purple-600" />
                              </div>
                              <p className="text-xl font-bold text-purple-600">
                                {formatCurrency(
                                  data.summary.totalContributions
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Contributions
                              </p>
                            </div>

                            {/* Total Withdrawals */}
                            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                              <div className="flex items-center justify-center mb-2">
                                <TrendingDownIcon className="h-5 w-5 text-red-600" />
                              </div>
                              <p className="text-xl font-bold text-red-600">
                                {formatCurrency(data.summary.totalWithdrawals)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Withdrawals
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Transactions Tab */}
                    <TabsContent value="transactions" className="mt-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <ReceiptIcon className="h-5 w-5 text-primary" />
                          Recent Transactions
                        </h4>
                        <div className="bg-card rounded-lg border">
                          {data.transactions.length > 0 ? (
                            <div className="divide-y">
                              {data.transactions.map((transaction) => (
                                <div
                                  key={transaction.id}
                                  className="p-4 hover:bg-muted/50 transition-colors"
                                >
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
                                          <span className="text-muted-foreground">
                                            •
                                          </span>
                                          <p className="text-sm text-muted-foreground">
                                            {formatTime(transaction.createdAt)}
                                          </p>
                                          <span className="text-muted-foreground">
                                            •
                                          </span>
                                          <div className="flex items-center gap-1">
                                            {transaction.status ===
                                            "completed" ? (
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
                                          onClick={() =>
                                            handleCopyId(
                                              transaction.referenceNumber
                                            )
                                          }
                                          className="p-1 hover:bg-muted rounded transition-colors"
                                        >
                                          {copiedId ===
                                          transaction.referenceNumber ? (
                                            <CopyCheckIcon className="h-3 w-3 text-green-600" />
                                          ) : (
                                            <CopyIcon className="h-3 w-3 text-muted-foreground" />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
                      </div>
                    </TabsContent>

                    {/* Period Tab */}
                    <TabsContent value="period" className="mt-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                          Statement Period
                        </h4>
                        <div className="bg-card rounded-lg border p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-blue-100 p-3">
                                <CalendarIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  From
                                </p>
                                <p className="text-lg font-semibold">
                                  {formatDate(data.period.startDate)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatTime(data.period.startDate)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-green-100 p-3">
                                <CalendarIcon className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  To
                                </p>
                                <p className="text-lg font-semibold">
                                  {formatDate(data.period.endDate)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatTime(data.period.endDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-muted p-4">
                <ReceiptIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Mini statement not found
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
