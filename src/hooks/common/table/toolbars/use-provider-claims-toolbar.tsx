import { forwardRef } from "react";
import { Table } from "@tanstack/react-table";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter } from "lucide-react";

export interface ProviderClaimsToolbar<TData>
  extends ExtendDataTableProps<TData> {
  table: Table<TData>;
}
export type TableMethods = {};

export const useProviderClaimsToolbar = forwardRef<
  TableMethods,
  ProviderClaimsToolbar<any>
>(function ProviderClaimsToolbar<TData>({
  table,
}: ProviderClaimsToolbar<TData>) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-b">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search claims..."
            value={
              (table.getColumn("patientName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("patientName")?.setFilterValue(event.target.value)
            }
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
});
