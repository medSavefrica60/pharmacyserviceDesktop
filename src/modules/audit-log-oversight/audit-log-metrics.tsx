"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLogsResponse } from "@/types";

interface AuditLogMetricsProps {
  auditLogsData?: AuditLogsResponse["data"] & {
    metadata?: {
      totalLogs?: number;
      userReadLogs?: number;
      adminLoginLogs?: number;
      userCreateLogs?: number;
      userUpdateLogs?: number;
      userDeleteLogs?: number;
    };
  };
  isLoading?: boolean;
}

const SkeletonAuditLogMetrics = () => {
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

export const AuditLogMetrics = ({
  auditLogsData,
  isLoading,
}: AuditLogMetricsProps) => {
  if (isLoading) {
    return <SkeletonAuditLogMetrics />;
  }

  // Get metrics from metadata (calculated in toolbar)
  const metadata = auditLogsData?.metadata;
  // Use metadata if available (calculated from filtered rows), otherwise fallback to total
  const totalLogs = metadata?.totalLogs ?? auditLogsData?.total ?? 0;
  const userReadLogs = metadata?.userReadLogs ?? 0;
  const adminLoginLogs = metadata?.adminLoginLogs ?? 0;
  const userCreateLogs = metadata?.userCreateLogs ?? 0;
  const userUpdateLogs = metadata?.userUpdateLogs ?? 0;
  const userDeleteLogs = metadata?.userDeleteLogs ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Logs"
        value={totalLogs.toString()}
        description="All audit logs in the system."
      />
      <ValueIndicator
        title="User Read"
        value={userReadLogs.toString()}
        description="User read operations logged."
      />
      <ValueIndicator
        title="Admin Login"
        value={adminLoginLogs.toString()}
        description="Admin login operations logged."
      />
      <ValueIndicator
        title="User Actions"
        value={(userCreateLogs + userUpdateLogs + userDeleteLogs).toString()}
        description="User create, update, and delete operations."
      />
    </div>
  );
};

