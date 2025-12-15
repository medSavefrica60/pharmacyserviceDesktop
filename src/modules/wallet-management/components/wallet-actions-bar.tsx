"use client";

import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
} from "@/components/ui/CommandBar";

type WalletActionsBarProps = {
  walletId: string;
};

export function WalletActionsBar({ walletId }: WalletActionsBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({
      to: "/wallets",
      search: {
        dialog: undefined,
        walletId: undefined,
        limit: undefined,
      } as any,
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
      </CommandBarBar>
    </CommandBar>
  );
}
