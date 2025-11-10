"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";

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
  return (
    <DynamicToolbar ref={ref} table={table} config={providersToolbarConfig} />
  );
});
