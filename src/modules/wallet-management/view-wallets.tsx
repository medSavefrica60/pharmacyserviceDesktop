import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetWallets } from "@/hooks/api/use-wallets";
import { useWalletsTableColumns } from "@/hooks/common/table/columns/use-wallets-table-columns";
import { useWalletsToolbar } from "@/hooks/common/table/toolbars/use-wallets-toolbar";
import { WalletMetrics } from "./wallet-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewWallets = () => {
  const columns = useWalletsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/wallets" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: walletsData, isLoading } = useGetWallets({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const wallets = walletsData?.data?.wallets || [];
  const totalCount = walletsData?.total || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <WalletMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={9}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "50px",
            "200px",
            "120px",
            "100px",
            "150px",
            "120px",
            "120px",
            "150px",
            "150px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <WalletMetrics walletsData={walletsData} isLoading={false} />
      <DataTable
        data={wallets}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useWalletsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/wallets",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
