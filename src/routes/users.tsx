import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ViewUsers, DeleteUser } from "@/modules/user-management";
import { UserPackageEnrollment } from "@/modules/user-management/misc/user-package-enrollment";
import ShowMiniStatement from "@/modules/user-management/misc/show-mini-statement";
import { ViewUserClaims } from "@/modules/user-management/misc/user-claims";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string | undefined) || undefined,
      userId: (search.userId as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactUsersRoute = currentPath === "/users";
  return (
    <>
      {isExactUsersRoute ? (
        <>
          <ViewUsers />
          <DeleteUser />

          {/* miscellaneous user routes */}
          <ShowMiniStatement />
          <UserPackageEnrollment />
          <ViewUserClaims />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
