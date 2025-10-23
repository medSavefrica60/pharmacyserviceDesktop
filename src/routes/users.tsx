import { createFileRoute } from "@tanstack/react-router";
import {
  ViewUsers,
  ViewUserDetails,
  UpdateUser,
  DeleteUser,
} from "@/modules/user-management";
import { UserMiniStatement } from "@/modules/user-management/misc/user-mini-statement";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      userId: (search.userId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewUsers />
      <ViewUserDetails />
      <UpdateUser />
      <DeleteUser />

      {/* miscellaneous user routes */}
      <UserMiniStatement />
    </>
  );
}
