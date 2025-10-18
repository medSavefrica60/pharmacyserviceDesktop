import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteClaim, useGetClaim } from "@/hooks/api/use-claims";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeleteClaim = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/claims" }) as {
    dialog?: string;
    claimId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.claimId;
  const { data: claim } = useGetClaim(search.claimId);
  const deleteMutation = useDeleteClaim();

  const handleClose = () => {
    navigate({
      to: "/claims",
      search: { sheet: undefined, dialog: undefined, claimId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.claimId) return;

    try {
      await deleteMutation.mutateAsync(search.claimId);
      toast.success("Claim deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete claim");
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
            <DialogTitle>Delete Claim</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this claim? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {claim && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{claim.claimNumber}</p>
              <p className="text-sm text-muted-foreground">
                {claim.patientName} - {claim.serviceType}
              </p>
              <p className="text-xs text-muted-foreground">
                Amount: {claim.claimAmount}
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
            {deleteMutation.isPending ? "Deleting..." : "Delete Claim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
