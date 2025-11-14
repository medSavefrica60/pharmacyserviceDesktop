"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";

interface DependentMetricsProps {
  dependentsData?: {
    dependents: Array<{
      status: string;
    }>;
    pagination: {
      total: number;
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

  const dependents = dependentsData?.dependents || [];
  const totalDependents = dependentsData?.pagination?.total || dependents.length;

  const activeDependents = dependents.filter(
    (d) => d.status?.toLowerCase() === "active"
  ).length;
  const inactiveDependents = dependents.filter(
    (d) => d.status?.toLowerCase() === "inactive"
  ).length;

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

