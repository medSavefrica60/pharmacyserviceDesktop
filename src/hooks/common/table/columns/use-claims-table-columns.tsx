import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export type Claim = {
  id: string;
  claimNumber: string;
  patientName: string;
  patientId: string;
  providerName: string;
  providerId: string;
  serviceType: string;
  claimDate: string;
  claimAmount: string;
  approvedAmount: string;
  status: "Approved" | "Pending" | "Rejected" | "Processing";
  avatar?: string;
};

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
        accessorKey: "claimNumber",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim Number" />
        ),
        cell: ({ row }) => {
          const claimNumber = row.original.claimNumber;
          const isCopied = copiedNumber === claimNumber;

          return (
            <div className="group flex items-center justify-between">
              <span className="text-sm text-medsave-black-300 font-medium">
                {claimNumber}
              </span>
              <button
                onClick={() => handleCopyNumber(claimNumber)}
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
        accessorKey: "providerName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Provider" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm text-medsave-black-300">
              {row.original.providerName}
            </span>
            <span className="text-xs text-medsave-black-200">
              {row.original.providerId}
            </span>
          </div>
        ),
      },

      {
        accessorKey: "serviceType",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Service Type" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.serviceType}
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
        accessorKey: "claimAmount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Claim Amount" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-semibold">
            {row.original.claimAmount}
          </span>
        ),
      },

      {
        accessorKey: "approvedAmount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Approved Amount" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-semibold">
            {row.original.approvedAmount}
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
                  : status === "Processing"
                    ? "bg-blue-50 text-blue-600 border-blue-200"
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
                        sheet: "details",
                        dialog: undefined,
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
