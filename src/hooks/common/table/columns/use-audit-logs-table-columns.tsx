import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { AuditLog } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const useAuditLogsTableColumns = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const columns: ColumnDef<AuditLog>[] = useMemo(
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
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
          const description = row.original.description;
          return (
            <div className="max-w-md">
              <p className="text-sm text-gray-900 line-clamp-2" title={description}>
                {description}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "adminId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Admin ID" />
        ),
        cell: ({ row }) => {
          const adminId = row.original.adminId;
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-mono">{adminId}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(adminId, `admin-${row.original.id}`)}
              >
                {copiedId === `admin-${row.original.id}` ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "ipAddress",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="IP Address" />
        ),
        cell: ({ row }) => {
          const ipAddress = row.original.ipAddress;
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-mono">{ipAddress}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(ipAddress, `ip-${row.original.id}`)}
              >
                {copiedId === `ip-${row.original.id}` ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "userAgent",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User Agent" />
        ),
        cell: ({ row }) => {
          const userAgent = row.original.userAgent;
          return (
            <div className="max-w-xs">
              <p className="text-sm text-gray-700 truncate" title={userAgent}>
                {userAgent}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => {
          const action = row.original.action;
          return (
            <Badge variant="outline" className="text-xs">
              {action}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
          const date = row.original.createdAt;
          return (
            <div className="text-sm text-gray-700">
              {formatDateTime(date)}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const auditLog = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => copyToClipboard(auditLog.id, `id-${auditLog.id}`)}
                >
                  {copiedId === `id-${auditLog.id}` ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy ID
                    </>
                  )}
                </DropdownMenuItem>
                {auditLog.targetResourceId && (
                  <DropdownMenuItem
                    onClick={() =>
                      copyToClipboard(
                        auditLog.targetResourceId!,
                        `resource-${auditLog.id}`
                      )
                    }
                  >
                    {copiedId === `resource-${auditLog.id}` ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Resource ID
                      </>
                    )}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [copiedId]
  );

  return columns;
};

