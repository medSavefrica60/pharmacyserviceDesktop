import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetClaims } from "@/hooks/api/use-claims";
import { useClaimsTableColumns } from "@/hooks/common/table/columns/use-claims-table-columns";
import { useClaimsToolbar } from "@/hooks/common/table/toolbars/use-claims-toolbar";
import { ClaimMetrics } from "./claim-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewClaims = () => {
  const columns = useClaimsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/claims" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: claimsData, isLoading } = useGetClaims({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const claims = claimsData?.data?.claims || [];
  const totalCount = claims.length || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <ClaimMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={8}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "60px",
            "150px",
            "150px",
            "200px",
            "120px",
            "120px",
            "100px",
            "100px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <ClaimMetrics claimsData={claimsData} isLoading={false} />
      <DataTable
        data={claims}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useClaimsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/claims",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
