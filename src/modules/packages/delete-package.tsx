import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeletePackage } from "@/hooks/api/use-packages";

export const DeletePackage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/packages" }) as {
    dialog?: string;
    packageId?: string;
  };

  const deleteMutation = useDeletePackage();

  const isOpen = search.dialog === "delete" && !!search.packageId;

  const handleClose = () => {
    navigate({
      to: "/packages",
      search: { sheet: undefined, dialog: undefined, packageId: undefined },
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
    handleClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this package? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
