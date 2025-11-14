"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Provider, PaginatedData } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

export interface ProvidersToolbar<TData> extends ExtendDataTableProps<TData> {}

const providersToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Active",
      value: "ACTIVE",
      filterKey: "status",
    },
    {
      label: "Pending",
      value: "PENDING_VERIFICATION",
      filterKey: "status",
    },
    {
      label: "Suspended",
      value: "SUSPENDED",
      filterKey: "status",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search providers...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useProvidersToolbar = forwardRef<
  TableMethods,
  ProvidersToolbar<any>
>(function ProvidersToolbar<TData>(
  { table }: ProvidersToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/providers" }) as {
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
        const provider = row.original as Provider;
        const status = provider.status;

        // Update totals
        acc.totalProviders += 1;

        // Update status-specific counts
        switch (status) {
          case "ACTIVE":
            acc.activeProviders += 1;
            break;
          case "PENDING_VERIFICATION":
            acc.pendingVerificationProviders += 1;
            break;
          case "SUSPENDED":
            acc.suspendedProviders += 1;
            break;
        }

        return acc;
      },
      {
        totalProviders: 0,
        activeProviders: 0,
        pendingVerificationProviders: 0,
        suspendedProviders: 0,
      }
    );

    const params = {
      page: DEFAULT_PAGE_INDEX,
      limit: limit,
    };

    queryClient.setQueryData(
      ["providers", params],
      (oldData: PaginatedData<Provider> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          metadata: summary,
        };
      }
    );
  }, [
    table,
    limit,
    globalFilter,
    columnFilters,
    sorting,
    paging,
    queryClient.getQueryData([
      "providers",
      { page: DEFAULT_PAGE_INDEX, limit: limit },
    ]),
  ]);

  return (
    <DynamicToolbar ref={ref} table={table} config={providersToolbarConfig} />
  );
});
