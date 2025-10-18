import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeletePackage, useGetPackage } from "@/hooks/api/use-packages";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeletePackage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/packages" }) as {
    dialog?: string;
    packageId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.packageId;
  const { data: packageData } = useGetPackage(search.packageId);
  const deleteMutation = useDeletePackage();

  const handleClose = () => {
    navigate({
      to: "/packages",
      search: {
        sheet: undefined,
        dialog: undefined,
        packageId: undefined,
      },
    });
  };

  const handleDelete = async () => {
    if (!search.packageId) return;

    try {
      await deleteMutation.mutateAsync(search.packageId);
      toast.success("Package deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Delete Package</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this medication package? This action
            cannot be undone and will affect all members enrolled in this
            package.
          </DialogDescription>
        </DialogHeader>

        {packageData && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{packageData.packageId}</p>
              <p className="text-sm text-muted-foreground">
                {packageData.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {packageData.memberCount} active members • {packageData.price}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Package"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
