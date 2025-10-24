import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideCopy, LucideCopyCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { Claim } from "@/types";

export const useClaimsTableColumns = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopyNumber = async (claimNumber: string) => {
    setCopiedNumber(claimNumber);
    await navigator.clipboard.writeText(claimNumber);
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2000);
  };

  const columns: ColumnDef<Claim>[] = useMemo(
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
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim ID" />
        ),
        cell: ({ row }) => {
          const claimId = row.original.id;
          const shortId = claimId.slice(0, 8);
          const isCopied = copiedNumber === claimId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {shortId}...
              </span>
              <button
                onClick={() => handleCopyNumber(claimId)}
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
        accessorKey: "claimCode",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim Code" />
        ),
        cell: ({ row }) => {
          const claimCode = row.original.claimCode;
          const isCopied = copiedNumber === claimCode;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm text-medsave-black-300 font-medium">
                {claimCode}
              </span>
              <button
                onClick={() => handleCopyNumber(claimCode)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-pointer"
              >
                {isCopied ? (
                  <LucideCopyCheck
                    size={20}
                    className="text-medsave-success-500"
                  />
                ) : (
                  <LucideCopy size={20} className="text-medsave-black-400" />
                )}
              </button>
            </div>
          );
        },
      },

      {
        accessorKey: "reference",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Reference" />
        ),
        cell: ({ row }) => {
          const reference = row.original.reference;
          const isCopied = copiedNumber === reference;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-400 bg-medsave-black-25 px-2 py-1 rounded">
                {reference}
              </span>
              <button
                onClick={() => handleCopyNumber(reference)}
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
        accessorKey: "user",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
          const user = row.original.user;
          if (!user)
            return <span className="text-sm text-medsave-black-300">-</span>;

          const userName = `${user.firstName} ${user.lastName}`;
          const medsaveId = user.medsaveId;
          const isCopied = copiedNumber === user.medsaveId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-medsave-black-400">
                  {userName}
                </span>
                <span className="text-xs text-medsave-black-300">
                  {medsaveId}
                </span>
              </div>
              <button
                onClick={() => handleCopyNumber(user.medsaveId)}
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
        accessorKey: "provider",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Provider" />
        ),
        cell: ({ row }) => {
          const provider = row.original.provider;
          if (!provider)
            return <span className="text-sm text-medsave-black-300">-</span>;

          const organizationName = provider.organizationName;
          const contactPhone = provider.contactPhone;
          const isCopied = copiedNumber === organizationName;

          return (
            <div className="group flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-medsave-black-400">
                  {organizationName}
                </span>
                <span className="text-xs text-medsave-black-300">
                  {contactPhone}
                </span>
              </div>
              <button
                onClick={() => handleCopyNumber(provider.organizationName)}
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
        accessorKey: "medicationPackage",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Medication Package" />
        ),
        cell: ({ row }) => {
          const medicationPackage = row.original.medicationPackage;
          if (!medicationPackage)
            return <span className="text-sm text-medsave-black-300">-</span>;

          const packageName = medicationPackage.name;
          const minAmount = medicationPackage.minAmount;
          const isCopied = copiedNumber === medicationPackage.id;

          return (
            <div className="group flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-medsave-black-400">
                  {packageName}
                </span>
                <span className="text-xs text-medsave-black-300">
                  Min: GH₵ {minAmount}
                </span>
              </div>
              <button
                onClick={() => handleCopyNumber(medicationPackage.id)}
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
          if (!dateStr)
            return <span className="text-sm text-medsave-black-300">N/A</span>;

          try {
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-medsave-black-400">
                  {formattedDate}
                </span>
                <span className="text-xs text-medsave-black-200">
                  {formattedTime}
                </span>
              </div>
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
        cell: ({ row }) => {
          const amount = row.original.amount;
          const formattedAmount = `GH₵ ${parseFloat(amount).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`;
          return (
            <span className="text-sm text-medsave-black-500 font-semibold">
              {formattedAmount}
            </span>
          );
        },
      },

      {
        accessorKey: "approvedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Approved Date" />
        ),
        cell: ({ row }) => {
          const approvedAt = row.original.approvedAt;

          if (!approvedAt) {
            return (
              <span className="text-sm text-medsave-black-200 italic">-</span>
            );
          }

          try {
            const date = new Date(approvedAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-medsave-black-400">
                  {formattedDate}
                </span>
                <span className="text-xs text-medsave-black-200">
                  {formattedTime}
                </span>
              </div>
            );
          } catch {
            return (
              <span className="text-sm text-medsave-black-200 italic">-</span>
            );
          }
        },
      },

      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const statusDisplay =
            status.charAt(0).toUpperCase() + status.slice(1);
          return (
            <Badge
              variant={status === "approved" ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm",
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
              {statusDisplay}
            </Badge>
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
                      to: "/claims",
                      search: {
                        sheet: undefined,
                        dialog: "details",
                        claimId: row.original.id,
                      },
                    })
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/claims",
                      search: {
                        sheet: "edit",
                        dialog: undefined,
                        claimId: row.original.id,
                      },
                    })
                  }
                >
                  Edit Claim
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/claims",
                      search: {
                        sheet: undefined,
                        dialog: "delete",
                        claimId: row.original.id,
                      },
                    })
                  }
                  className="text-destructive focus:text-destructive"
                >
                  Delete Claim
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [copiedNumber, navigate]
  );

  return columns;
};
