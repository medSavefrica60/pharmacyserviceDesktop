import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetUserPackageEnrollments } from "@/hooks/api/use-users";
import { cn } from "@/lib/utils";
import {
  PackageIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { AmountIndicator } from "@/components/common/misc/kpi-indicators";
import { Scroller } from "@/components/ui/scroller";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { BaseSuccessResponse } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import { Badge } from "@/components/ui/badge";
import type { UserPackageEnrollment as UserPackageEnrollmentType } from "@/types";

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

// Enrollment Metrics Component
interface EnrollmentMetricsProps {
  enrollment: UserPackageEnrollmentType;
}

const EnrollmentMetrics = ({ enrollment }: EnrollmentMetricsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {/* Current Balance */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Balance"
          value={formatAmountForIndicator(enrollment.balance)}
          description="Current Balance"
          className="text-primary"
        />
      </div>

      {/* Total Contributions */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Contributions"
          value={formatAmountForIndicator(enrollment.totalContributions)}
          description="Total Contributions"
        />
      </div>

      {/* Total Deposits */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Deposits"
          value={formatAmountForIndicator(enrollment.totalDeposits)}
          description="Total Deposits"
        />
      </div>

      {/* Total Claims */}
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Claims"
          value={formatAmountForIndicator(enrollment.totalClaims)}
          description="Total Claims"
        />
      </div>
    </div>
  );
};

// Enrollment Item Component
interface EnrollmentItemProps {
  enrollment: UserPackageEnrollmentType;
}

const EnrollmentItem = ({ enrollment }: EnrollmentItemProps) => {
  return (
    <div className="p-4 border border-medsave-black-50 rounded-lg hover:bg-muted/50 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <PackageIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-lg text-foreground">
              {enrollment.packageName}
            </p>
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

      {/* Metrics */}
      <EnrollmentMetrics enrollment={enrollment} />

      {/* Timeline Footer */}
      <div className="pt-3 border-t border-medsave-black-50">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Enrolled: {formatDate(enrollment.enrolledAt)}{" "}
              {formatTime(enrollment.enrolledAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span>
              Last Transaction: {formatDate(enrollment.lastTransactionAt)}{" "}
              {formatTime(enrollment.lastTransactionAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enrollments List Component
interface EnrollmentsListProps {
  enrollments: UserPackageEnrollmentType[];
}

const EnrollmentsList = ({ enrollments }: EnrollmentsListProps) => {
  return (
    <Scroller
      orientation="vertical"
      className="flex-1 mb-4 max-h-90"
      hideScrollbar={true}
      withNavigation
    >
      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <EnrollmentItem key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </Scroller>
  );
};

// Enrollment Metrics Skeleton Component
export const EnrollmentMetricsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {Array.from({ length: 4 }).map((_, index) => (
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

// Enrollments List Skeleton Component
export const EnrollmentsListSkeleton = () => {
  return (
    <Scroller
      orientation="vertical"
      className="flex-1 mb-4 max-h-90"
      hideScrollbar={true}
      withNavigation
    >
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-4 border border-medsave-black-50 rounded-lg"
          >
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Metrics Skeleton */}
            <EnrollmentMetricsSkeleton />

            {/* Footer Skeleton */}
            <div className="pt-3 border-t border-medsave-black-50">
              <div className="flex items-center justify-center gap-6">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        ))}
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
          <MedEmptyBoxIcon />
        </div>
        <p className="text-sm text-muted-foreground">
          No package enrollments found
        </p>
      </div>
    </div>
  );
};

// Main UserPackageEnrollment Component
export const UserPackageEnrollment = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };
  const { data: enrollmentsData, isLoading } = useGetUserPackageEnrollments(
    search.userId
  );

  const isOpen = search.dialog === "packages" && !!search.userId;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({
        to: "/users",
        search: { dialog: undefined, userId: undefined },
      });
    }
  };

  const response = enrollmentsData as
    | BaseSuccessResponse<{
        packages: UserPackageEnrollmentType[];
        total: number;
      }>
    | undefined;
  const packages = response?.data?.packages || [];

  return (
    <Sheet open={isOpen as boolean} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="!max-w-[120rem] w-full max-h-[85vh] flex flex-col p-2"
      >
        <SheetHeader className="px-6 pb-4">
          <SheetTitle className="text-xl">Package Enrollments</SheetTitle>
          <SheetDescription>
            View all packages this user is enrolled in
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6">
            <EnrollmentsListSkeleton />
          </div>
        ) : packages.length > 0 ? (
          <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6">
            <EnrollmentsList enrollments={packages} />
          </div>
        ) : (
          <EmptyState />
        )}
      </SheetContent>
    </Sheet>
  );
};

export {
  formatCurrency,
  formatAmountForIndicator,
  formatDate,
  formatTime,
  getStatusIcon,
  getStatusColor,
  EnrollmentMetrics,
  EnrollmentsList,
  EnrollmentItem,
};
