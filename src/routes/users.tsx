import { createFileRoute } from "@tanstack/react-router";
import {
  ViewUsers,
  ViewUserDetails,
  UpdateUser,
  DeleteUser,
} from "@/modules/user-management";

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
    </>
  );
}
