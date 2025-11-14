import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetContributions } from "@/hooks/api/use-contributions";
import { useContributionsTableColumns } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { useContributionsToolbar } from "@/hooks/common/table/toolbars/use-contributions-toolbar";
import { ContributionMetrics } from "./contribution-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewContributions = () => {
  const columns = useContributionsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/contributions" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: contributionsData, isLoading } = useGetContributions({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const contributionData = contributionsData?.contributions || [];
  const totalCount = contributionData.length || 0;

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
        contributionsData={contributionsData}
        isLoading={false}
      />
      <DataTable
        data={contributionData}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useContributionsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/contributions",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
