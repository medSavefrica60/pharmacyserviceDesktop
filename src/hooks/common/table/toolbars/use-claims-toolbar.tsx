"use client";

import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Claim } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";

// Type for claims query response with optional metadata
export type ClaimsQueryData = {
  data: {
    claims: Claim[];
    total: number;
    page: number;
    limit: number;
    metadata?: {
      totalClaims: number;
      totalSuccessClaims: number;
      totalFailedClaim: number;
      totalPendingClaims: number;
      totalClaimAmount: number;
    };
  };
};

export interface ClaimsToolbar<TData> extends ExtendDataTableProps<TData> {}

const claimsToolbarConfig: ToolbarConfig = {
  tabs: [
    {
      label: "All",
      value: "",
      filterKey: "status",
    },
    {
      label: "Approved",
      value: "approved",
      filterKey: "status",
    },
    {
      label: "Pending",
      value: "pending",
      filterKey: "status",
    },
    {
      label: "Expired",
      value: "expired",
      filterKey: "status",
    },
    {
      label: "Rejected",
      value: "rejected",
      filterKey: "status",
    },
    {
      label: "Cancelled",
      value: "cancelled",
      filterKey: "status",
    },
    // disputed and vetted
    {
      label: "Disputed",
      value: "disputed",
      filterKey: "status",
    },
    {
      label: "Vetted",
      value: "vetted",
      filterKey: "status",
    },
  ],
  // Global search enabled - searches across:
  // - reference (claim reference number)
  // - provider.organizationName (provider name)
  // - package.name (package name)
  // - amount (claim amount)
  // - status (claim status)
  search: {
    enabled: true,
    placeholder: "Search claims...",
    // No filterKey specified = uses global filter
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useClaimsToolbar = forwardRef<TableMethods, ClaimsToolbar<any>>(
  function ClaimsToolbar<TData>(
    { table }: ClaimsToolbar<TData>,
    ref: React.ForwardedRef<TableMethods>
  ) {
    const queryClient = useQueryClient();
    const prevSummaryRef = useRef<string>("");

    // Memoize query params to prevent recreation on each render
    const queryParams = useMemo(
      () => ({
        page: DEFAULT_PAGE_INDEX,
        limit: DEFAULT_PAGE_SIZE,
      }),
      []
    );

    const queryKey = useMemo(() => ["claims", queryParams], [queryParams]);

    // Extract table state values
    const rows = table.getFilteredRowModel().rows;

    // Memoize summary calculation
    const summary = useMemo(() => {
      if (!table) {
        return {
          totalClaims: 0,
          totalSuccessClaims: 0,
          totalFailedClaim: 0,
          totalPendingClaims: 0,
          totalClaimAmount: 0,
        };
      }

      return rows.reduce(
        (acc, claimRow) => {
          const claimData = claimRow.original as Claim;
          const amount = Number(claimData.amount) || 0;
          const status = claimData.status?.toLowerCase();

          // Update totals
          acc.totalClaims += 1;

          // Update status-specific counts and amounts
          switch (status) {
            case "approved":
              acc.totalSuccessClaims += 1;
              acc.totalClaimAmount += amount; // Only count approved claims
              break;
            case "pending":
              acc.totalPendingClaims += 1;
              break;
            case "rejected":
            case "expired":
            case "cancelled":
              acc.totalFailedClaim += 1;
              break;
          }

          return acc;
        },
        {
          totalClaims: 0,
          totalSuccessClaims: 0,
          totalFailedClaim: 0,
          totalPendingClaims: 0,
          totalClaimAmount: 0,
        }
      );
    }, [table, rows]);

    useEffect(() => {
      if (!table) return;

      // Serialize summary to compare with previous
      const summaryString = JSON.stringify(summary);

      // Only update if summary has actually changed
      if (summaryString === prevSummaryRef.current) {
        return;
      }

      prevSummaryRef.current = summaryString;

      const currentData = queryClient.getQueryData<ClaimsQueryData>(queryKey);
      if (currentData && currentData.data && currentData.data.claims) {
        queryClient.setQueryData<ClaimsQueryData>(queryKey, {
          ...currentData,
          data: {
            ...currentData.data,
            metadata: summary,
          },
        });
      }
    }, [summary, queryKey, queryClient, table]);

    return (
      <DynamicToolbar ref={ref} table={table} config={claimsToolbarConfig} />
    );
  }
);
