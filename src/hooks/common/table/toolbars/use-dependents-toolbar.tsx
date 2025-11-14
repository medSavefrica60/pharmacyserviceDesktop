"use client";

import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Dependent } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";

// Type for dependents query response with optional metadata
export type DependentsQueryData = {
  data: {
    dependents: Dependent[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    metadata?: {
      totalDependents: number;
      totalActiveDependents: number;
      totalInactiveDependents: number;
    };
  };
};

export interface DependentsToolbar<TData> extends ExtendDataTableProps<TData> {}

const dependentsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Active",
      value: "active",
      filterKey: "status",
    },
    {
      label: "Inactive",
      value: "inactive",
      filterKey: "status",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search dependents...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useDependentsToolbar = forwardRef<
  TableMethods,
  DependentsToolbar<any>
>(function DependentsToolbar<TData>(
  { table }: DependentsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  const queryClient = useQueryClient();
  const prevSummaryRef = useRef<string>("");

  // Memoize query params to prevent recreation on each render
  const queryParams = useMemo(
    () => ({
      page: DEFAULT_PAGE_INDEX,
      limit: DEFAULT_PAGE_SIZE,
    }),
    []
  );

  const queryKey = useMemo(() => ["dependents", queryParams], [queryParams]);

  // Extract table state values
  const rows = table.getFilteredRowModel().rows;

  // Memoize summary calculation
  const summary = useMemo(() => {
    if (!table) {
      return {
        totalDependents: 0,
        totalActiveDependents: 0,
        totalInactiveDependents: 0,
      };
    }

    return rows.reduce(
      (acc, dependentRow) => {
        const dependentData = dependentRow.original as Dependent;
        const status = dependentData.status?.toLowerCase();

        // Update totals
        acc.totalDependents += 1;

        // Update status-specific counts
        switch (status) {
          case "active":
            acc.totalActiveDependents += 1;
            break;
          case "inactive":
            acc.totalInactiveDependents += 1;
            break;
        }

        return acc;
      },
      {
        totalDependents: 0,
        totalActiveDependents: 0,
        totalInactiveDependents: 0,
      }
    );
  }, [table, rows]);

  useEffect(() => {
    if (!table) return;

    // Serialize summary to compare with previous
    const summaryString = JSON.stringify(summary);

    // Only update if summary has actually changed
    if (summaryString === prevSummaryRef.current) {
      return;
    }

    prevSummaryRef.current = summaryString;

    const currentData = queryClient.getQueryData(queryKey);
    if (currentData) {
      queryClient.setQueryData(queryKey, {
        ...(currentData as any),
        metadata: summary,
      });
    }
  }, [
    summary,
    queryKey,
    queryClient,
    table,
    queryClient.getQueryData(queryKey),
  ]);

  return (
    <DynamicToolbar ref={ref} table={table} config={dependentsToolbarConfig} />
  );
});

