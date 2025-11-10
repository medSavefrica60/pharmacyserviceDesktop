import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUser, useGetUser } from "@/hooks/api/use-users";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { AlertTriangleIcon } from "lucide-react";
import { logger } from "@/lib/logger";
import { useState, useTransition } from "react";

export const DeleteUser = () => {
  const [isDeleting, startDeletingTransition] = useTransition();
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.userId;
  const { data: user } = useGetUser(search.userId);
  const deleteMutation = useDeleteUser();

  const handleClose = () => {
    navigate({
      to: "/users",
      search: { dialog: undefined, userId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.userId) return;

    startDeletingTransition(() => {
      toast.loading(`Deleting user ${user?.firstName} ${user?.lastName}...`);
      deleteMutation
        .mutateAsync(search.userId!)
        .then((response) => {
          toast.dismiss();
          logger.info("User deleted successfully", response);
          toast.success("User deleted successfully");
          handleClose();
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("Failed to delete user", error);
          toast.error(`Failed to delete user, ${error}`);
        });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Delete User</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {user.firstName} {user.lastName || ""}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {user.ghanaCardNumber}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={deleteMutation.isPending || isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending || isDeleting}
          >
            {deleteMutation.isPending || isDeleting
              ? "Deleting..."
              : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
