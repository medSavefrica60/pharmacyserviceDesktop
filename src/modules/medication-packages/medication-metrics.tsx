"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginatedData, Medication } from "@/types";

interface MedicationMetricsProps {
  medicationsData?: PaginatedData<Medication>;
  isLoading?: boolean;
}

const SkeletonMedicationMetrics = () => {
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

export const MedicationMetrics = ({
  medicationsData,
  isLoading,
}: MedicationMetricsProps) => {
  if (isLoading) {
    return <SkeletonMedicationMetrics />;
  }

  // Get metrics from metadata (calculated in toolbar)
  const metadata = medicationsData?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalMedications =
    metadata?.totalMedications ?? medicationsData?.total ?? 0;
  const activeMedications = metadata?.activeMedications ?? 0;
  const inactiveMedications = metadata?.inactiveMedications ?? 0;
  const suspendedMedications = metadata?.suspendedMedications ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Packages"
        value={totalMedications.toString()}
        description="All packages in the system."
      />
      <ValueIndicator
        title="Active Packages"
        value={activeMedications.toString()}
        description="Packages that are currently active."
      />
      <ValueIndicator
        title="Inactive Packages"
        value={inactiveMedications.toString()}
        description="Packages that are currently inactive."
      />
      <ValueIndicator
        title="Suspended Packages"
        value={suspendedMedications.toString()}
        description="Packages that are currently suspended."
      />
    </div>
  );
};
