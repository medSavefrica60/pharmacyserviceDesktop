import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ViewAdmins } from "@/modules/admin-management";

export const Route = createFileRoute("/admins")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string | undefined) || undefined,
      adminId: (search.adminId as string | undefined) || undefined,
      limit: (search.limit as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactAdminsRoute = currentPath === "/admins";
  return (
    <>
      {isExactAdminsRoute ? (
        <>
          <ViewAdmins />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
