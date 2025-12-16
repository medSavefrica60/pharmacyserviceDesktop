"use client";

import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
} from "@/components/ui/CommandBar";

export function ProviderListActionsBar() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({
      to: "/",
    });
  };

  const handleViewPendingRequests = () => {
    navigate({
      to: "/providers",
      search: { filterStatus: "PENDING_VERIFICATION" },
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
          label="View Pending Requests"
          action={handleViewPendingRequests}
          shortcut={{ shortcut: "p" }}
          icon={<Clock className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
      </CommandBarBar>
    </CommandBar>
  );
}
