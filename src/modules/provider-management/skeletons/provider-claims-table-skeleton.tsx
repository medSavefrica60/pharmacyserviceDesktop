import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";

export const ProviderClaimsTableSkeleton = () => {
  return (
    <DataTableSkeleton
      columnCount={7}
      rowCount={10}
      searchableColumnCount={0}
      filterableColumnCount={0}
      showViewOptions={false}
      cellWidths={[
        "120px",
        "150px",
        "200px",
        "150px",
        "120px",
        "100px",
        "100px",
      ]}
      withPagination={true}
    />
  );
};
