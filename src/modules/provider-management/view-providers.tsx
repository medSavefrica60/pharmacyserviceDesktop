import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetProviders } from "@/hooks/api/use-providers";
import { useProvidersTableColumns } from "@/hooks/common/table/columns/use-providers-table-columns";
import { useProvidersToolbar } from "@/hooks/common/table/toolbars/use-providers-toolbar";
import { ProviderMetrics } from "./provider-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewProviders = () => {
  const columns = useProvidersTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: providersData, isLoading } = useGetProviders({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const providers = providersData?.providers || [];
  const totalCount = providers?.length || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <ProviderMetrics isLoading={true} />
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
      <ProviderMetrics providersData={providersData} isLoading={false} />
      <DataTable
        data={providers}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useProvidersToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/providers",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
