"use client";

import React, { forwardRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { ProviderClaim } from "@/types";

export interface ProviderClaimsToolbar<TData> extends ExtendDataTableProps<TData> {}

const providerClaimsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Pending",
      value: "pending",
      filterKey: "status",
    },
    {
      label: "Approved",
      value: "approved",
      filterKey: "status",
    },
    {
      label: "Rejected",
      value: "rejected",
      filterKey: "status",
    },
    {
      label: "Expired",
      value: "expired",
      filterKey: "status",
    },
    {
      label: "Cancelled",
      value: "cancelled",
      filterKey: "status",
    },
  ],
  search: {
    enabled: true,
    placeholder: "Search among claims...",
    filterKey: "patientName",
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useProviderClaimsToolbar = forwardRef<TableMethods, ProviderClaimsToolbar<any>>(
  function ProviderClaimsToolbar<TData>(
    { table }: ProviderClaimsToolbar<TData>,
    ref: React.ForwardedRef<TableMethods>
  ) {
    return <DynamicToolbar table={table} config={providerClaimsToolbarConfig} ref={ref} />;
  }
);
