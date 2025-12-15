import { createFileRoute } from "@tanstack/react-router";
import PersonalInformation from "@/modules/admin-management/components/personal-information";
import AdminStatus from "@/modules/admin-management/components/admin-status";
import { AdminActionsBar } from "@/modules/admin-management/components/admin-actions-bar";
import { useGetAdmin } from "@/hooks/api/use-admins";
import { DeleteAdmin } from "@/modules/admin-management/delete-admin";
import { SuspendAdmin } from "@/modules/admin-management/suspend-admin";

export const Route = createFileRoute("/admins/$adminId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { adminId } = Route.useParams();
  const { data: admin, isLoading } = useGetAdmin(adminId);

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <PersonalInformation admin={admin} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <AdminStatus admin={admin} isLoading={isLoading} />
          </div>
        </div>
        <AdminActionsBar adminId={adminId} />
      </main>
      <DeleteAdmin />
      <SuspendAdmin />
    </>
  );
}
