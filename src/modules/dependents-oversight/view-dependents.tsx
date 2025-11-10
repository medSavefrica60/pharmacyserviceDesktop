import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetDependents } from "@/hooks/api/use-dependents";
import { useDependentsTableColumns } from "@/hooks/common/table/columns/use-dependents-table-columns";
import { useDependentsToolbar } from "@/hooks/common/table/toolbars/use-dependents-toolbar";
import { DependentMetrics } from "./dependent-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { DependentsQueryData } from "@/hooks/common/table/toolbars/use-dependents-toolbar";

export const ViewDependents = () => {
  const columns = useDependentsTableColumns();
  const { data: dependentsData, isLoading } = useGetDependents({
    page: DEFAULT_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  });

  // Transform the response to match DependentsQueryData structure
  const transformedData: DependentsQueryData | undefined = dependentsData
    ? {
        data: {
          dependents: dependentsData.data?.dependents || [],
          pagination: dependentsData.data?.pagination || {
            page: DEFAULT_PAGE_INDEX,
            limit: DEFAULT_PAGE_SIZE,
            total: 0,
            totalPages: 0,
          },
        },
      }
    : undefined;

  const dependents = dependentsData?.data?.dependents || [];
  const totalCount =
    dependentsData?.data?.pagination?.total || dependents.length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <DependentMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={7}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "60px",
            "120px",
            "200px",
            "150px",
            "200px",
            "150px",
            "120px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <DependentMetrics dependentsData={transformedData} isLoading={false} />
      <DataTable
        data={dependents}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useDependentsToolbar}
      />
    </div>
  );
};
