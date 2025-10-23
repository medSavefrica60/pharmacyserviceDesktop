import React from "react";
import {
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

// Mock data for demonstration
const mockStatementData = {
  user: {
    medsaveId: "MS07648",
    name: "Daniel Amoako Kodua",
    phone: "+233543482189",
  },
  wallet: {
    currentBalance: 0,
  },
  period: {
    startDate: "2025-09-01T00:00:00.000Z",
    endDate: "2025-09-30T00:00:00.000Z",
  },
  transactions: [
    {
      id: "txn001",
      type: "deposit",
      amount: 500,
      description: "Salary Deposit",
      date: "2025-09-15T10:30:00Z",
      status: "completed",
    },
    {
      id: "txn002",
      type: "contribution",
      amount: 200,
      description: "Medical Contribution",
      date: "2025-09-20T14:15:00Z",
      status: "completed",
    },
    {
      id: "txn003",
      type: "withdrawal",
      amount: 150,
      description: "Emergency Withdrawal",
      date: "2025-09-25T09:45:00Z",
      status: "completed",
    },
  ],
  summary: {
    totalTransactions: 3,
    totalDeposits: 500,
    totalWithdrawals: 150,
    totalContributions: 200,
    totalClaims: 0,
  },
};

export const StatementDemo = () => {
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
          <h1 className="text-2xl font-bold">Statement Demo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Beautiful statement design for MedSave Desktop
          </p>
        </div>
      </div>

      {/* Statement Content */}
      <div className="px-6 pb-6">
        <div className="space-y-6">
          {/* User Info Card */}
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
                  <p className="text-lg font-semibold">
                    {mockStatementData.user.medsaveId}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-lg font-semibold">
                    {mockStatementData.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-lg font-semibold">
                    {mockStatementData.user.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Balance & Period */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wallet Balance */}
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
                    {formatCurrency(mockStatementData.wallet.currentBalance)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available Balance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Period */}
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
                    <span className="text-sm text-muted-foreground">From:</span>
                    <span className="font-medium">
                      {formatDate(mockStatementData.period.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">To:</span>
                    <span className="font-medium">
                      {formatDate(mockStatementData.period.endDate)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
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
                    {mockStatementData.summary.totalTransactions}
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
                    {formatCurrency(mockStatementData.summary.totalDeposits)}
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
                    {formatCurrency(mockStatementData.summary.totalWithdrawals)}
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
                    {formatCurrency(
                      mockStatementData.summary.totalContributions
                    )}
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
                    {formatCurrency(mockStatementData.summary.totalClaims)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStatementData.transactions.map((transaction, index) => (
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
                        <p className="font-medium">{transaction.description}</p>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
