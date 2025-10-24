import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";

export const UsersTableSkeleton = () => {
  return (
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
      withPagination={true}
    />
  );
};
