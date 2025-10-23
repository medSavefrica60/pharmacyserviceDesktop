import { useState, useEffect } from "react";
import { useGetAllStatements } from "@/hooks/api/use-statements";
import { StatementFilters } from "./statement-filters";
import {
  UserSearchOption,
  transformUserToSearchOption,
} from "./statements-search";
import { useGetUsers } from "@/hooks/api/use-users";
import { logger } from "@/lib/logger";
import {
  FileTextIcon,
  UserIcon,
  WalletIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CreditCardIcon,
  ReceiptIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Statement data types based on API response
interface StatementUser {
  medsaveId: string;
  name: string;
  phone: string;
}

interface StatementWallet {
  currentBalance: number;
}

interface StatementPeriod {
  startDate: string;
  endDate: string;
}

interface StatementSummary {
  totalTransactions: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalContributions: number;
  totalClaims: number;
}

interface StatementTransaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
}

interface StatementData {
  user: StatementUser;
  wallet: StatementWallet;
  period: StatementPeriod;
  transactions: StatementTransaction[];
  summary: StatementSummary;
}

interface StatementResponse {
  status: string;
  code: number;
  message: string;
  timestamp: string;
  data: StatementData;
}

export const ViewStatements = () => {
  const [selectedUser, setSelectedUser] = useState<UserSearchOption | null>(
    null
  );
  const [status, setStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  // Get users for search options
  const { data: usersData } = useGetUsers();
  const users = usersData?.users || [];
  const userOptions: UserSearchOption[] = users.map(
    transformUserToSearchOption
  );

  // Get statements with filters
  const { data: statementsData, isLoading } = useGetAllStatements(
    selectedUser?.id as string,
    {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }
  );

  // Set default date range (last month)
  useEffect(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    setDateRange({
      startDate: lastMonth.toISOString().split("T")[0],
      endDate: endOfLastMonth.toISOString().split("T")[0],
    });
  }, []);

  const handleUserSelect = (user: UserSearchOption) => {
    logger.info("User selected in view", user);
    setSelectedUser(user);
  };

  const handleUserClear = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleDateRangeChange = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    if (range?.from && range?.to) {
      setDateRange({
        startDate: range.from.toISOString().split("T")[0],
        endDate: range.to.toISOString().split("T")[0],
      });
    }
  };

  const handleDownload = () => {
    logger.info("Download statements requested");
    // TODO: Implement download functionality
  };

  const handleClearFilters = () => {
    logger.info("Clear filters requested");
    setSelectedUser(null);
    setStatus("all");
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    setDateRange({
      startDate: lastMonth.toISOString().split("T")[0],
      endDate: endOfLastMonth.toISOString().split("T")[0],
    });
  };

  const dateRangeDisplay = {
    from: dateRange.startDate ? new Date(dateRange.startDate) : undefined,
    to: dateRange.endDate ? new Date(dateRange.endDate) : undefined,
  };

  // Extract statement data from API response
  const statementResponse = statementsData as StatementResponse;
  const statementData = statementResponse?.data;
  const transactions = statementData?.transactions || [];
  const summary = statementData?.summary;
  const user = statementData?.user;
  const wallet = statementData?.wallet;
  const period = statementData?.period;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Statements Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all statements
          </p>
        </div>
      </div>

      {/* Filters */}
      <StatementFilters
        userOptions={userOptions}
        selectedUser={selectedUser}
        status={status}
        dateRangeDisplay={dateRangeDisplay}
        onUserSelect={handleUserSelect}
        onUserClear={handleUserClear}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={handleClearFilters}
        onDownload={handleDownload}
      />

      {/* Statement Content */}
      <div className="px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              Loading statement...
            </p>
          </div>
        ) : statementData ? (
          <div className="space-y-6">
            {/* User Info Card */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        MedSave ID
                      </p>
                      <p className="text-lg font-semibold">{user.medsaveId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Name
                      </p>
                      <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Phone
                      </p>
                      <p className="text-lg font-semibold">{user.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wallet Balance & Period */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Wallet Balance */}
              {wallet && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <WalletIcon className="h-5 w-5" />
                      Current Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(wallet.currentBalance)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Available Balance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Period */}
              {period && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Statement Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          From:
                        </span>
                        <span className="font-medium">
                          {formatDate(period.startDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          To:
                        </span>
                        <span className="font-medium">
                          {formatDate(period.endDate)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary Cards */}
            {summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <ReceiptIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {summary.totalTransactions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Transactions
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUpIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(summary.totalDeposits)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Deposits
                      </p>
                    </div>

                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingDownIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(summary.totalWithdrawals)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Withdrawals
                      </p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <CreditCardIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatCurrency(summary.totalContributions)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Contributions
                      </p>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <AlertCircleIcon className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(summary.totalClaims)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Claims
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                      <div
                        key={transaction.id || index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "deposit"
                                ? "bg-green-100"
                                : transaction.type === "withdrawal"
                                  ? "bg-red-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <TrendingUpIcon className="h-4 w-4 text-green-600" />
                            ) : transaction.type === "withdrawal" ? (
                              <TrendingDownIcon className="h-4 w-4 text-red-600" />
                            ) : (
                              <CreditCardIcon className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "deposit"
                                ? "text-green-600"
                                : transaction.type === "withdrawal"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {transaction.status}
                          </Badge>
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
                      No transactions found for the selected period.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center py-12">
            <span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
              <div className="rounded-full bg-muted p-4">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-center text-sm text-medsave-black-500 font-semibold">
                No Statement Found
              </p>
              <p className="text-center text-sm text-medsave-black-300">
                Please select a user and date range to view their statement.
              </p>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
