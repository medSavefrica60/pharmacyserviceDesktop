import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateAdmin, useGetAdmin } from "@/hooks/api/use-admins";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Ban } from "lucide-react";
import { logger } from "@/lib/logger";
import { useTransition } from "react";

export const SuspendAdmin = () => {
  const [isSuspending, startSuspendingTransition] = useTransition();
  const navigate = useNavigate();
  const search = useSearch({ from: "/admins/$adminId/edit" }) as {
    dialog?: string;
    adminId?: string;
  };

  const isOpen = search.dialog === "suspend" && !!search.adminId;
  const { data: admin } = useGetAdmin(search.adminId);
  const updateMutation = useUpdateAdmin();

  const handleClose = () => {
    navigate({
      to: "/admins/$adminId/edit",
      params: { adminId: search.adminId || "" },
      search: { dialog: undefined, adminId: undefined },
    });
  };

  const handleSuspend = async () => {
    if (!search.adminId) return;

    startSuspendingTransition(() => {
      toast.loading(
        `Suspending admin ${admin?.firstName} ${admin?.lastName}...`
      );
      updateMutation
        .mutateAsync({
          id: search.adminId!,
          data: { status: "SUSPENDED" },
        })
        .then((response) => {
          toast.dismiss();
          logger.info("Admin suspended successfully", response);
          toast.success("Admin suspended successfully");
          handleClose();
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("Failed to suspend admin", error);
          toast.error(`Failed to suspend admin, ${error}`);
        });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-2">
              <Ban className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <DialogTitle>Suspend Admin</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to suspend this admin? They will not be able
            to access the system until their status is changed.
          </DialogDescription>
        </DialogHeader>

        {admin && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {admin.firstName} {admin.lastName || ""}
              </p>
              <p className="text-sm text-muted-foreground">{admin.email}</p>
              <p className="text-xs text-muted-foreground">
                Current Status: {admin.status}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={updateMutation.isPending || isSuspending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleSuspend}
            disabled={updateMutation.isPending || isSuspending}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {updateMutation.isPending || isSuspending
              ? "Suspending..."
              : "Suspend Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
