"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { Claim } from "@/types";
import { ClaimsQueryData } from "@/hooks/common/table/toolbars/use-claims-toolbar";

interface ClaimMetricsProps {
  claimsData?: ClaimsQueryData;
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

export const ClaimMetrics = ({
  claimsData,
  isLoading,
}: ClaimMetricsProps) => {
  if (isLoading) {
    return <SkeletonClaimMetrics />;
  }

  // Get metrics from metadata if available, otherwise calculate from data
  const metadata = claimsData?.data?.metadata;
  const claims = claimsData?.data?.claims || [];

  // Calculate metrics from data if metadata is not available
  const calculateMetrics = () => {
    if (metadata) {
      return {
        totalClaims: metadata.totalClaims,
        totalSuccessClaims: metadata.totalSuccessClaims,
        totalPendingClaims: metadata.totalPendingClaims,
        totalFailedClaims: metadata.totalFailedClaim,
        totalClaimAmount: metadata.totalClaimAmount,
      };
    }

    // Fallback: calculate from claims array
    const totalClaims = claims.length;
    const totalSuccessClaims = claims.filter(
      (c) => c.status?.toLowerCase() === "approved"
    ).length;
    const totalPendingClaims = claims.filter(
      (c) => c.status?.toLowerCase() === "pending"
    ).length;
    const totalFailedClaims = claims.filter(
      (c) =>
        c.status?.toLowerCase() === "rejected" ||
        c.status?.toLowerCase() === "expired" ||
        c.status?.toLowerCase() === "cancelled"
    ).length;
    const totalClaimAmount = claims
      .filter((c) => c.status?.toLowerCase() === "approved")
      .reduce((sum, c) => {
        const amount = Number(c.amount) || 0;
        return sum + amount;
      }, 0);

    return {
      totalClaims,
      totalSuccessClaims,
      totalPendingClaims,
      totalFailedClaims,
      totalClaimAmount,
    };
  };

  const metrics = calculateMetrics();

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
        value={metrics.totalClaims.toString()}
        description="All claims in the system."
      />
      <ValueIndicator
        title="Approved Claims"
        value={metrics.totalSuccessClaims.toString()}
        description="Claims that have been approved."
      />
      <ValueIndicator
        title="Pending Claims"
        value={metrics.totalPendingClaims.toString()}
        description="Claims that are pending approval."
      />
      <ValueIndicator
        title="Total Amount"
        value={formatAmount(metrics.totalClaimAmount)}
        description="Total amount of approved claims."
      />
    </div>
  );
};

