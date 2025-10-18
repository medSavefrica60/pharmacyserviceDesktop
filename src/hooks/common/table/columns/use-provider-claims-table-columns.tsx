import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProviderClaim = {
  id: string;
  claimId: string;
  patientName: string;
  patientId: string;
  service: string;
  claimDate: string;
  amount: string;
  status: "Approved" | "Pending" | "Rejected";
  avatar?: string;
};

export const useProviderClaimsTableColumns = () => {
  const columns: ColumnDef<ProviderClaim>[] = useMemo(
    () => [
      {
        id: "index",
        header: "",
        cell: ({ row }) => (
          <div className="text-sm text-medsave-black-300 font-medium">
            {row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: "claimId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim ID" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-medium">
            {row.original.claimId}
          </span>
        ),
      },
      {
        accessorKey: "patientName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Patient" />
        ),
        cell: ({ row }) => {
          const name = row.original.patientName;
          const avatar =
            row.original.avatar || `https://github.com/shadcn.png?size=80`;
          const initials = name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-medsave-black-50">
                <AvatarImage alt={name} src={avatar} />
                <AvatarFallback className="text-sm font-medium text-medsave-black-300">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm text-medsave-black-300">{name}</span>
                <span className="text-xs text-medsave-black-200">
                  {row.original.patientId}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "service",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Service" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.service}
          </span>
        ),
      },
      {
        accessorKey: "claimDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim Date" />
        ),
        cell: ({ row }) => {
          const dateStr = row.original.claimDate;
          if (!dateStr)
            return <span className="text-sm text-medsave-black-300">N/A</span>;

          try {
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <span className="text-sm text-medsave-black-300">
                {formattedDate}
              </span>
            );
          } catch {
            return <span className="text-sm text-medsave-black-300">N/A</span>;
          }
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-semibold">
            {row.original.amount}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant={status === "Approved" ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm",
                status === "Approved"
                  ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100 hover:bg-green-50"
                  : status === "Pending"
                    ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                    : "bg-red-50 text-red-600 border-red-200"
              )}
            >
              {status}
            </Badge>
          );
        },
      },
    ],
    []
  );

  return columns;
};
