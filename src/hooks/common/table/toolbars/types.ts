import { Table } from "@tanstack/react-table";
import { ExtendDataTableProps } from "@/components/common/data-table/types";

export interface TabOption {
  label: string;
  value: string;
  filterKey?: string; // Optional: specify which column to filter
}

export interface ToolbarConfig {
  tabs?: TabOption[];
  search?: {
    enabled: boolean;
    placeholder?: string;
    filterKey?: string; // Optional: specify which column to filter, defaults to global filter
  };
  dateRange?: {
    enabled: boolean;
    filterKey?: string; // Optional: specify which column to filter
  };
}

export interface DynamicToolbarProps<TData>
  extends ExtendDataTableProps<TData> {
  table: Table<TData>;
  config: ToolbarConfig;
  onTabChange?: (value: string, filterKey?: string) => void;
  onSearch?: (value: string, filterKey?: string) => void;
  onRefresh?: () => void;
  onDateRangeChange?: (
    range: { from: Date | null; to: Date | null },
    filterKey?: string
  ) => void;
}

export type TableMethods = {};
