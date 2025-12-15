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

export type Statement = {
  id: string;
  statementId: string;
  userId: string;
  userName: string;
  period: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: "Paid" | "Pending" | "Overdue";
  generatedDate: string;
  dueDate: string;
};

export const useStatementsTableColumns = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopyID = async (statementId: string) => {
    setCopiedId(statementId);
    await navigator.clipboard.writeText(statementId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const columns: ColumnDef<Statement>[] = useMemo(
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
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => {
          const id = row.original.id;
          const shortId = id.slice(0, 8);
          const isCopied = copiedId === id;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {shortId}...
              </span>
              <button
                onClick={() => handleCopyID(id)}
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
        accessorKey: "statementId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Statement ID" />
        ),
        cell: ({ row }) => {
          const statementId = row.original.statementId;
          const isCopied = copiedId === statementId;

          return (
            <div className="group flex items-center justify-between">
              <span className="text-sm text-medsave-black-300 font-medium">
                {statementId}
              </span>
              <button
                onClick={() => handleCopyID(statementId)}
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
        accessorKey: "userId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User ID" />
        ),
        cell: ({ row }) => {
          const userId = row.original.userId;
          const isCopied = copiedId === userId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {userId}
              </span>
              <button
                onClick={() => handleCopyID(userId)}
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
        accessorKey: "userName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User Name" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-medium">
            {row.original.userName}
          </span>
        ),
      },
      {
        accessorKey: "period",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Period" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.period}
          </span>
        ),
      },
      {
        accessorKey: "totalAmount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300 font-semibold">
            {row.original.totalAmount}
          </span>
        ),
      },
      {
        accessorKey: "generatedDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Generated" />
        ),
        cell: ({ row }) => {
          const dateStr = row.original.generatedDate;
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
        accessorKey: "dueDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => {
          const dateStr = row.original.dueDate;
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
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant={status === "Paid" ? "default" : "secondary"}
              className={cn(
                "px-4 py-0.5 min-w-24 text-sm rounded-sm",
                status === "Paid"
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
                      to: "/users",
                      search: {
                        dialog: "details",
                        userId: row.original.id,
                      },
                    })
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // TODO: Implement download PDF functionality
                    console.log("Download PDF for:", row.original.userId);
                  }}
                >
                  Download PDF
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
