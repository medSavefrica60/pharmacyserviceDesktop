"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";

export interface ContributionsToolbar<TData> extends ExtendDataTableProps<TData> {}

const contributionsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Completed",
      value: "Completed",
      filterKey: "status",
    },
    {
      label: "Pending",
      value: "Pending",
      filterKey: "status",
    },
    {
      label: "Failed",
      value: "Failed",
      filterKey: "status",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search contributions...",
  },
  dateRange: {
    enabled: true,
    filterKey: "paymentDate",
  },
};

export const useContributionsToolbar = forwardRef<
  TableMethods,
  ContributionsToolbar<any>
>(function ContributionsToolbar<TData>(
  { table }: ContributionsToolbar<TData>,
  ref: React.ForwardedRef<TableMethods>
) {
  return <DynamicToolbar ref={ref} table={table} config={contributionsToolbarConfig} />;
});

