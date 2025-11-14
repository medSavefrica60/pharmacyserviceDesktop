"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Contribution } from "@/hooks/common/table/columns/use-contributions-table-columns";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

export interface ContributionsToolbar<TData>
  extends ExtendDataTableProps<TData> {}

const contributionsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Completed",
      value: "completed",
      filterKey: "status",
    },
    {
      label: "Pending",
      value: "pending",
      filterKey: "status",
    },
    {
      label: "Failed",
      value: "failed",
      filterKey: "status",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search contributions...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useContributionsToolbar = forwardRef<
  TableMethods,
  ContributionsToolbar<any>
>(function ContributionsToolbar<TData>(
  { table }: ContributionsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/contributions" }) as {
    limit?: string;
  };

  const limit = search.limit ? parseInt(search.limit) : DEFAULT_PAGE_SIZE;

  const globalFilter = table.getState().globalFilter;
  const columnFilters = table.getState().columnFilters;
  const sorting = table.getState().sorting;
  const paging = table.getState().pagination;

  useEffect(() => {
    if (!table) return;
    const rows = table.getFilteredRowModel().rows;

    const summary = rows.reduce(
      (acc, row) => {
        const contribution = row.original as Contribution;
        const status = contribution.status?.toLowerCase();
        const amount = Number(contribution.amount) || 0;

        // Update totals
        acc.totalContributions += 1;

        // Update status-specific counts and amounts
        switch (status) {
          case "completed":
            acc.completedContributions += 1;
            acc.totalContributionAmount += amount;
            break;
          case "pending":
            acc.pendingContributions += 1;
            break;
          case "failed":
            acc.failedContributions += 1;
            break;
        }

        return acc;
      },
      {
        totalContributions: 0,
        completedContributions: 0,
        pendingContributions: 0,
        failedContributions: 0,
        totalContributionAmount: 0,
      }
    );

    const params = {
      page: DEFAULT_PAGE_INDEX,
      limit: limit,
    };

    queryClient.setQueryData(["contributions", params], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        metadata: summary,
      };
    });
  }, [
    table,
    limit,
    globalFilter,
    columnFilters,
    sorting,
    paging,
    queryClient.getQueryData([
      "contributions",
      { page: DEFAULT_PAGE_INDEX, limit: limit },
    ]),
  ]);

  return (
    <DynamicToolbar
      ref={ref}
      table={table}
      config={contributionsToolbarConfig}
    />
  );
});
