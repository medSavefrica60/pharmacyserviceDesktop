import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  ViewDependents,
  DeleteDependent,
} from "@/modules/dependents-oversight";

export const Route = createFileRoute("/dependents")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string) || undefined,
      dependentId: (search.dependentId as string) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactDependentsRoute = currentPath === "/dependents";

  return (
    <>
      {isExactDependentsRoute ? (
        <>
          <ViewDependents />
          <DeleteDependent />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
