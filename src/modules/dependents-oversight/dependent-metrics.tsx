"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { DependentsResponse } from "@/types";

interface DependentMetricsProps {
  dependentsData?: DependentsResponse["data"] & {
    metadata?: {
      totalDependents?: number;
      totalActiveDependents?: number;
      totalInactiveDependents?: number;
    };
  };
  isLoading?: boolean;
}

const SkeletonDependentMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
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

export const DependentMetrics = ({
  dependentsData,
  isLoading,
}: DependentMetricsProps) => {
  if (isLoading) {
    return <SkeletonDependentMetrics />;
  }

  // Get metrics from metadata (calculated in toolbar)
  const metadata = dependentsData?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalDependents =
    metadata?.totalDependents ??
    dependentsData?.pagination?.total ??
    dependentsData?.dependents?.length ??
    0;
  const activeDependents = metadata?.totalActiveDependents ?? 0;
  const inactiveDependents = metadata?.totalInactiveDependents ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Dependents"
        value={totalDependents.toString()}
        description="All dependents in the system."
      />
      <ValueIndicator
        title="Active Dependents"
        value={activeDependents.toString()}
        description="Dependents that are currently active."
      />
      <ValueIndicator
        title="Inactive Dependents"
        value={inactiveDependents.toString()}
        description="Dependents that are currently inactive."
      />
    </div>
  );
};

