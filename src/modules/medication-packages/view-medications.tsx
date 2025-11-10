import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetMedications } from "@/hooks/api/use-medications";
import { useMedicationsTableColumns } from "@/hooks/common/table/columns/use-medications-table-columns";
import { useMedicationsToolbar } from "@/hooks/common/table/toolbars/use-medications-toolbar";
import { MedicationMetrics } from "./medication-metrics";

export const ViewMedications = () => {
  const columns = useMedicationsTableColumns();
  const { data: medicationsData, isLoading } = useGetMedications();

  const medications = medicationsData?.medications || [];
  const totalCount = medicationsData?.total || medications.length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <MedicationMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={6}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={["120px", "200px", "150px", "120px", "100px", "100px"]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <MedicationMetrics
        medicationsData={medicationsData}
        isLoading={false}
      />
      <DataTable
        data={medications}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useMedicationsToolbar}
      />
    </div>
  );
};
