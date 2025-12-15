import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateTime } from "@/lib/utils";
import { Transaction } from "@/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

export const useTransactionsTableColumns = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<Transaction>[] = useMemo(
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
        accessorKey: "user",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
          const user = row.original.user;
          const initials =
            `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-gray-100">
                <AvatarFallback className="text-sm font-medium text-gray-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
                <span className="text-xs text-gray-400">
                  {user.phoneNumber}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "transactionType",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type & Amount" />
        ),
        cell: ({ row }) => {
          const { transactionType, amount } = row.original;
          const parsedAmount = parseFloat(amount);
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {transactionType}
              </span>
              <span className="text-xs text-gray-500">
                GHS{" "}
                {parsedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
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
          const normalized = status.toLowerCase();
          const isCompleted = normalized === "completed";
          const isPending = normalized === "pending";

          return (
            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm",
                isCompleted
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-50"
                  : isPending
                    ? "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                    : "bg-red-50 text-red-600 border-red-200 hover:bg-red-50"
              )}
            >
              {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
          const description = row.original.description || "";
          const maxLength = 60;
          const truncated =
            description.length > maxLength
              ? `${description.substring(0, maxLength)}...`
              : description;

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="text-sm text-gray-700 truncate block max-w-[260px] cursor-help"
                    title={description || undefined}
                  >
                    {truncated || "-"}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-sm">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "referenceNumber",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Reference" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-gray-700 truncate block max-w-[160px]">
            {row.original.referenceNumber}
          </span>
        ),
      },
      {
        accessorKey: "processedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Processed At" />
        ),
        cell: ({ row }) => {
          const processedAt = row.original.processedAt;
          return (
            <span className="text-sm text-gray-700">
              {processedAt ? formatDateTime(processedAt) : "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">
            {formatDateTime(row.original.createdAt)}
          </span>
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        header: "",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:opacity-70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2ZM12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM15.9482 11.0137C16.5012 11.0137 16.9482 11.4607 16.9482 12.0137C16.9482 12.5667 16.5012 13.0137 15.9482 13.0137C15.3952 13.0137 14.9432 12.5667 14.9432 12.0137C14.9432 11.4607 15.3862 11.0137 15.9382 11.0137H15.9482ZM11.9385 11.0137C12.4915 11.0137 12.9385 11.4607 12.9385 12.0137C12.9385 12.5667 12.4915 13.0137 11.9385 13.0137C11.3855 13.0137 10.9345 12.5667 10.9345 12.0137C10.9345 11.4607 11.3765 11.0137 11.9295 11.0137H11.9385ZM7.9297 11.0137C8.4827 11.0137 8.9297 11.4607 8.9297 12.0137C8.9297 12.5667 8.4827 13.0137 7.9297 13.0137C7.3767 13.0137 6.9247 12.5667 6.9247 12.0137C6.9247 11.4607 7.3677 11.0137 7.9207 11.0137H7.9297Z"
                      fill="#919191"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/transactions",
                      search: {
                        dialog: "details",
                        transactionId: row.original.id,
                      } as any,
                    })
                  }
                >
                  See More
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [navigate]
  );

  return columns;
};
