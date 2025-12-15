import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteAdmin, useGetAdmin } from "@/hooks/api/use-admins";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { AlertTriangleIcon } from "lucide-react";
import { logger } from "@/lib/logger";
import { useTransition } from "react";

export const DeleteAdmin = () => {
  const [isDeleting, startDeletingTransition] = useTransition();
  const navigate = useNavigate();
  const search = useSearch({ from: "/admins/$adminId/edit" }) as {
    dialog?: string;
    adminId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.adminId;
  const { data: admin } = useGetAdmin(search.adminId);
  const deleteMutation = useDeleteAdmin();

  const handleClose = () => {
    navigate({
      to: "/admins/$adminId/edit",
      params: { adminId: search.adminId || "" },
      search: { dialog: undefined, adminId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.adminId) return;

    startDeletingTransition(() => {
      toast.loading(`Deleting admin ${admin?.firstName} ${admin?.lastName}...`);
      deleteMutation
        .mutateAsync(search.adminId!)
        .then((response) => {
          toast.dismiss();
          logger.info("Admin deleted successfully", response);
          toast.success("Admin deleted successfully");
          navigate({ to: "/admins" });
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("Failed to delete admin", error);
          toast.error(`Failed to delete admin, ${error}`);
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
            <DialogTitle>Delete Admin</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this admin? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {admin && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {admin.firstName} {admin.lastName || ""}
              </p>
              <p className="text-sm text-muted-foreground">{admin.email}</p>
              <p className="text-xs text-muted-foreground">{admin.role}</p>
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
              : "Delete Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
