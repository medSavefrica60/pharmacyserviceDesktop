import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPackageEnrollments } from "@/hooks/api/use-users";
import { cn } from "@/lib/utils";
import {
  PackageIcon,
  WalletIcon,
  TrendingUpIcon,
  ReceiptIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
} from "lucide-react";

export const UserPackageEnrollment = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };

  const isOpen = search.dialog === "packages" && !!search.userId;
  const { data: enrollmentsData, isLoading } = useGetUserPackageEnrollments(
    search.userId
  );

  const handleClose = () => {
    navigate({
      to: "/users",
      search: { sheet: undefined, dialog: undefined, userId: undefined },
    });
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

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case "INACTIVE":
        return <XCircleIcon className="h-4 w-4 text-gray-600" />;
      case "SUSPENDED":
        return <AlertCircleIcon className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertCircleIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50 text-green-600 border-green-200";
      case "INACTIVE":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "SUSPENDED":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-4xl w-full max-h-[85vh] flex flex-col p-2">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5 text-primary" />
            Package Enrollments
          </DialogTitle>
          <DialogDescription>
            View all packages this user is enrolled in
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">
                  Loading package enrollments...
                </p>
              </div>
            </div>
          ) : enrollmentsData?.data?.packages &&
            enrollmentsData.data.packages.length > 0 ? (
            <div className="px-6 pb-6 space-y-4">
              {enrollmentsData.data.packages.map((enrollment) => (
                <Card key={enrollment.id} className="border border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <PackageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {enrollment.packageName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Package ID: {enrollment.packageId.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 text-sm font-medium flex items-center gap-2",
                          getStatusColor(enrollment.status)
                        )}
                      >
                        {getStatusIcon(enrollment.status)}
                        {enrollment.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Current Balance */}
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <WalletIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Current Balance
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(enrollment.balance)}
                        </p>
                      </div>

                      {/* Total Contributions */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUpIcon className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Total Contributions
                          </span>
                        </div>
                        <p className="text-xl font-semibold text-green-600">
                          {formatCurrency(enrollment.totalContributions)}
                        </p>
                      </div>

                      {/* Total Deposits */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Total Deposits
                          </span>
                        </div>
                        <p className="text-xl font-semibold text-blue-600">
                          {formatCurrency(enrollment.totalDeposits)}
                        </p>
                      </div>

                      {/* Total Claims */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ReceiptIcon className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Total Claims
                          </span>
                        </div>
                        <p className="text-xl font-semibold text-orange-600">
                          {formatCurrency(enrollment.totalClaims)}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Information */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Enrolled At
                            </p>
                            <p className="text-sm font-semibold">
                              {formatDate(enrollment.enrolledAt)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(enrollment.enrolledAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <ClockIcon className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Last Transaction
                            </p>
                            <p className="text-sm font-semibold">
                              {formatDate(enrollment.lastTransactionAt)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(enrollment.lastTransactionAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-muted p-4">
                  <PackageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold text-muted-foreground">
                  No Package Enrollments
                </p>
                <p className="text-sm text-muted-foreground">
                  This user is not enrolled in any packages yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
