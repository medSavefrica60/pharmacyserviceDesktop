"use client";

import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2, Ban } from "lucide-react";
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
} from "@/components/ui/CommandBar";

type AdminActionsBarProps = {
  adminId: string;
};

export function AdminActionsBar({ adminId }: AdminActionsBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({
      to: "/admins",
      search: {
        dialog: undefined,
        adminId: undefined,
        limit: undefined,
      } as any,
    });
  };

  const handleDelete = () => {
    navigate({
      to: "/admins/$adminId/edit",
      params: { adminId },
      search: { adminId, dialog: "delete", limit: undefined } as any,
    });
  };

  const handleSuspend = () => {
    navigate({
      to: "/admins/$adminId/edit",
      params: { adminId },
      search: { adminId, dialog: "suspend", limit: undefined } as any,
    });
  };

  return (
    <CommandBar open={true}>
      <CommandBarBar className="!bg-gray-300 dark:!bg-gray-700">
        <CommandBarCommand
          label="Back"
          action={handleBack}
          shortcut={{ shortcut: "b" }}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="Delete Admin"
          action={handleDelete}
          shortcut={{ shortcut: "d" }}
          icon={<Trash2 className="w-4 h-4 text-red-600 dark:text-red-500" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-red-600 dark:!text-red-500 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="Suspend Admin"
          action={handleSuspend}
          shortcut={{ shortcut: "s" }}
          icon={
            <Ban className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
          }
          className="!bg-gray-300 dark:!bg-gray-700 !text-yellow-600 dark:!text-yellow-500 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
      </CommandBarBar>
    </CommandBar>
  );
}
