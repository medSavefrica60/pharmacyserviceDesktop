import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetDependents } from "@/hooks/api/use-dependents";
import { useDependentsTableColumns } from "@/hooks/common/table/columns/use-dependents-table-columns";
import { useDependentsToolbar } from "@/hooks/common/table/toolbars/use-dependents-toolbar";
import { DependentMetrics } from "./dependent-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewDependents = () => {
  const columns = useDependentsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/dependents" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: dependentsData, isLoading } = useGetDependents({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const dependents = dependentsData?.dependents || [];
  const totalCount = dependents.length || 0;

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
      <DependentMetrics dependentsData={dependentsData} isLoading={false} />
      <DataTable
        data={dependents}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useDependentsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/dependents",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
