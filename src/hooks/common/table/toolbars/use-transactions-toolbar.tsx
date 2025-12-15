"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Transaction, TransactionsResponse } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

export interface TransactionsToolbar<
  TData,
> extends ExtendDataTableProps<TData> {}

const transactionsToolbarConfig: ToolbarConfig = {
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
    placeholder: "Search transactions...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useTransactionsToolbar = forwardRef<
  TableMethods,
  TransactionsToolbar<any>
>(function TransactionsToolbar<TData>(
  { table }: TransactionsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/transactions" }) as {
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
        const tx = row.original as Transaction;
        const status = (tx.status || "").toLowerCase();

        // Update totals
        acc.totalTransactions += 1;
        acc.totalAmount += parseFloat(tx.amount);

        // Update status-specific counts
        switch (status) {
          case "completed":
            acc.completedTransactions += 1;
            break;
          case "pending":
            acc.pendingTransactions += 1;
            break;
          case "failed":
            acc.failedTransactions += 1;
            break;
        }

        return acc;
      },
      {
        totalTransactions: 0,
        completedTransactions: 0,
        pendingTransactions: 0,
        failedTransactions: 0,
        totalAmount: 0,
      }
    );

    const params = {
      page: DEFAULT_PAGE_INDEX,
      limit: limit,
    };

    queryClient.setQueryData(
      ["transactions", params],
      (oldData: TransactionsResponse | undefined) => {
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
      "transactions",
      { page: DEFAULT_PAGE_INDEX, limit: limit },
    ]),
  ]);

  return (
    <DynamicToolbar
      ref={ref}
      table={table}
      config={transactionsToolbarConfig}
    />
  );
});
