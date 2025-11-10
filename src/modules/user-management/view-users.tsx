import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useGetUsers } from "@/hooks/api/use-users";
import { useUsersTableColumns } from "@/hooks/common/table/columns/use-users-table-columns";
import { UserMetrics } from "./user-metrics";
import { useUsersToolbar } from "@/hooks/common/table/toolbars/use-users-toolbar";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";

export const ViewUsers = () => {
  const columns = useUsersTableColumns();
  const { data: usersData, isLoading } = useGetUsers({
    page: DEFAULT_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  });

  const users = usersData?.data?.users || [];
  const totalCount = usersData?.data?.users?.length || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <UserMetrics isLoading={true} />
        <DataTableSkeleton
          columnCount={7}
          rowCount={10}
          searchableColumnCount={1}
          filterableColumnCount={1}
          showViewOptions={true}
          cellWidths={[
            "120px",
            "200px",
            "150px",
            "120px",
            "100px",
            "120px",
            "100px",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <UserMetrics usersData={usersData} isLoading={false} />
      <DataTable
        data={users}
        className=""
        count={totalCount}
        limit={100}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columns={columns}
        Toolbar={useUsersToolbar}
      />
    </div>
  );
};
