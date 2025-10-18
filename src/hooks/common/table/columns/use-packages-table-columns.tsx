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

export type Package = {
  id: string;
  packageId: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  coverage: string;
  status: "Active" | "Inactive" | "Suspended";
  memberCount: number;
  createdAt: string;
};

export const usePackagesTableColumns = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopyID = async (packageId: string) => {
    setCopiedId(packageId);
    await navigator.clipboard.writeText(packageId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const columns: ColumnDef<Package>[] = useMemo(
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
        accessorKey: "packageId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Package ID" />
        ),
        cell: ({ row }) => {
          const packageId = row.original.packageId;
          const isCopied = copiedId === packageId;

          return (
            <div className="group flex items-center justify-between">
              <span className="text-sm text-medsave-black-300 font-medium">
                {packageId}
              </span>
              <button
                onClick={() => handleCopyID(packageId)}
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
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Package Name" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm text-medsave-black-300 font-medium">
              {row.original.name}
            </span>
            <span className="text-xs text-medsave-black-200">
              {row.original.description}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-semibold">
            {row.original.price}
          </span>
        ),
      },
      {
        accessorKey: "duration",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Duration" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.duration}
          </span>
        ),
      },
      {
        accessorKey: "coverage",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Coverage" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.coverage}
          </span>
        ),
      },
      {
        accessorKey: "memberCount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Members" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.memberCount}
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
              variant={status === "Active" ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm",
                status === "Active"
                  ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100 hover:bg-green-50"
                  : status === "Inactive"
                    ? "bg-gray-50 text-gray-600 border-gray-200"
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
                      to: "/packages",
                      search: {
                        sheet: "details",
                        dialog: undefined,
                        packageId: row.original.id,
                      },
                    })
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/packages",
                      search: {
                        sheet: undefined,
                        dialog: "delete",
                        packageId: row.original.id,
                      },
                    })
                  }
                  className="text-destructive focus:text-destructive"
                >
                  Delete Package
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [copiedId, navigate]
  );

  return columns;
};
