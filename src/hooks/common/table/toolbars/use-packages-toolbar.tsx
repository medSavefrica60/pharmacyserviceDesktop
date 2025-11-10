"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";

export interface PackagesToolbar<TData> extends ExtendDataTableProps<TData> {}

const packagesToolbarConfig: ToolbarConfig = {
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
    placeholder: "Search packages...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const usePackagesToolbar = forwardRef<
  TableMethods,
  PackagesToolbar<any>
>(function PackagesToolbar<TData>(
  { table }: PackagesToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  return <DynamicToolbar ref={ref} table={table} config={packagesToolbarConfig} />;
});

