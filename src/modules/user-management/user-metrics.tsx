"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersQueryData } from "@/hooks/api/use-users";

interface UserMetricsProps {
  usersData?: UsersQueryData;
  isLoading?: boolean;
}

const SkeletonUserMetrics = () => {
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

export const UserMetrics = ({ usersData, isLoading }: UserMetricsProps) => {
  if (isLoading) {
    return <SkeletonUserMetrics />;
  }

  // Get metrics from metadata if available, otherwise calculate from data
  const metadata = usersData?.data?.metadata;
  const users = usersData?.data?.users || [];

  // Calculate metrics from data if metadata is not available
  const calculateMetrics = () => {
    if (metadata) {
      return {
        totalUsers: metadata.totalUsers,
        totalActiveUsers: metadata.totalActiveUsers,
        totalInactiveUsers: metadata.totalInactiveUsers,
        totalVerifiedUsers: metadata.totalVerifiedUsers,
      };
    }

    // Fallback: calculate from users array
    const totalUsers = users.length;
    const totalActiveUsers = users.filter(
      (u) => u.status?.toUpperCase() === "ACTIVE"
    ).length;
    const totalInactiveUsers = users.filter(
      (u) => u.status?.toUpperCase() === "INACTIVE"
    ).length;
    const totalVerifiedUsers = users.filter(
      (u) => u.isPhoneVerified && u.isEmailVerified && u.ghanaCardVerified
    ).length;

    return {
      totalUsers,
      totalActiveUsers,
      totalInactiveUsers,
      totalVerifiedUsers,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ValueIndicator
        title="Total Users"
        value={metrics.totalUsers.toString()}
        description="All users in the system."
      />
      <ValueIndicator
        title="Active Users"
        value={metrics.totalActiveUsers.toString()}
        description="Users that are currently active in the system."
      />
      <ValueIndicator
        title="Inactive Users"
        value={metrics.totalInactiveUsers.toString()}
        description="Users that are currently inactive in the system."
      />
      <ValueIndicator
        title="Verified Users"
        value={metrics.totalVerifiedUsers.toString()}
        description="Users that have been verified in the system."
      />
    </div>
  );
};
