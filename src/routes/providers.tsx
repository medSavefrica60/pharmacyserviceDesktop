import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  ViewProviders,
  ViewProviderDetails,
  DeleteProvider,
  ViewProviderClaims,
} from "@/modules/provider-management";

export const Route = createFileRoute("/providers")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string) || undefined,
      providerId: (search.providerId as string) || undefined,
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
          <ViewProviders />
          <ViewProviderDetails />
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
