import { forwardRef } from "react";
import { Table } from "@tanstack/react-table";
import { ExtendDataTableProps } from "@/components/common/data-table/types";

export interface PatientsToolbar<TData> extends ExtendDataTableProps<TData> {
table: Table<TData>;
}
export type TableMethods = {};

export const usePatientsToolbar = forwardRef<
TableMethods,
PatientsToolbar<any>

> (function PatientsToolbar<TData>({ table }: PatientsToolbar<TData>) {
> if (table) {
> }
> return null;
> });
