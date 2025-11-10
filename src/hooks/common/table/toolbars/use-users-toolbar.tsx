"use client";

import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { UsersQueryData } from "@/hooks/api/use-users";

export interface UsersToolbar<TData> extends ExtendDataTableProps<TData> {}

const usersToolbarConfig: ToolbarConfig = {
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
    // {
    //   label: "Suspended",
    //   value: "SUSPENDED",
    //   filterKey: "status",
    // },
  ],
  search: {
    enabled: true,
    placeholder: "Search among users...",
    // No filterKey specified, will use global filter
  },
  dateRange: {
    enabled: true,
    filterKey: "createdAt",
  },
};

export const useUsersToolbar = forwardRef<TableMethods, UsersToolbar<any>>(
  function UsersToolbar<TData>(
    { table }: UsersToolbar<TData>,
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

    const queryKey = useMemo(() => ["users", queryParams], [queryParams]);

    // Extract table state values
    const rows = table.getFilteredRowModel().rows;

    // Memoize summary calculation
    const summary = useMemo(() => {
      if (!table) {
        return {
          totalUsers: 0,
          totalActiveUsers: 0,
          totalInactiveUsers: 0,
          totalSuspendedUsers: 0,
          totalVerifiedUsers: 0,
        };
      }

      return rows.reduce(
        (acc, userRow) => {
          const userData = userRow.original as User;
          const status = userData.status?.toUpperCase();

          // Update totals
          acc.totalUsers += 1;

          // Update status-specific counts
          switch (status) {
            case "ACTIVE":
              acc.totalActiveUsers += 1;
              break;
            case "INACTIVE":
              acc.totalInactiveUsers += 1;
              break;
            case "SUSPENDED":
              acc.totalSuspendedUsers += 1;
              break;
          }

          // Count verified users
          if (
            userData.isPhoneVerified ||
            userData.isEmailVerified ||
            userData.ghanaCardVerified
          ) {
            acc.totalVerifiedUsers += 1;
          }

          return acc;
        },
        {
          totalUsers: 0,
          totalActiveUsers: 0,
          totalInactiveUsers: 0,
          totalSuspendedUsers: 0,
          totalVerifiedUsers: 0,
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

      const currentData = queryClient.getQueryData<UsersQueryData>(queryKey);
      if (currentData && currentData.data && currentData.data.users) {
        queryClient.setQueryData<UsersQueryData>(queryKey, {
          ...currentData,
          data: {
            ...currentData.data,
            metadata: summary,
          },
        });
      }
    }, [summary, queryKey, queryClient, table]);

    return (
      <DynamicToolbar ref={ref} table={table} config={usersToolbarConfig} />
    );
  }
);
