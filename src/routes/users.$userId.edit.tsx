import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PersonalInformation from "@/modules/user-management/forms/personal-information";
import Others from "@/modules/user-management/forms/others";
import { useGetUser } from "@/hooks/api/use-users";
import { ChevronUp, PackageIcon, Trash2 } from "lucide-react";
import { DeleteUser } from "@/modules/user-management/delete-user";
import ShowMiniStatement from "@/modules/user-management/misc/show-mini-statement";
import { UserPackageEnrollment } from "@/modules/user-management/misc/user-package-enrollment";
import { CaretUpIcon } from "@radix-ui/react-icons";
import { ViewUserClaims } from "@/modules/user-management/misc/user-claims";

export const Route = createFileRoute("/users/$userId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useGetUser(userId);

  const handleDelete = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId: userId! },
      search: { userId: userId!, dialog: "delete" },
    });
  };

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
            <PersonalInformation user={user} isLoading={isLoading} />
          </div>
          <div className="mb-6">
            <Others user={user} isLoading={isLoading} />
          </div>
        </div>
        <span className="fixed bottom-0 left-0 right-0 flex justify-center py-4 border-t self-start bg-background">
          <div className="flex items-center gap-2 rounded-xl">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 px-2 py-1.5 bg-medsave-error-200 text-white rounded-xl hover:bg-medsave-error-300"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete User</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate({
                  to: "/users/$userId/edit",
                  params: { userId: userId! },
                  search: { dialog: "mini-statement", userId: userId! },
                });
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-white rounded-xl bg-medsave-blue-100 hover:bg-medsave-blue-200"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="text-sm font-medium">Mini Statement</span>
            </button>
            {/* lets add user package enrollments */}
            <button
              type="button"
              onClick={() => {
                navigate({
                  to: "/users/$userId/edit",
                  params: { userId: userId! },
                  search: { dialog: "packages", userId: userId! },
                });
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-white rounded-xl bg-medsave-blue-100 hover:bg-medsave-blue-200"
            >
              <PackageIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Package Enrollments</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigate({
                  to: "/users/$userId/edit",
                  params: { userId: userId! },
                  search: { dialog: "claims", userId: userId! },
                });
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-white rounded-xl bg-medsave-blue-100 hover:bg-medsave-blue-200"
            >
              <CaretUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">View Claims</span>
            </button>
          </div>
        </span>
      </main>
      <DeleteUser />
      <ShowMiniStatement />
      <UserPackageEnrollment />
      <ViewUserClaims />
    </>
  );
}
