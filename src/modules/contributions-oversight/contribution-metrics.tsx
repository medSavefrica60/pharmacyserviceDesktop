"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { ContributionsResponse } from "@/hooks/api/use-contributions";

interface ContributionMetricsProps {
  contributionsData?: ContributionsResponse & {
    metadata?: {
      totalContributions?: number;
      completedContributions?: number;
      pendingContributions?: number;
      failedContributions?: number;
      totalContributionAmount?: number;
    };
  };
  isLoading?: boolean;
}

const SkeletonContributionMetrics = () => {
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

export const ContributionMetrics = ({
  contributionsData,
  isLoading,
}: ContributionMetricsProps) => {
  if (isLoading) {
    return <SkeletonContributionMetrics />;
  }

  // Get metrics from metadata (calculated in toolbar)
  const metadata = contributionsData?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalContributions =
    metadata?.totalContributions ??
    contributionsData?.pagination?.total ??
    contributionsData?.contributions?.length ??
    0;
  const completedContributions = metadata?.completedContributions ?? 0;
  const pendingContributions = metadata?.pendingContributions ?? 0;
  const failedContributions = metadata?.failedContributions ?? 0;
  const totalAmount = metadata?.totalContributionAmount ?? 0;

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
        title="Total Contributions"
        value={totalContributions.toString()}
        description="All contributions in the system."
      />
      <ValueIndicator
        title="Completed"
        value={completedContributions.toString()}
        description="Contributions that have been completed."
      />
      <ValueIndicator
        title="Pending"
        value={pendingContributions.toString()}
        description="Contributions that are pending."
      />
      <ValueIndicator
        title="Total Amount"
        value={formatAmount(totalAmount)}
        description="Total amount of completed contributions."
      />
    </div>
  );
};

