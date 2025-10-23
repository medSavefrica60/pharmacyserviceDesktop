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

export const DeletePackage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/packages" }) as {
    dialog?: string;
    packageId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.packageId;

  const handleClose = () => {
    navigate({
      to: "/packages",
      search: { sheet: undefined, dialog: undefined, packageId: undefined },
    });
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete package:", search.packageId);
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
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
