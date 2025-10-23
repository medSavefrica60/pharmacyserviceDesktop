import { DataTable } from "@/components/common/data-table/data-table";
import { useGetDependents } from "@/hooks/api/use-dependents";
import { useDependentsTableColumns } from "@/hooks/common/table/columns/use-dependents-table-columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewDependents = () => {
  const columns = useDependentsTableColumns();
  const { data: dependents, isLoading } = useGetDependents();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading dependents...</p>
        </div>
      </div>
    );
  }

  const dependentData = dependents || [];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Dependents Oversight</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor all dependents
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/dependents",
              search: {
                sheet: "create",
                dialog: undefined,
                dependentId: undefined,
              },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Dependent
        </Button>
      </div>

      {dependentData.length > 0 ? (
        <DataTable
          data={dependentData}
          className=""
          count={dependentData.length}
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
            <p className="text-center text-sm text-medsave-black-500 font-semibold">
              No Dependents Yet
            </p>
            <p className="text-center text-sm text-medsave-black-300">
              No dependents have been added yet. Add your first dependent to get
              started.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/dependents",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    dependentId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Dependent
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
