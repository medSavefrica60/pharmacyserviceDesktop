import { DataTable } from "@/components/common/data-table/data-table";
import { useGetMedications } from "@/hooks/api/use-medications";
import { useMedicationsTableColumns } from "@/hooks/common/table/columns/use-medications-table-columns";
import { MedicationsTableSkeleton } from "./skeletons/medications-table-skeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewMedications = () => {
  const columns = useMedicationsTableColumns();
  const { data: medicationsData, isLoading } = useGetMedications();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Medication Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor medications
            </p>
          </div>
          <Button
            onClick={() =>
              navigate({
                to: "/medications",
                search: {
                  sheet: "create",
                  dialog: undefined,
                  medicationId: undefined,
                },
              })
            }
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Medication
          </Button>
        </div>
        <MedicationsTableSkeleton />
      </div>
    );
  }

  const medications = medicationsData?.medications || [];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Medications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage medication inventory and catalog
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/medications",
              search: {
                sheet: "create",
                dialog: undefined,
                medicationId: undefined,
              },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>

      {medications.length > 0 ? (
        <DataTable
          data={medications}
          className=""
          count={medications.length}
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
                <path d="M10.5 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6.5L14 2h-3.5z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-900 font-semibold">
              No Medications Yet
            </p>
            <p className="text-center text-sm text-gray-700">
              No medications have been added yet. Add your first medication to
              get started.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/medications",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    medicationId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
