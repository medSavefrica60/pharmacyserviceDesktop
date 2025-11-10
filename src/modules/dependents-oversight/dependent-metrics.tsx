"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { DependentsQueryData } from "@/hooks/common/table/toolbars/use-dependents-toolbar";

interface DependentMetricsProps {
  dependentsData?: DependentsQueryData;
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

  // Get metrics from metadata if available, otherwise calculate from data
  const metadata = dependentsData?.data?.metadata;
  const dependents = dependentsData?.data?.dependents || [];
  const totalDependents = dependentsData?.data?.pagination?.total || dependents.length;

  // Calculate metrics from data if metadata is not available
  const calculateMetrics = () => {
    if (metadata) {
      return {
        totalDependents: metadata.totalDependents,
        totalActiveDependents: metadata.totalActiveDependents,
        totalInactiveDependents: metadata.totalInactiveDependents,
      };
    }

    // Fallback: calculate from dependents array
    const total = dependents.length;
    const totalActive = dependents.filter(
      (d) => d.status?.toLowerCase() === "active"
    ).length;
    const totalInactive = dependents.filter(
      (d) => d.status?.toLowerCase() === "inactive"
    ).length;

    return {
      totalDependents: total,
      totalActiveDependents: totalActive,
      totalInactiveDependents: totalInactive,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Dependents"
        value={metrics.totalDependents.toString()}
        description="All dependents in the system."
      />
      <ValueIndicator
        title="Active Dependents"
        value={metrics.totalActiveDependents.toString()}
        description="Dependents that are currently active."
      />
      <ValueIndicator
        title="Inactive Dependents"
        value={metrics.totalInactiveDependents.toString()}
        description="Dependents that are currently inactive."
      />
    </div>
  );
};

