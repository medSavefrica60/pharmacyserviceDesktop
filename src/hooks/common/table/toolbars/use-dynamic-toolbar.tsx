"use client";

import { forwardRef, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/common/date/date-range-picker";
import { cn } from "@/lib/utils";
import { MedSearchIcon } from "@/components/common/icons";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/common/use-debounce";
import {
  DynamicToolbarProps,
  TableMethods,
} from "@/hooks/common/table/toolbars/types";
import { RefreshCwIcon } from "lucide-react";

export const DynamicToolbar = forwardRef<
  TableMethods,
  DynamicToolbarProps<any>
>(function DynamicToolbar<TData>({
  table,
  config,
  onTabChange: customOnTabChange,
  onSearch: customOnSearch,
  onDateRangeChange: customOnDateRangeChange,
  onRefresh: customOnRefresh,
}: DynamicToolbarProps<TData>) {
  const [activeTab, setActiveTab] = useState<string>(
    config.tabs?.[0]?.value || ""
  );
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300); // 300ms delay

  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const handleRangeChange = ({
    range,
    rangeCompare,
  }: {
    range: DateRange;
    rangeCompare?: DateRange;
  }) => {
    const startDate = range.from;
    const endDate = range.to;
    const startDateCompare = rangeCompare?.from;
    const endDateCompare = rangeCompare?.to;

    const filterKey = config.dateRange?.filterKey || "createdAt";

    if (customOnDateRangeChange) {
      customOnDateRangeChange(
        { from: startDate || null, to: endDate || null },
        filterKey
      );
    } else {
      table.setColumnFilters([
        { id: filterKey, value: { from: startDate, to: endDate } },
      ]);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const filterKey =
      config.tabs?.find((tab) => tab.value === value)?.filterKey || "status";

    if (customOnTabChange) {
      customOnTabChange(value, filterKey);
    } else {
      table.setColumnFilters([{ id: filterKey, value }]);
    }
  };

  useEffect(() => {
    if (!debouncedSearch) {
      if (config.search?.filterKey) {
        table.setColumnFilters([]);
      } else {
        table.setGlobalFilter("");
      }
      return;
    }

    if (customOnSearch) {
      const filterKey = config.search?.filterKey;
      customOnSearch(debouncedSearch.toLowerCase(), filterKey);
    } else if (config.search?.filterKey) {
      table.setColumnFilters([
        { id: config.search.filterKey, value: debouncedSearch.toLowerCase() },
      ]);
    } else {
      table.setGlobalFilter(debouncedSearch.toLowerCase());
    }
  }, [debouncedSearch, table, config.search?.filterKey, customOnSearch]);

  if (!table) {
    return null;
  }

  return (
    <div className="flex flex-1 justify-between border border-b-0 rounded-t-md p-4">
      {/* Tabs Section */}
      {config.tabs && config.tabs.length > 0 && (
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList>
            {config.tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Search Section */}
      {config.search?.enabled && (
        <div className="flex items-center space-x-2">
          <WithSearchInput
            className="h-10 rounded-md"
            value={search}
            onChange={handleSearch}
            placeholder={config.search.placeholder || "Search"}
          />
          {customOnRefresh && (
            <Button
              variant="outline"
              className="bg-medsave-pending-50"
              onClick={customOnRefresh}
            >
              <RefreshCwIcon className="size-4" />
            </Button>
          )}
        </div>
      )}

      {/* Date Range Section */}
      {config.dateRange?.enabled && (
        <DateRangePicker onUpdate={handleRangeChange} />
      )}
      {/* <RefreshCwIcon /> */}
    </div>
  );
});

type WithSearchInputProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const WithSearchInput = (props: WithSearchInputProps) => {
  return (
    <div className={cn("relative flex items-center w-full max-w-sm")}>
      <MedSearchIcon className="absolute left-4 h-5 w-5 text-[#919191] pointer-events-none" />
      <Input
        type="search"
        placeholder={props.placeholder || "Search"}
        className={cn(
          "flex h-12 w-full rounded border  bg-white px-4 pl-12 py-3 text-base text-gray-900 placeholder:text-[#919191] outline-none transition-colors",
          "focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};
