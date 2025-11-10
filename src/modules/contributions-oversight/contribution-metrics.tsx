"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";

interface ContributionMetricsProps {
  contributionsData?: Contribution[];
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

  const contributions = contributionsData || [];
  const totalContributions = contributions.length;

  const completedContributions = contributions.filter(
    (c) => c.status === "Completed"
  ).length;
  const pendingContributions = contributions.filter(
    (c) => c.status === "Pending"
  ).length;
  const failedContributions = contributions.filter(
    (c) => c.status === "Failed"
  ).length;

  // Calculate total amount from completed contributions
  const totalAmount = contributions
    .filter((c) => c.status === "Completed")
    .reduce((sum, c) => {
      const amount = parseFloat(c.amount.replace(/[₵,]/g, "")) || 0;
      return sum + amount;
    }, 0);

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
        title="Failed"
        value={failedContributions.toString()}
        description="Contributions that have failed."
      />
    </div>
  );
};

