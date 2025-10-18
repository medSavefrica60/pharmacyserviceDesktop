import { forwardRef } from "react";
import { Table } from "@tanstack/react-table";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/common/date/date-range-picker";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { StatementsSearch, SearchOption } from "./statements-search";
import { useSearchUsers } from "@/hooks/api/use-statements";

export interface StatementsToolbar<TData> extends ExtendDataTableProps<TData> {
  table: Table<TData>;
  searchOptions?: SearchOption[];
  onSearch?: (query: string) => void;
  onUserSelect?: (user: SearchOption) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  onDownload?: () => void;
  onClearFilters?: () => void;
}

export type TableMethods = {};

export const useStatementsToolbar = forwardRef<
  TableMethods,
  StatementsToolbar<any>
>(
  ({
    onUserSelect,
    onDateRangeChange,
    onDownload,
    onClearFilters,
  }: StatementsToolbar<any>) => {
    const [dateRange, setDateRange] = useState<{
      from: Date;
      to: Date | undefined;
    }>({
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(),
    });

    const handleUserSelect = (user: SearchOption) => {
      onUserSelect?.(user);
    };

    const handleDateRangeUpdate = (values: {
      range: { from: Date; to: Date | undefined };
    }) => {
      const { from, to } = values.range;
      setDateRange({ from, to });

      if (to) {
        onDateRangeChange?.(
          from.toISOString().split("T")[0],
          to.toISOString().split("T")[0]
        );
      }
    };

    const handleClearFilters = () => {
      setDateRange({
        from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        to: new Date(),
      });
      onClearFilters?.();
    };

    const { data: searchOptionsData = [] } = useSearchUsers("");

    return (
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4 flex-1">
          {/* User Search */}
          <StatementsSearch
            options={searchOptionsData}
            placeholder="Search users by name or member ID..."
            emptyText="No users found."
            onSelect={handleUserSelect}
            onClear={handleClearFilters}
            className="w-80"
          />

          {/* Date Range Picker */}
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            onUpdate={handleDateRangeUpdate}
            showCompare={false}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onDownload}
            className="flex items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    );
  }
);

useStatementsToolbar.displayName = "useStatementsToolbar";
