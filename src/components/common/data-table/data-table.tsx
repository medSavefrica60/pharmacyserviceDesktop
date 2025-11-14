"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./data-table-pagination";
import React from "react";
import { cn } from "@/lib/utils";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import {
  DataTableFilterField,
  ExtendDataTableProps,
  ExtendDataTableRefMethods,
} from "./types";
import { useDataTable } from "@/hooks/common/use-data-table";

interface TasksTableProps<TData, TValue>
  extends React.HTMLAttributes<HTMLElement> {
  data: TData[];
  /**
   * Total number of records across all pages (not the current page count).
   * This is used to calculate pageCount = Math.ceil(count / limit)
   */
  count: number;
  /**
   * Number of records per page (page size).
   */
  limit: number;
  pageSizeOptions?: number[];
  columns: ColumnDef<TData, TValue>[];
  filterFields?: DataTableFilterField<TData>[];
  Toolbar?: React.ForwardRefExoticComponent<
    ExtendDataTableProps<TData> &
      React.RefAttributes<ExtendDataTableRefMethods<TData>>
  >;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  toolbarClassName?: string;
  hidePagination?: boolean;
  displaySize?: string;
}
export function DataTable<TData, TValue>({
  data,
  count,
  limit,
  pageSizeOptions,
  columns,
  className,
  Toolbar,
  hidePagination,
  onPageSizeChange,
  displaySize,
}: TasksTableProps<TData, TValue>) {
  const defaultPerPage = limit;
  // Calculate pageCount from total records (count) and page size (limit)
  const pageCount = Math.ceil(count / limit) || 0;

  const { table } = useDataTable({ data, columns, pageCount, defaultPerPage });

  return (
    <div className="flex-1 relative">
      {Toolbar ? <Toolbar table={table} /> : null}
      <div className={cn(className)}>
        <Table className="w-full">
          <TableHeader className="font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-medium px-6 text-gray-500 text-base border"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={cn(
                    `hover:cursor-pointer`,
                    index % 2 === 0
                      ? "bg-transparent"
                      : "bg-medsave-black-50/50"
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 px-6 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10">
                  <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
                    <MedEmptyBoxIcon />
                    <div className="text-base font-medium text-gray-900">
                      No results found
                    </div>
                    <div className="text-sm text-gray-500">
                      Try adjusting your search or filters.
                    </div>
                    {(table.getState().globalFilter !== "" ||
                      table.getState().columnFilters.length > 0 ||
                      table.getState().sorting.length > 0) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          table.resetColumnFilters();
                          table.setGlobalFilter("");
                          table.resetSorting();
                        }}
                        className="mt-1"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {hidePagination ? null : (
          <div className="flex flex-col gap-2.5 px-6 py-2 md:flex-row md:items-center md:justify-between w-full">
            <DataTablePagination
              table={table}
              pageSizeOptions={pageSizeOptions}
              pageSize={defaultPerPage}
              onPageSizeChange={(pageSize) => {
                onPageSizeChange?.(pageSize);
              }}
              displaySize={displaySize as string}
            />
          </div>
        )}
      </div>
    </div>
  );
}
