import { DataTable } from "@/components/common/data-table/data-table";
import { useGetProviders } from "@/hooks/api/use-providers";
import { useProvidersTableColumns } from "@/hooks/common/table/columns/use-providers-table-columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewProviders = () => {
  const columns = useProvidersTableColumns();
  const { data: providersData, isLoading } = useGetProviders();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading providers...</p>
        </div>
      </div>
    );
  }

  const providers = providersData?.providers || [];
  const totalCount = providersData?.total || 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Provider Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage healthcare providers and facilities
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/providers",
              search: {
                sheet: "create",
                dialog: undefined,
                providerId: undefined,
              },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Provider
        </Button>
      </div>

      {providers.length > 0 ? (
        <DataTable
          data={providers}
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
                <path d="M3 12h18" />
                <path d="m15 6 6 6-6 6" />
                <path d="M9 18V6" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-900 font-semibold">
              No Providers Yet
            </p>
            <p className="text-center text-sm text-gray-700">
              No providers have been registered yet. Add your first provider to
              get started.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/providers",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    providerId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
