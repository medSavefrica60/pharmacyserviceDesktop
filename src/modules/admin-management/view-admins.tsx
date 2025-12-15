import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetAdmins } from "@/hooks/api/use-admins";
import { useAdminsTableColumns } from "@/hooks/common/table/columns/use-admins-table-columns";
import { useAdminsToolbar } from "@/hooks/common/table/toolbars/use-admins-toolbar";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const ViewAdmins = () => {
  const columns = useAdminsTableColumns();
  const navigate = useNavigate();
  const search = useSearch({ from: "/admins" }) as {
    limit?: string;
  };

  const [pageSize, setPageSize] = useState(
    search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE
  );
  const { data: adminsData, isLoading } = useGetAdmins({
    page: DEFAULT_PAGE_INDEX,
    limit: pageSize,
  });

  const admins = adminsData?.data?.admins || [];
  const totalCount = adminsData?.data?.total || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <DataTableSkeleton
          columnCount={7}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "120px",
            "200px",
            "200px",
            "150px",
            "120px",
            "120px",
            "100px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <DataTable
        data={admins}
        limit={DEFAULT_PAGE_SIZE}
        displaySize={search?.limit as string}
        className=""
        count={totalCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useAdminsToolbar}
        onPageSizeChange={(pageSize) => {
          setPageSize(pageSize);
          navigate({
            to: "/admins",
            search: { limit: pageSize },
          } as any);
        }}
      />
    </div>
  );
};
