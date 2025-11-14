"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { AuditLog } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

export interface AuditLogsToolbar<TData> extends ExtendDataTableProps<TData> {}

const auditLogsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "action",
    },
    {
      label: "User Read",
      value: "USER_READ",
      filterKey: "action",
    },
    {
      label: "Admin Login",
      value: "ADMIN_LOGIN",
      filterKey: "action",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search audit logs...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useAuditLogsToolbar = forwardRef<
  TableMethods,
  AuditLogsToolbar<any>
>(function AuditLogsToolbar<TData>(
  { table }: AuditLogsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/audit-log" }) as {
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
        const auditLog = row.original as AuditLog;
        const action = auditLog.action;

        // Update totals
        acc.totalLogs += 1;

        // Update action-specific counts
        switch (action) {
          case "USER_READ":
            acc.userReadLogs += 1;
            break;
          case "ADMIN_LOGIN":
            acc.adminLoginLogs += 1;
            break;
          case "USER_CREATE":
            acc.userCreateLogs += 1;
            break;
          case "USER_UPDATE":
            acc.userUpdateLogs += 1;
            break;
          case "USER_DELETE":
            acc.userDeleteLogs += 1;
            break;
        }

        return acc;
      },
      {
        totalLogs: 0,
        userReadLogs: 0,
        adminLoginLogs: 0,
        userCreateLogs: 0,
        userUpdateLogs: 0,
        userDeleteLogs: 0,
      }
    );

    const params = {
      page: DEFAULT_PAGE_INDEX,
      limit: limit,
    };

    queryClient.setQueryData(
      ["audit-logs", params],
      (oldData: any) => {
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
      "audit-logs",
      { page: DEFAULT_PAGE_INDEX, limit: limit },
    ]),
  ]);

  return (
    <DynamicToolbar ref={ref} table={table} config={auditLogsToolbarConfig} />
  );
});

