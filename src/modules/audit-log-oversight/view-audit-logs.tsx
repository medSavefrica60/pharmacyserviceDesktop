import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetAuditLogs } from "@/hooks/api/use-audit-logs";
import { useAuditLogsTableColumns } from "@/hooks/common/table/columns/use-audit-logs-table-columns";
import { useAuditLogsToolbar } from "@/hooks/common/table/toolbars/use-audit-logs-toolbar";
import { AuditLogMetrics } from "./audit-log-metrics";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewAuditLogs = () => {
  const columns = useAuditLogsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/audit-log" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: auditLogsData, isLoading } = useGetAuditLogs({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const auditLogs = auditLogsData?.auditLogs || [];
  const totalCount = auditLogsData?.total || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <AuditLogMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={8}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "60px",
            "300px",
            "200px",
            "150px",
            "200px",
            "150px",
            "180px",
            "80px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <AuditLogMetrics auditLogsData={auditLogsData} isLoading={false} />
      <DataTable
        data={auditLogs}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useAuditLogsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/audit-log",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
