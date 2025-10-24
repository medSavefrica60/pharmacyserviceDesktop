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

export type Dependent = {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  gender: string;
  primaryMember: string;
  primaryMemberId: string;
  dateAdded: string;
  dependentId: string;
  avatar?: string;
  status: "Active" | "Inactive";
};

export const useDependentsTableColumns = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopyID = async (dependentId: string) => {
    setCopiedId(dependentId);
    await navigator.clipboard.writeText(dependentId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const columns: ColumnDef<Dependent>[] = useMemo(
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
        accessorKey: "dependentId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dependent ID" />
        ),
        cell: ({ row }) => {
          const dependentId = row.original.dependentId;
          const isCopied = copiedId === dependentId;

          return (
            <div className="group flex items-center justify-between">
              <span className="text-sm text-medsave-black-300">
                {dependentId}
              </span>
              <button
                onClick={() => handleCopyID(dependentId)}
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
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          const name = row.original.name;
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
              <span className="text-sm text-medsave-black-300">{name}</span>
            </div>
          );
        },
      },

      {
        accessorKey: "relationship",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Relationship" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.relationship}
          </span>
        ),
      },

      {
        accessorKey: "primaryMemberId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Primary Member ID" />
        ),
        cell: ({ row }) => {
          const primaryMemberId = row.original.primaryMemberId;
          const isCopied = copiedId === primaryMemberId;

          return (
            <div className="group flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-medsave-black-300">
                {primaryMemberId}
              </span>
              <button
                onClick={() => handleCopyID(primaryMemberId)}
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
        accessorKey: "primaryMember",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Primary Member Name" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.primaryMember}
          </span>
        ),
      },

      {
        accessorKey: "gender",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gender" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-medsave-black-300">
            {row.original.gender}
          </span>
        ),
      },

      {
        accessorKey: "dateAdded",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date Added" />
        ),
        cell: ({ row }) => {
          const dateStr = row.original.dateAdded;
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
              variant={status === "Active" ? "default" : "secondary"}
              className={cn(
                "px-6 py-0.5 min-w-30 text-base rounded-sm",
                status === "Active"
                  ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100 hover:bg-green-50"
                  : "bg-gray-50 text-gray-500 border-gray-200"
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
                      to: "/dependents",
                      search: {
                        dialog: "details",
                        dependentId: row.original.id,
                      },
                    })
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/dependents",
                      search: {
                        dialog: "edit",
                        dependentId: row.original.id,
                      },
                    })
                  }
                >
                  Edit Dependent
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: "/dependents",
                      search: {
                        dialog: "delete",
                        dependentId: row.original.id,
                      },
                    })
                  }
                  className="text-destructive focus:text-destructive"
                >
                  Remove Dependent
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
