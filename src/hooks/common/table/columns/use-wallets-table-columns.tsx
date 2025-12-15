import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateTime } from "@/lib/utils";
import { Wallet } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

export const useWalletsTableColumns = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<Wallet>[] = useMemo(
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
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "balance",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Balance" />
        ),
        cell: ({ row }) => {
          const balance = parseFloat(row.original.balance);
          const currency = row.original.currency;
          return (
            <span className="text-sm font-semibold text-gray-700">
              {currency}{" "}
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
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
          const isActive = status === "ACTIVE";

          return (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-20 text-sm rounded-sm",
                isActive
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-50"
                  : status === "INACTIVE"
                    ? "bg-gray-50 text-gray-500 border-gray-200"
                    : "bg-red-50 text-red-600 border-red-200"
              )}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "isMomoLinked",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Mobile Money" />
        ),
        cell: ({ row }) => {
          const isLinked = row.original.isMomoLinked;
          const provider = row.original.mobileMoneyProvider;
          const number = row.original.mobileMoneyNumber;

          return (
            <div className="flex flex-col">
              <Badge
                variant={isLinked ? "default" : "secondary"}
                className={cn(
                  "px-3 py-0.5 w-fit text-xs rounded-sm",
                  isLinked
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                )}
              >
                {isLinked ? "Linked" : "Not Linked"}
              </Badge>
              {isLinked && provider && (
                <span className="text-xs text-gray-500 mt-1">
                  {provider} {number}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "dailyLimit",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Daily Limit" />
        ),
        cell: ({ row }) => {
          const limit = parseFloat(row.original.dailyLimit);
          const currency = row.original.currency;
          return (
            <span className="text-sm text-gray-700">
              {currency}{" "}
              {limit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          );
        },
      },
      {
        accessorKey: "monthlyLimit",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Monthly Limit" />
        ),
        cell: ({ row }) => {
          const limit = parseFloat(row.original.monthlyLimit);
          const currency = row.original.currency;
          return (
            <span className="text-sm text-gray-700">
              {currency}{" "}
              {limit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          );
        },
      },
      {
        accessorKey: "lastTransactionAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Transaction" />
        ),
        cell: ({ row }) => {
          const lastTransaction = row.original.lastTransactionAt;
          return (
            <span className="text-sm text-gray-700">
              {lastTransaction ? formatDateTime(lastTransaction) : "Never"}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
          return (
            <span className="text-sm text-gray-700">
              {formatDateTime(row.original.createdAt)}
            </span>
          );
        },
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
                      to: "/wallets/$walletId/edit",
                      params: { walletId: row.original.id },
                      search: {
                        dialog: undefined,
                        walletId: undefined,
                        limit: undefined,
                      },
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
