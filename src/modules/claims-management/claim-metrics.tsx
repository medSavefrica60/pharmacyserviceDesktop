"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";

interface ClaimMetricsProps {
  claimsData?: {
    data?: {
      claims?: Array<unknown>;
      total?: number;
      page?: number;
      limit?: number;
      metadata?: {
        totalClaims?: number;
        totalSuccessClaims?: number;
        totalFailedClaim?: number;
        totalPendingClaims?: number;
        totalClaimAmount?: number;
      };
    };
  };
  isLoading?: boolean;
}

const SkeletonClaimMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
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

export const ClaimMetrics = ({ claimsData, isLoading }: ClaimMetricsProps) => {
  if (isLoading) {
    return <SkeletonClaimMetrics />;
  }

  // Get metrics from metadata (calculated in toolbar)
  const metadata = claimsData?.data?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalClaims = metadata?.totalClaims ?? claimsData?.data?.total ?? 0;
  const totalSuccessClaims = metadata?.totalSuccessClaims ?? 0;
  const totalPendingClaims = metadata?.totalPendingClaims ?? 0;
  const totalClaimAmount = metadata?.totalClaimAmount ?? 0;

  // Format amount as currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Claims"
        value={totalClaims.toString()}
        description="All claims in the system."
      />
      <ValueIndicator
        title="Approved Claims"
        value={totalSuccessClaims.toString()}
        description="Claims that have been approved."
      />
      <ValueIndicator
        title="Pending Claims"
        value={totalPendingClaims.toString()}
        description="Claims that are pending approval."
      />
      <ValueIndicator
        title="Total Amount"
        value={formatAmount(totalClaimAmount)}
        description="Total amount of approved claims."
      />
    </div>
  );
};
