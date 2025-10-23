import { DataTable } from "@/components/common/data-table/data-table";
import { useGetPackages } from "@/hooks/api/use-packages";
import { usePackagesTableColumns } from "@/hooks/common/table/columns/use-packages-table-columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewPackages = () => {
  const columns = usePackagesTableColumns();
  const { data: packages, isLoading } = useGetPackages();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading packages...</p>
        </div>
      </div>
    );
  }

  const packageData = packages?.packages || [];
  const totalCount = packages?.pagination?.total || 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Medication Packages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor medication packages
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/packages",
              search: {
                sheet: "create",
                dialog: undefined,
                packageId: undefined,
              },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      {packageData.length > 0 ? (
        <DataTable
          data={packageData}
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
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <p className="text-center text-sm text-medsave-black-500 font-semibold">
              No Packages Yet
            </p>
            <p className="text-center text-sm text-medsave-black-300">
              No medication packages have been created yet. Packages will appear
              here once they are configured.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/packages",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    packageId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Package
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
