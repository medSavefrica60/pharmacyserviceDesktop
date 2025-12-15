"use client";

import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2 } from "lucide-react";
import { CaretUpIcon } from "@radix-ui/react-icons";
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
} from "@/components/ui/CommandBar";

type ProviderActionsBarProps = {
  providerId: string;
};

export function ProviderActionsBar({ providerId }: ProviderActionsBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({
      to: "/providers",
    });
  };

  const handleDelete = () => {
    navigate({
      to: "/providers/$providerId/edit",
      params: { providerId },
      search: {
        view: undefined,
        dialog: "delete",
        providerId,
      },
    });
  };

  const handleViewClaims = () => {
    navigate({
      to: "/providers/$providerId/edit",
      params: { providerId },
      search: { view: undefined, dialog: "claims", providerId },
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
          label="Delete Provider"
          action={handleDelete}
          shortcut={{ shortcut: "d" }}
          icon={<Trash2 className="w-4 h-4 text-red-600 dark:text-red-500" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-red-600 dark:!text-red-500 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="View Claims"
          action={handleViewClaims}
          shortcut={{ shortcut: "c" }}
          icon={<CaretUpIcon className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
      </CommandBarBar>
    </CommandBar>
  );
}
