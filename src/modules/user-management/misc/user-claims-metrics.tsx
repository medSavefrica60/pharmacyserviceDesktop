"use client";

import { ValueIndicator, AmountIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { ClaimsResponse } from "@/types";
import { Claim } from "@/types";

interface UserClaimsMetricsProps {
  claimsData?: ClaimsResponse;
  isLoading?: boolean;
}

const formatAmountForIndicator = (amount: number) => {
  return amount.toFixed(2);
};

const SkeletonUserClaimsMetrics = () => {
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

export const UserClaimsMetrics = ({
  claimsData,
  isLoading,
}: UserClaimsMetricsProps) => {
  if (isLoading) {
    return <SkeletonUserClaimsMetrics />;
  }

  const claims = claimsData?.data?.claims || [];
  const total = claimsData?.data?.total || 0;

  // Calculate metrics from claims
  const calculateMetrics = () => {
    let totalAmount = 0;
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    let expiredCount = 0;
    let cancelledCount = 0;

    claims.forEach((claim: Claim) => {
      const amount = parseFloat(claim.amount || "0");
      totalAmount += amount;

      const status = claim.status?.toLowerCase();
      switch (status) {
        case "pending":
          pendingCount += 1;
          break;
        case "approved":
          approvedCount += 1;
          break;
        case "rejected":
          rejectedCount += 1;
          break;
        case "expired":
          expiredCount += 1;
          break;
        case "cancelled":
          cancelledCount += 1;
          break;
      }
    });

    return {
      totalClaims: total,
      totalAmount,
      pendingCount,
      approvedCount,
      rejectedCount,
      expiredCount,
      cancelledCount,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ValueIndicator
        title="Total Claims"
        value={metrics.totalClaims.toString()}
        description="All claims for this user."
      />
      <div className="[&>header]:hidden">
        <AmountIndicator
          title="Total Amount"
          value={formatAmountForIndicator(metrics.totalAmount)}
          description="Total amount of all claims."
          className="text-primary"
        />
      </div>
      <ValueIndicator
        title="Pending"
        value={metrics.pendingCount.toString()}
        description="Claims awaiting approval."
      />
      <ValueIndicator
        title="Approved"
        value={metrics.approvedCount.toString()}
        description="Claims that have been approved."
      />
      <ValueIndicator
        title="Rejected"
        value={metrics.rejectedCount.toString()}
        description="Claims that have been rejected."
      />
    </div>
  );
};

