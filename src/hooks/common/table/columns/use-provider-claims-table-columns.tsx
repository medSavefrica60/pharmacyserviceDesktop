import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideCopy, LucideCopyCheck } from "lucide-react";
import { ProviderClaim } from "@/types";
import { formatDateTime } from "@/lib/utils";

export const useProviderClaimsTableColumns = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyID = async (id: string) => {
    setCopiedId(id);
    await navigator.clipboard.writeText(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

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
        accessorKey: "reference",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Reference" />
        ),
        cell: ({ row }) => {
          const reference = row.original.reference;
          const isCopied = copiedId === reference;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm text-medsave-black-300 font-medium">
                {reference}
              </span>
              <button
                onClick={() => handleCopyID(reference)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-pointer"
              >
                {isCopied ? (
                  <LucideCopyCheck
                    size={16}
                    className="text-medsave-success-500"
                  />
                ) : (
                  <LucideCopy size={16} className="text-medsave-black-400" />
                )}
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "patientId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="MedSave ID" />
        ),
        cell: ({ row }) => {
          const patientId = row.original.user.medsaveId;
          const isCopied = copiedId === patientId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {patientId}
              </span>
              <button
                onClick={() => handleCopyID(patientId)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-pointer"
              >
                {isCopied ? (
                  <LucideCopyCheck
                    size={16}
                    className="text-medsave-success-500"
                  />
                ) : (
                  <LucideCopy size={16} className="text-medsave-black-400" />
                )}
              </button>
            </div>
          );
        },
      },

      {
        accessorKey: "patientName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Patient Name" />
        ),
        cell: ({ row }) => {
          const name = `${row.original.user.firstName} ${row.original.user.lastName}`;
          const initials = name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-medsave-black-50">
                <AvatarFallback className="text-sm font-medium text-medsave-black-300">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm text-medsave-black-300 font-medium">
                  {name}
                </span>
                <span className="text-xs text-medsave-black-400">
                  {row.original.user.medsaveId}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "packageId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Package ID" />
        ),
        cell: ({ row }) => {
          const packageId = row.original.packageId;
          const shortId = packageId.slice(0, 8);
          const isCopied = copiedId === packageId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {shortId}...
              </span>
              <button
                onClick={() => handleCopyID(packageId)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-pointer"
              >
                {isCopied ? (
                  <LucideCopyCheck
                    size={16}
                    className="text-medsave-success-500"
                  />
                ) : (
                  <LucideCopy size={16} className="text-medsave-black-400" />
                )}
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim Date" />
        ),
        cell: ({ row }) => {
          const dateStr = row.original.createdAt;
          return (
            <span className="text-sm text-medsave-black-300">
              {formatDateTime(dateStr)}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.original.amount);
          const formattedAmount = new Intl.NumberFormat("en-GH", {
            style: "currency",
            currency: "GHS",
          }).format(amount);

          return (
            <span className="text-sm text-medsave-black-300 font-semibold">
              {formattedAmount}
            </span>
          );
        },
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
              variant={status === "approved" ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm capitalize",
                status === "approved"
                  ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100 hover:bg-green-50"
                  : status === "pending"
                    ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                    : status === "rejected"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : status === "expired"
                        ? "bg-orange-50 text-orange-600 border-orange-200"
                        : status === "cancelled"
                          ? "bg-gray-50 text-gray-600 border-gray-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
              )}
            >
              {status}
            </Badge>
          );
        },
      },
    ],
    [copiedId]
  );

  return columns;
};
