import { createFileRoute } from "@tanstack/react-router";
import PersonalInformation from "@/modules/user-management/components/personal-information";
import Others from "@/modules/user-management/components/others";
import UserStatus from "@/modules/user-management/components/user-status";
import { UserActionsBar } from "@/modules/user-management/components/user-actions-bar";
import { useGetUser } from "@/hooks/api/use-users";
import { DeleteUser } from "@/modules/user-management/delete-user";
import ShowMiniStatement from "@/modules/user-management/misc/show-mini-statement";
import { UserPackageEnrollment } from "@/modules/user-management/misc/user-package-enrollment";
import { ViewUserClaims } from "@/modules/user-management/misc/user-claims";
import { UserDependents } from "@/modules/user-management/misc/user-dependents";
import { AddDependentDialog } from "@/modules/user-management/misc/add-dependent-dialog";

export const Route = createFileRoute("/users/$userId/edit")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string | undefined) || undefined,
      userId: (search.userId as string | undefined) || undefined,
      dependentId: (search.dependentId as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useGetUser(userId);

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <PersonalInformation user={user} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <Others user={user} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <UserStatus user={user} isLoading={isLoading} />
          </div>

          <div className="mb-6">
            <UserDependents userId={userId} isLoading={isLoading} />
          </div>
        </div>
        <UserActionsBar userId={userId} />
      </main>
      <DeleteUser />
      <ShowMiniStatement />
      <UserPackageEnrollment />
      <ViewUserClaims />
      <AddDependentDialog />
    </>
  );
}
