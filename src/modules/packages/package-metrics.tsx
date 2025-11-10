"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "@/types";

interface PackageMetricsProps {
  packagesData?: {
    packages?: Package[];
    pagination?: {
      total?: number;
    };
  };
  isLoading?: boolean;
}

const SkeletonPackageMetrics = () => {
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

export const PackageMetrics = ({
  packagesData,
  isLoading,
}: PackageMetricsProps) => {
  if (isLoading) {
    return <SkeletonPackageMetrics />;
  }

  const packages = packagesData?.packages || [];
  const totalPackages = packagesData?.pagination?.total || packages.length;

  const activePackages = packages.filter((p) => p.status === "ACTIVE").length;
  const inactivePackages = packages.filter(
    (p) => p.status === "INACTIVE"
  ).length;
  const suspendedPackages = packages.filter(
    (p) => p.status === "SUSPENDED"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Packages"
        value={totalPackages.toString()}
        description="All medication packages in the system."
      />
      <ValueIndicator
        title="Active Packages"
        value={activePackages.toString()}
        description="Packages that are currently active."
      />
      <ValueIndicator
        title="Inactive Packages"
        value={inactivePackages.toString()}
        description="Packages that are currently inactive."
      />
      <ValueIndicator
        title="Suspended Packages"
        value={suspendedPackages.toString()}
        description="Packages that are currently suspended."
      />
    </div>
  );
};

