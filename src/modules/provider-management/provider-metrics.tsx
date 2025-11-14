"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginatedData, Provider } from "@/types";

interface ProviderMetricsProps {
  providersData?: PaginatedData<Provider>;
  isLoading?: boolean;
}

const SkeletonProviderMetrics = () => {
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

export const ProviderMetrics = ({
  providersData,
  isLoading,
}: ProviderMetricsProps) => {
  if (isLoading) {
    return <SkeletonProviderMetrics />;
  }

  const metadata = providersData?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalProviders = metadata?.totalProviders ?? providersData?.total ?? 0;
  const activeProviders = metadata?.activeProviders ?? 0;
  const pendingVerificationProviders =
    metadata?.pendingVerificationProviders ?? 0;
  const suspendedProviders = metadata?.suspendedProviders ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Providers"
        value={totalProviders.toString()}
        description="All healthcare providers in the system."
      />
      <ValueIndicator
        title="Active Providers"
        value={activeProviders.toString()}
        description="Providers that are currently active."
      />
      <ValueIndicator
        title="Pending Verification"
        value={pendingVerificationProviders.toString()}
        description="Providers awaiting verification."
      />
      <ValueIndicator
        title="Suspended Providers"
        value={suspendedProviders.toString()}
        description="Providers that are currently suspended."
      />
    </div>
  );
};
