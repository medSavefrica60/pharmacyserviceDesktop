import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useDeleteMedication,
  useGetMedication,
} from "@/hooks/api/use-medications";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeleteMedication = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/medications" }) as {
    dialog?: string;
    medicationId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.medicationId;
  const { data: medication } = useGetMedication(search.medicationId);
  const deleteMutation = useDeleteMedication();

  const handleClose = () => {
    navigate({
      to: "/medications",
      search: { dialog: undefined, medicationId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.medicationId) return;

    try {
      await deleteMutation.mutateAsync(search.medicationId);
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
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {medication && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{medication.name}</p>
              <p className="text-sm text-muted-foreground">
                Minimum Amount: ₵{medication.minAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Status: {medication.status}
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
