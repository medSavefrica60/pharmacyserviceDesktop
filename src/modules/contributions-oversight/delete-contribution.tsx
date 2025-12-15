import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteContribution } from "@/hooks/api/use-contributions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeleteContribution = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/contributions" }) as {
    dialog?: string;
    contributionId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.contributionId;
  const deleteMutation = useDeleteContribution();

  const handleClose = () => {
    navigate({
      to: "/contributions",
      search: {
        sheet: undefined,
        dialog: undefined,
        contributionId: undefined,
      },
    });
  };

  const handleDelete = async () => {
    if (!search.contributionId) return;

    try {
      await deleteMutation.mutateAsync(search.contributionId);
      toast.success("Contribution record deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete contribution record");
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
            <DialogTitle>Delete Contribution Record</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this contribution record? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* {contribution && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {contribution.data.reference}
              </p>
              <p className="text-sm text-muted-foreground">
                {contribution.data.} - {contribution.packageName}
              </p>
              <p className="text-xs text-muted-foreground">
                Amount: {contribution.amount}
              </p>
            </div>
          </div>
        )} */}

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
            {deleteMutation.isPending ? "Deleting..." : "Delete Contribution"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
