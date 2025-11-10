import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetContributions } from "@/hooks/api/use-contributions";
import { useContributionsTableColumns } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { useContributionsToolbar } from "@/hooks/common/table/toolbars/use-contributions-toolbar";
import { ContributionMetrics } from "./contribution-metrics";

export const ViewContributions = () => {
  const columns = useContributionsTableColumns();
  const { data: contributions, isLoading } = useGetContributions();

  const contributionData = contributions || [];
  const totalCount = contributionData.length;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <ContributionMetrics isLoading={true} />
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
      <ContributionMetrics
        contributionsData={contributionData}
        isLoading={false}
      />
      <DataTable
        data={contributionData}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useContributionsToolbar}
      />
    </div>
  );
};
