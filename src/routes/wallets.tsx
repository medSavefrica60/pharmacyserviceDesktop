import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ViewWallets } from "@/modules/wallet-management/view-wallets";

export const Route = createFileRoute("/wallets")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      limit: (search.limit as string) || undefined,
      walletId: (search.walletId as string) || undefined,
      dialog: (search.dialog as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactWalletsRoute = currentPath === "/wallets";
  return (
    <>
      {isExactWalletsRoute ? (
        <>
          <ViewWallets />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
