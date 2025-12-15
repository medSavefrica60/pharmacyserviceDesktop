import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetTransactions } from "@/hooks/api/use-transactions";
import { useTransactionsTableColumns } from "@/hooks/common/table/columns/use-transactions-table-columns";
import { useTransactionsToolbar } from "@/hooks/common/table/toolbars/use-transactions-toolbar";
import { TransactionMetrics } from "./transaction-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewTransactions = () => {
  const columns = useTransactionsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/transactions" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: transactionsData, isLoading } = useGetTransactions({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const transactions = transactionsData?.data?.transactions || [];
  const totalCount = transactionsData?.total || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <TransactionMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={8}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "50px",
            "220px",
            "100px",
            "120px",
            "200px",
            "160px",
            "150px",
            "150px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <TransactionMetrics
        transactionsData={transactionsData}
        isLoading={false}
      />
      <DataTable
        data={transactions}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useTransactionsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/transactions",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
