import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetClaims } from "@/hooks/api/use-claims";
import { useClaimsTableColumns } from "@/hooks/common/table/columns/use-claims-table-columns";
import { useClaimsToolbar } from "@/hooks/common/table/toolbars/use-claims-toolbar";
import { ClaimMetrics } from "./claim-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { ClaimsQueryData } from "@/hooks/common/table/toolbars/use-claims-toolbar";
import { Claim } from "@/types";

export const ViewClaims = () => {
  const columns = useClaimsTableColumns();
  const { data: claimsData, isLoading } = useGetClaims({
    page: DEFAULT_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  });

  // Transform the response to match ClaimsQueryData structure
  const transformedData: ClaimsQueryData | undefined = claimsData
    ? {
        data: {
          claims: (claimsData.data?.claims || []) as Claim[],
          total: claimsData.data?.total || 0,
          page: claimsData.data?.page || DEFAULT_PAGE_INDEX,
          limit: claimsData.data?.limit || DEFAULT_PAGE_SIZE,
        },
      }
    : undefined;

  const claims = claimsData?.data?.claims || [];
  const totalCount = claimsData?.data?.total || 0;

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
      <ClaimMetrics claimsData={transformedData} isLoading={false} />
      <DataTable
        data={claims}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useClaimsToolbar}
      />
    </div>
  );
};
