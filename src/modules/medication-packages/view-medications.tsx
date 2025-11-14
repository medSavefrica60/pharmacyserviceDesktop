import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetMedications } from "@/hooks/api/use-medications";
import { useMedicationsTableColumns } from "@/hooks/common/table/columns/use-medications-table-columns";
import { useMedicationsToolbar } from "@/hooks/common/table/toolbars/use-medications-toolbar";
import { MedicationMetrics } from "./medication-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewMedications = () => {
  const columns = useMedicationsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/medications" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: medicationsData, isLoading } = useGetMedications({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const medications = medicationsData?.medications || [];
  const totalCount = medications.length || 0;

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
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useMedicationsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/medications",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
