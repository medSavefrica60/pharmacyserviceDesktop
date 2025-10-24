import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";

export const ProvidersTableSkeleton = () => {
  return (
    <DataTableSkeleton
      columnCount={6}
      rowCount={10}
      searchableColumnCount={1}
      filterableColumnCount={1}
      showViewOptions={true}
      cellWidths={["120px", "200px", "150px", "120px", "100px", "100px"]}
      withPagination={true}
    />
  );
};
