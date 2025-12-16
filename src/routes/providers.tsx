import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  ViewProviders,
  DeleteProvider,
  ViewProviderClaims,
  ProviderListActionsBar,
} from "@/modules/provider-management";

export const Route = createFileRoute("/providers")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string) || undefined,
      providerId: (search.providerId as string) || undefined,
      filterStatus: (search.filterStatus as string) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactProvidersRoute = currentPath === "/providers";

  return (
    <>
      {isExactProvidersRoute ? (
        <>
          <main className="min-h-full flex flex-col relative">
            <div className="flex h-full flex-1 flex-col pb-24">
              <ViewProviders />
            </div>
            <ProviderListActionsBar />
          </main>
          <DeleteProvider />

          {/* miscellaneous provider routes */}
          <ViewProviderClaims />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
