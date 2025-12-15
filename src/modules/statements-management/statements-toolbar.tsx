import { forwardRef } from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/common/date/date-range-picker";
import { DownloadIcon, UserIcon, X } from "lucide-react";
import { useState } from "react";
import {
  UserSearchOption,
  transformUserToSearchOption,
} from "./statements-search";
import { useGetUsers } from "@/hooks/api/use-users";
import { StatementsSearch } from "./statements-search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface StatementsToolbar<TData> {
  table?: Table<TData>;
  searchOptions?: UserSearchOption[];
  onSearch?: (query: string) => void;
  onUserSelect?: (user: UserSearchOption) => void;
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

    const handleUserSelect = (user: UserSearchOption) => {
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

    const { data: usersData } = useGetUsers();
    const users = usersData?.data?.users || [];

    // Transform users to search options
    const searchOptionsData: UserSearchOption[] = users.map(
      transformUserToSearchOption
    );

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
            // renderOption={ }
            renderSelected={(option, onClear) => (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <p>{option.name}</p>
                <Button variant="ghost" size="icon" onClick={onClear}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
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
