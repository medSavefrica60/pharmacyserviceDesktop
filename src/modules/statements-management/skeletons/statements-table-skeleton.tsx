import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";

export const StatementsTableSkeleton = () => {
  return (
    <DataTableSkeleton
      columnCount={5}
      rowCount={10}
      searchableColumnCount={1}
      filterableColumnCount={1}
      showViewOptions={true}
      cellWidths={["120px", "200px", "150px", "100px", "100px"]}
      withPagination={true}
    />
  );
};
