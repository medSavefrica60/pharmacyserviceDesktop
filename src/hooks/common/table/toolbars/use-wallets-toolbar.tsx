"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Wallet, WalletsResponse } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

export interface WalletsToolbar<TData> extends ExtendDataTableProps<TData> {}

const walletsToolbarConfig: ToolbarConfig = {
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
      label: "Inactive",
      value: "INACTIVE",
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
    placeholder: "Search wallets...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useWalletsToolbar = forwardRef<TableMethods, WalletsToolbar<any>>(
  function WalletsToolbar<TData>(
    { table }: WalletsToolbar<TData>,
    ref: React.ForwardedRef<TableMethods>
  ) {
    const queryClient = useQueryClient();
    const search = useSearch({ from: "/wallets" }) as {
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
          const wallet = row.original as Wallet;
          const status = wallet.status;

          // Update totals
          acc.totalWallets += 1;
          acc.totalBalance += parseFloat(wallet.balance);

          // Update status-specific counts
          switch (status) {
            case "ACTIVE":
              acc.activeWallets += 1;
              break;
            case "INACTIVE":
              acc.inactiveWallets += 1;
              break;
            case "SUSPENDED":
              acc.suspendedWallets += 1;
              break;
          }

          // Count mobile money linked
          if (wallet.isMomoLinked) {
            acc.momoLinkedWallets += 1;
          }

          return acc;
        },
        {
          totalWallets: 0,
          activeWallets: 0,
          inactiveWallets: 0,
          suspendedWallets: 0,
          momoLinkedWallets: 0,
          totalBalance: 0,
        }
      );

      const params = {
        page: DEFAULT_PAGE_INDEX,
        limit: limit,
      };

      queryClient.setQueryData(
        ["wallets", params],
        (oldData: WalletsResponse | undefined) => {
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
        "wallets",
        { page: DEFAULT_PAGE_INDEX, limit: limit },
      ]),
    ]);

    return (
      <DynamicToolbar ref={ref} table={table} config={walletsToolbarConfig} />
    );
  }
);
