"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";

export interface AdminsToolbar<TData> extends ExtendDataTableProps<TData> {}

const adminsToolbarConfig: ToolbarConfig = {
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
  ],
  search: {
    enabled: true,
    placeholder: "Search among admins...",
    // No filterKey specified, will use global filter
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useAdminsToolbar = forwardRef<TableMethods, AdminsToolbar<any>>(
  function AdminsToolbar<TData>(
    { table }: AdminsToolbar<TData>,
    ref: React.ForwardedRef<TableMethods>
  ) {
    return (
      <DynamicToolbar ref={ref} table={table} config={adminsToolbarConfig} />
    );
  }
);

