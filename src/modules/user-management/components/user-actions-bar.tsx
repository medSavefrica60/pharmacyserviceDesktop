"use client";

import { useNavigate, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronUp,
  PackageIcon,
  Trash2,
  UserPlus,
} from "lucide-react";
import { CaretUpIcon } from "@radix-ui/react-icons";
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
} from "@/components/ui/CommandBar";

type UserActionsBarProps = {
  userId: string;
};

export function UserActionsBar({ userId }: UserActionsBarProps) {
  const router = useRouter();
  const navigate = useNavigate();

  const handleBack = () => {
    router.history.back();
  };

  const handleDelete = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { userId, dialog: "delete" },
    });
  };

  const handleMiniStatement = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "mini-statement", userId },
    });
  };

  const handlePackageEnrollments = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "packages", userId },
    });
  };

  const handleViewClaims = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "claims", userId },
    });
  };

  const handleAddDependent = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "add-dependent", userId },
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
          label="Delete User"
          action={handleDelete}
          shortcut={{ shortcut: "d" }}
          icon={<Trash2 className="w-4 h-4 text-red-600 dark:text-red-500" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-red-600 dark:!text-red-500 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="Mini Statement"
          action={handleMiniStatement}
          shortcut={{ shortcut: "m" }}
          icon={<ChevronUp className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="Package Enrollments"
          action={handlePackageEnrollments}
          shortcut={{ shortcut: "p" }}
          icon={<PackageIcon className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="View Claims"
          action={handleViewClaims}
          shortcut={{ shortcut: "c" }}
          icon={<CaretUpIcon className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
        <CommandBarSeperator className="!bg-gray-500 dark:!bg-gray-500" />
        <CommandBarCommand
          label="Add Dependent"
          action={handleAddDependent}
          shortcut={{ shortcut: "a" }}
          icon={<UserPlus className="w-4 h-4" />}
          className="!bg-gray-300 dark:!bg-gray-700 !text-gray-900 dark:!text-gray-50 [&>button]:hover:!bg-gray-400 dark:[&>button]:hover:!bg-gray-600"
        />
      </CommandBarBar>
    </CommandBar>
  );
}
