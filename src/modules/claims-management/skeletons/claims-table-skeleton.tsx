import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";

export const ClaimsTableSkeleton = () => {
  return (
    <DataTableSkeleton
      columnCount={8}
      rowCount={10}
      searchableColumnCount={1}
      filterableColumnCount={2}
      showViewOptions={true}
      cellWidths={[
        "120px",
        "150px",
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
