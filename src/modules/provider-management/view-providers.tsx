import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetProviders } from "@/hooks/api/use-providers";
import { useProvidersTableColumns } from "@/hooks/common/table/columns/use-providers-table-columns";
import { useProvidersToolbar } from "@/hooks/common/table/toolbars/use-providers-toolbar";
import { ProviderMetrics } from "./provider-metrics";

export const ViewProviders = () => {
  const columns = useProvidersTableColumns();
  const { data: providersData, isLoading } = useGetProviders();

  const providers = providersData?.providers || [];
  const totalCount = providersData?.total || providers.length;

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
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useProvidersToolbar}
      />
    </div>
  );
};
