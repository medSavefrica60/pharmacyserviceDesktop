"use client";

import { ValueIndicator } from "@/components/common/misc/kpi-indicators";
import { Skeleton } from "@/components/ui/skeleton";
import { WalletsResponse, Wallet } from "@/types";

interface WalletMetricsProps {
  walletsData?: WalletsResponse;
  isLoading?: boolean;
}

const SkeletonWalletMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
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

export const WalletMetrics = ({
  walletsData,
  isLoading,
}: WalletMetricsProps) => {
  if (isLoading) {
    return <SkeletonWalletMetrics />;
  }

  const wallets = walletsData?.data?.wallets || [];
  const metadata = walletsData?.metadata as any;

  // Compute metrics from wallets array if metadata not available
  const totalWallets =
    metadata?.totalWallets ?? walletsData?.total ?? wallets.length;
  const activeWallets =
    metadata?.activeWallets ??
    wallets.filter((w: Wallet) => w.status === "ACTIVE").length;
  const inactiveWallets =
    metadata?.inactiveWallets ??
    wallets.filter((w: Wallet) => w.status === "INACTIVE").length;
  const suspendedWallets =
    metadata?.suspendedWallets ??
    wallets.filter((w: Wallet) => w.status === "SUSPENDED").length;
  const momoLinkedWallets =
    metadata?.momoLinkedWallets ??
    wallets.filter((w: Wallet) => w.isMomoLinked).length;
  const totalBalance =
    metadata?.totalBalance ??
    wallets.reduce((sum: number, w: Wallet) => sum + parseFloat(w.balance), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <ValueIndicator
        title="Total Wallets"
        value={totalWallets.toString()}
        description="All wallets in the system."
      />
      <ValueIndicator
        title="Active Wallets"
        value={activeWallets.toString()}
        description="Wallets that are currently active."
      />
      <ValueIndicator
        title="Inactive Wallets"
        value={inactiveWallets.toString()}
        description="Wallets that are currently inactive."
      />
      <ValueIndicator
        title="Suspended Wallets"
        value={suspendedWallets.toString()}
        description="Wallets that are currently suspended."
      />
      <ValueIndicator
        title="Mobile Money Linked"
        value={momoLinkedWallets.toString()}
        description="Wallets linked to mobile money."
      />
      <ValueIndicator
        title="Total Balance"
        value={`GHS ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        description="Total balance across all wallets."
      />
    </div>
  );
};
