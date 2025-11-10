"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";

export interface MedicationsToolbar<TData> extends ExtendDataTableProps<TData> {}

const medicationsToolbarConfig: ToolbarConfig = {
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
    placeholder: "Search medications...",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useMedicationsToolbar = forwardRef<
  TableMethods,
  MedicationsToolbar<any>
>(function MedicationsToolbar<TData>(
  { table }: MedicationsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  return <DynamicToolbar ref={ref} table={table} config={medicationsToolbarConfig} />;
});

