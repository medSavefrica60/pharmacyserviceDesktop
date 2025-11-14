"use client";

import React, { forwardRef, useEffect } from "react";
import { ExtendDataTableProps } from "@/components/common/data-table/types";
import { DynamicToolbar } from "./use-dynamic-toolbar";
import { ToolbarConfig, TableMethods } from "./types";
import { Medication, PaginatedData } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constant";
import { useSearch } from "@tanstack/react-router";

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
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/medications" }) as {
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
        const medication = row.original as Medication;
        const status = medication.status;

        // Update totals
        acc.totalMedications += 1;

        // Update status-specific counts
        switch (status) {
          case "ACTIVE":
            acc.activeMedications += 1;
            break;
          case "INACTIVE":
            acc.inactiveMedications += 1;
            break;
          case "SUSPENDED":
            acc.suspendedMedications += 1;
            break;
        }

        return acc;
      },
      {
        totalMedications: 0,
        activeMedications: 0,
        inactiveMedications: 0,
        suspendedMedications: 0,
      }
    );

    const params = {
      page: DEFAULT_PAGE_INDEX,
      limit: limit,
    };

    queryClient.setQueryData(
      ["medications", params],
      (oldData: PaginatedData<Medication> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          metadata: {
            totalMedications: summary.totalMedications,
            activeMedications: summary.activeMedications,
            inactiveMedications: summary.inactiveMedications,
            suspendedMedications: summary.suspendedMedications,
          },
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
      "medications",
      { page: DEFAULT_PAGE_INDEX, limit: limit },
    ]),
  ]);

  return <DynamicToolbar ref={ref} table={table} config={medicationsToolbarConfig} />;
});

