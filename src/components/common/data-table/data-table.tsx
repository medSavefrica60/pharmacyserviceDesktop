import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import React from "react";
import { cn } from "@/lib/utils";
import {
  DataTableFilterField,
  ExtendDataTableProps,
  ExtendDataTableRefMethods,
} from "./types";
import { useDataTable } from "@/hooks/common/use-data-table";
import { DataTableSkeleton } from "./data-table-skeleton";

interface TasksTableProps<TData, TValue>
  extends React.HTMLAttributes<HTMLElement> {
  data: TData[];
  count: number;
  limit: number;
  pageSizeOptions?: number[];
  columns: ColumnDef<TData, TValue>[];
  filterFields?: DataTableFilterField<TData>[];
  Toolbar?: React.ForwardRefExoticComponent<
    ExtendDataTableProps<TData> &
      React.RefAttributes<ExtendDataTableRefMethods<TData>>
  >;
  className?: string;
  toolbarClassName?: string;
  hidePagination?: boolean;
  skeleton?: boolean;
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
  skeleton,
}: TasksTableProps<TData, TValue>) {
  const defaultPerPage = limit;
  const pageCount = count;

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
                      className="font-medium px-4 text-gray-500 text-sm border"
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
                    index % 2 === 0 ? "bg-transparent" : "bg-gray-50/50"
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 px-2 border">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No record found.
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
