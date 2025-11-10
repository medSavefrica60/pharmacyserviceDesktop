import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetPackages } from "@/hooks/api/use-packages";
import { usePackagesTableColumns } from "@/hooks/common/table/columns/use-packages-table-columns";
import { usePackagesToolbar } from "@/hooks/common/table/toolbars/use-packages-toolbar";
import { PackageMetrics } from "./package-metrics";

export const ViewPackages = () => {
  const columns = usePackagesTableColumns();
  const { data: packages, isLoading } = useGetPackages();

  const packageData = packages?.packages || [];
  const totalCount = packages?.pagination?.total || packageData.length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <PackageMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={5}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={["120px", "200px", "150px", "100px", "100px"]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PackageMetrics packagesData={packages} isLoading={false} />
      <DataTable
        data={packageData}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={usePackagesToolbar}
      />
    </div>
  );
};
