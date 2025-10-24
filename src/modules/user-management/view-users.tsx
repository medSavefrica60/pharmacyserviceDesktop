import { DataTable } from "@/components/common/data-table/data-table";
import { useGetUsers } from "@/hooks/api/use-users";
import { useUsersTableColumns } from "@/hooks/common/table/columns/use-users-table-columns";
import { UsersTableSkeleton } from "./skeletons/users-table-skeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewUsers = () => {
  const columns = useUsersTableColumns();
  const { data: usersData, isLoading } = useGetUsers();
  const navigate = useNavigate();

  const users = usersData?.users || [];
  const totalCount = usersData?.total || 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage system users and their permissions
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/users",
              search: { sheet: "create", dialog: undefined, userId: undefined },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {isLoading ? (
        <UsersTableSkeleton />
      ) : users.length > 0 ? (
        <DataTable
          data={users}
          className=""
          count={totalCount}
          limit={100}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          columns={columns}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
            <div className="rounded-full bg-muted p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-900 font-semibold">
              No Users Yet
            </p>
            <p className="text-center text-sm text-gray-700">
              No users have been created yet. Add your first user to get
              started.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/users",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    userId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
