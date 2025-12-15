import { createFileRoute } from "@tanstack/react-router";
import WalletDetails from "@/modules/wallet-management/components/wallet-details";
import WalletStatus from "@/modules/wallet-management/components/wallet-status";
import WalletBalanceAdjust from "@/modules/wallet-management/components/wallet-balance-adjust";
import { WalletActionsBar } from "@/modules/wallet-management/components/wallet-actions-bar";
import { useGetWallet } from "@/hooks/api/use-wallets";

export const Route = createFileRoute("/wallets/$walletId/edit")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string | undefined) || undefined,
      walletId: (search.walletId as string | undefined) || undefined,
      limit: (search.limit as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const { walletId } = Route.useParams();
  const { data: wallet, isLoading } = useGetWallet(walletId);

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <WalletDetails wallet={wallet} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <WalletStatus wallet={wallet} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <WalletBalanceAdjust wallet={wallet} isLoading={isLoading} />
          </div>
        </div>
        <WalletActionsBar walletId={walletId} />
      </main>
    </>
  );
}
